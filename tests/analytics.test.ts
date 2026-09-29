import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
vi.mock('../src/config/site', () => ({
  site: {
    url: 'https://wyllex.com',
    posthog: { key: 'test-project-key', host: 'https://eu.i.posthog.com' },
  },
}));
import { getConsent, setConsent, track } from '../src/lib/analytics';
const storage = new Map<string, string>();
beforeEach(() => {
  storage.clear();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage.get(key) || null,
    setItem: (key: string, value: string) => storage.set(key, value),
  });
  vi.stubGlobal('navigator', { doNotTrack: null, globalPrivacyControl: false });
  vi.stubGlobal('window', { location: { pathname: '/subjects' }, dispatchEvent: vi.fn() });
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}')));
});
afterEach(() => vi.unstubAllGlobals());
describe('consent-only analytics', () => {
  it('sends nothing before a choice or after rejection', () => {
    track('page_view');
    expect(fetch).not.toHaveBeenCalled();
    setConsent('rejected');
    track('page_view');
    expect(fetch).not.toHaveBeenCalled();
  });
  it('sends minimal anonymous events after acceptance', () => {
    setConsent('accepted');
    track('subject_viewed', { subject: 'Tort Law' });
    expect(fetch).toHaveBeenCalledTimes(1);
    const options = vi.mocked(fetch).mock.calls[0][1]!;
    const body = JSON.parse(String(options.body));
    expect(body.properties).toMatchObject({
      subject: 'Tort Law',
      $current_url: 'https://wyllex.com/subjects',
      $process_person_profile: false,
      $geoip_disable: true,
    });
    expect(body.properties.email).toBeUndefined();
    expect(body.properties.university).toBeUndefined();
    expect(options.credentials).toBe('omit');
  });
  it('stops immediately after withdrawal', () => {
    setConsent('accepted');
    track('page_view');
    setConsent('rejected');
    track('waitlist_joined');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it.each([
    { doNotTrack: '1', globalPrivacyControl: false },
    { doNotTrack: null, globalPrivacyControl: true },
  ])('honours browser privacy signals %o', (signals) => {
    vi.stubGlobal('navigator', signals);
    setConsent('accepted');
    track('page_view');
    expect(fetch).not.toHaveBeenCalled();
  });
  it('fails closed when browser storage is blocked', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    });
    setConsent('accepted');
    expect(getConsent()).toBeNull();
    track('page_view');
    expect(fetch).not.toHaveBeenCalled();
  });
});
