import { afterEach, describe, expect, it, vi } from 'vitest';
import { isValidEmail, validateWaitlist } from '../src/lib/waitlist';
import { handleWaitlist, type Env } from '../functions/api/waitlist';
const env: Env = {
  PUBLIC_SUPABASE_URL: 'https://project.supabase.co',
  PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
};
function request(data: unknown, extra: RequestInit = {}) {
  return new Request('https://wyllex.com/api/waitlist', {
    method: 'POST',
    headers: { Origin: 'https://wyllex.com', 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    ...extra,
  });
}
afterEach(() => vi.unstubAllGlobals());
describe('waitlist validation', () => {
  it('normalizes addresses and limits campaign metadata', () => {
    expect(
      validateWaitlist({
        email: '  Student@Example.COM ',
        university: ' York ',
        utm_source: 'x'.repeat(300),
        referrer: 'https://private.example/path',
      }),
    ).toEqual({
      email: 'student@example.com',
      university: 'York',
      referrer: null,
      utm_source: 'x'.repeat(120),
      utm_medium: null,
      utm_campaign: null,
    });
  });
  it.each([
    'student',
    'a@b',
    'a..b@example.com',
    'a@.com',
    'a\n@example.com',
    '@university.ac.uk',
    'x'.repeat(65) + '@example.com',
  ])('rejects malformed address %s', (email) => expect(isValidEmail(email)).toBe(false));
  it.each(['you+law@university.ac.uk', "o'brien@example.com", 'user@example.co.uk'])(
    'accepts ordinary valid addresses %s',
    (email) => expect(isValidEmail(email)).toBe(true),
  );
  it('rejects malformed payloads and overly long university names', () => {
    expect(validateWaitlist(null)).toBeNull();
    expect(validateWaitlist({ email: 42 })).toBeNull();
    expect(validateWaitlist({ email: 'you@example.com', university: 'x'.repeat(161) })).toBeNull();
  });
});
describe('waitlist function', () => {
  it('gracefully reports missing environment without claiming success', async () => {
    const response = await handleWaitlist(request({ email: 'you@example.com' }), {}, vi.fn());
    expect(response.status).toBe(503);
    expect(((await response.json()) as { status: string }).status).toBe('error');
  });
  it('only inserts with the anonymous key and minimal returning data', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
    vi.stubGlobal('fetch', fetchMock);
    const response = await handleWaitlist(request({ email: 'YOU@EXAMPLE.COM' }), env, vi.fn());
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ status: 'joined' });
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://project.supabase.co/rest/v1/waitlist');
    expect(options.headers.Prefer).toBe('return=minimal');
    expect(options.headers.apikey).toBe('test-anon-key');
    expect(options.headers.Authorization).toBe('Bearer test-anon-key');
    expect(JSON.parse(options.body).email).toBe('you@example.com');
  });
  it('sends a publishable key only as apikey, never as a bearer JWT', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
    vi.stubGlobal('fetch', fetchMock);
    const response = await handleWaitlist(
      request({ email: 'you@example.com' }),
      { ...env, PUBLIC_SUPABASE_ANON_KEY: 'sb_publishable_test' },
      vi.fn(),
    );
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ status: 'joined' });
    const [, options] = fetchMock.mock.calls[0];
    expect(options.headers.apikey).toBe('sb_publishable_test');
    expect(options.headers).not.toHaveProperty('Authorization');
    expect(options.headers.Prefer).toBe('return=minimal');
  });
  it('handles duplicate emails and does not send another confirmation', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ code: '23505' }), { status: 409 })),
    );
    const background = vi.fn();
    const response = await handleWaitlist(
      request({ email: 'you@example.com' }),
      { ...env, RESEND_API_KEY: 'test-resend' },
      background,
    );
    expect(await response.json()).toEqual({ status: 'duplicate' });
    expect(background).not.toHaveBeenCalled();
  });
  it('does not expose a database error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('secret database details', { status: 500 })),
    );
    const response = await handleWaitlist(request({ email: 'you@example.com' }), env, vi.fn());
    expect(response.status).toBe(502);
    expect(await response.text()).not.toContain('secret');
  });
  it('isolates email delivery failure from a successful signup', async () => {
    const mock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 201 }))
      .mockResolvedValueOnce(new Response('rejected', { status: 403 }));
    vi.stubGlobal('fetch', mock);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const jobs: Promise<unknown>[] = [];
    const response = await handleWaitlist(
      request({ email: 'you@example.com' }),
      { ...env, RESEND_API_KEY: 'test-resend' },
      (promise) => jobs.push(promise),
    );
    expect(response.status).toBe(201);
    await Promise.all(jobs);
    expect(mock).toHaveBeenCalledTimes(2);
  });
  it('rejects cross-origin requests, wrong methods and content types', async () => {
    expect(
      (
        await handleWaitlist(
          request(
            {},
            { headers: { Origin: 'https://other.example', 'Content-Type': 'application/json' } },
          ),
          env,
          vi.fn(),
        )
      ).status,
    ).toBe(403);
    expect(
      (await handleWaitlist(new Request('https://wyllex.com/api/waitlist'), env, vi.fn())).status,
    ).toBe(405);
    expect(
      (
        await handleWaitlist(
          request({}, { headers: { Origin: 'https://wyllex.com', 'Content-Type': 'text/plain' } }),
          env,
          vi.fn(),
        )
      ).status,
    ).toBe(415);
  });
  it('bounds request payloads and ignores honeypot submissions', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    expect((await handleWaitlist(request({ email: 'x'.repeat(5000) }), env, vi.fn())).status).toBe(
      400,
    );
    expect(
      (await handleWaitlist(request({ email: 'bot@example.com', website: 'spam' }), env, vi.fn()))
        .status,
    ).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
