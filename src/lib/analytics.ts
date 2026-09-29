import { site } from '../config/site';
export type AnalyticsEvent =
  | 'page_view'
  | 'hero_cta_clicked'
  | 'scroll_demo_started'
  | 'scroll_demo_completed'
  | 'waitlist_started'
  | 'waitlist_joined'
  | 'subject_viewed';
export type Consent = 'accepted' | 'rejected';
const consentKey = 'wyllex-analytics-consent';
let sessionId: string | null = null;
export function getConsent(): Consent | null {
  try {
    const choice = localStorage.getItem(consentKey);
    return choice === 'accepted' || choice === 'rejected' ? choice : null;
  } catch {
    return null;
  }
}
export function setConsent(value: Consent) {
  try {
    localStorage.setItem(consentKey, value);
  } catch {
    /* A blocked store must not block the website. */
  }
  if (value === 'rejected') sessionId = null;
  window.dispatchEvent(new CustomEvent('wyllex:consent', { detail: value }));
}
/** Explicit, consent-only events. No autocapture, replay, email, form values or query strings. */
export function track(
  event: AnalyticsEvent,
  properties: Record<string, string | number | boolean> = {},
) {
  if (
    !site.posthog.key ||
    getConsent() !== 'accepted' ||
    navigator.doNotTrack === '1' ||
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl
  )
    return;
  sessionId ||= crypto.randomUUID();
  const body = JSON.stringify({
    api_key: site.posthog.key,
    event,
    properties: {
      ...properties,
      distinct_id: sessionId,
      $process_person_profile: false,
      $geoip_disable: true,
      $current_url: `${site.url}${window.location.pathname}`,
      $lib: 'wyllex-web',
    },
  });
  void fetch(`${site.posthog.host.replace(/\/$/, '')}/i/v0/e/`, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
  }).catch(() => {});
}
