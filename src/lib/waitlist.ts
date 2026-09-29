export interface WaitlistInput {
  email: string;
  university: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}
export type WaitlistResult = { status: 'joined' | 'duplicate' | 'error'; message?: string };
export function isValidEmail(value: string): boolean {
  return (
    value.length <= 254 &&
    /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+$/i.test(
      value,
    ) &&
    !value.includes('..') &&
    value.split('@')[0].length <= 64
  );
}
// ASCII control characters are intentionally removed from visitor-supplied metadata.
function clean(value: unknown, max: number): string | null {
  return typeof value === 'string'
    ? value
        .trim()
        // eslint-disable-next-line no-control-regex
        .replace(/[\u0000-\u001f\u007f]/g, '')
        .slice(0, max) || null
    : null;
}
export function validateWaitlist(raw: unknown): WaitlistInput | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const data = raw as Record<string, unknown>;
  if (typeof data.email !== 'string') return null;
  const email = data.email.trim().toLowerCase();
  if (
    !isValidEmail(email) ||
    (typeof data.university === 'string' && data.university.trim().length > 160)
  )
    return null;
  const referrer = clean(data.referrer, 253);
  return {
    email,
    university: clean(data.university, 160),
    referrer: referrer && /^[a-z0-9.-]+$/i.test(referrer) ? referrer : null,
    utm_source: clean(data.utm_source, 120),
    utm_medium: clean(data.utm_medium, 120),
    utm_campaign: clean(data.utm_campaign, 120),
  };
}
