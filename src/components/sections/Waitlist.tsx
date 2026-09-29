import { useEffect, useRef, useState } from 'react';
import { Icon } from '../ui/Icon';
import { isValidEmail, type WaitlistResult } from '../../lib/waitlist';
import { track } from '../../lib/analytics';
import { site } from '../../config/site';
export default function Waitlist() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [status, setStatus] = useState<'idle' | 'loading' | 'joined' | 'duplicate' | 'error'>(
    'idle',
  );
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const started = useRef(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading') return;
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    if (!isValidEmail(email)) {
      setEmailError('Enter a valid email address, such as you@university.ac.uk.');
      emailRef.current?.focus();
      return;
    }
    setEmailError('');
    setError('');
    setStatus('loading');
    let referrer: string | null = null;
    try {
      referrer = document.referrer ? new URL(document.referrer).hostname : null;
    } catch {
      /* Unparseable referrers are intentionally omitted. */
    }
    const params = new URLSearchParams(window.location.search);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          university: form.get('university'),
          website: form.get('website'),
          referrer,
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign'),
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.headers.get('content-type')?.includes('application/json'))
        throw new Error('unavailable');
      const result = (await response.json()) as WaitlistResult;
      if (result.status === 'joined' || result.status === 'duplicate') {
        setStatus(result.status);
        if (result.status === 'joined') track('waitlist_joined');
        requestAnimationFrame(() => resultRef.current?.focus());
      } else {
        setStatus('error');
        setError(
          result.message || 'We couldn’t save your place just now. Please try again in a moment.',
        );
      }
    } catch {
      setStatus('error');
      setError(
        'We couldn’t reach the waitlist right now. Please try again shortly, or email us below.',
      );
    }
  }
  if (status === 'joined' || status === 'duplicate')
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={resultRef}>
        <span>
          <Icon name="check" size={24} />
        </span>
        <h3>{status === 'joined' ? 'You’re on the list.' : 'You’re already on the list.'}</h3>
        <p>
          {status === 'joined'
            ? 'Your next chapter is on its way. We’ll email you when Wyllex is ready.'
            : 'Your place is saved. We’ll be in touch when Wyllex is ready for you.'}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            requestAnimationFrame(() => emailRef.current?.focus());
          }}
        >
          Use a different email
        </button>
      </div>
    );
  return (
    <form
      className="waitlist-form"
      onSubmit={submit}
      noValidate
      onFocus={() => {
        if (!started.current) {
          started.current = true;
          track('waitlist_started');
        }
      }}
      aria-busy={status === 'loading'}
    >
      <div className="form-field">
        <label htmlFor="waitlist-email">Your email</label>
        <input
          ref={emailRef}
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@university.ac.uk"
          required
          maxLength={254}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? 'email-error' : 'waitlist-privacy'}
          onChange={() => emailError && setEmailError('')}
          disabled={!ready || status === 'loading'}
        />
        {emailError && (
          <span className="field-error" id="email-error" role="alert">
            {emailError}
          </span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="waitlist-university">
          University <span>(optional)</span>
        </label>
        <input
          id="waitlist-university"
          name="university"
          type="text"
          autoComplete="organization"
          placeholder="Where you’re studying"
          maxLength={160}
          disabled={!ready || status === 'loading'}
        />
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        className="button button-dark"
        disabled={!ready || status === 'loading'}
      >
        <span>{status === 'loading' ? 'Saving your place…' : 'Get early access'}</span>
        {status === 'loading' ? (
          <span className="button-loading" />
        ) : (
          <Icon name="plus" size={17} />
        )}
      </button>
      {error && (
        <p className="form-error" role="alert">
          {error}{' '}
          <a href={`mailto:${site.contactEmail}?subject=Wyllex%20early%20access`}>
            {site.contactEmail}
          </a>
        </p>
      )}
      <p className="form-note" id="waitlist-privacy">
        By joining, you agree to receive early access updates from Wyllex. Unsubscribe at any time.
        Your details are handled as described in our <a href="/privacy">Privacy Policy</a>.
      </p>
    </form>
  );
}
