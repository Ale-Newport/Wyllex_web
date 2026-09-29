import { useEffect, useState } from 'react';
import { getConsent, setConsent, track, type Consent } from '../../lib/analytics';
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const privacySignal =
      navigator.doNotTrack === '1' ||
      (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
    if (privacySignal) {
      setConsent('rejected');
    } else {
      setOpen(getConsent() === null);
      track('page_view');
    }
    const show = () => setOpen(true);
    window.addEventListener('wyllex:privacy-settings', show);
    return () => window.removeEventListener('wyllex:privacy-settings', show);
  }, []);
  function choose(choice: Consent) {
    setConsent(choice);
    if (choice === 'accepted') track('page_view');
    setOpen(false);
  }
  if (!open) return null;
  return (
    <aside className="cookie-banner" aria-label="Analytics preferences">
      <h2>A small choice. Yours to make.</h2>
      <p>
        May we use optional analytics to understand what’s useful on Wyllex? No ad tracking or
        session recordings. <a href="/privacy">See our privacy policy.</a>
      </p>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose('rejected')}>
          Essential only
        </button>
        <button type="button" onClick={() => choose('accepted')}>
          Allow analytics
        </button>
      </div>
    </aside>
  );
}
