/** Brand and public integration settings. Never add private credentials here. */
export const site = {
  name: 'Wyllex',
  domain: 'wyllex.com',
  url: 'https://wyllex.com',
  title: 'Wyllex — Law worth scrolling',
  description: 'Learn Law through short, focused videos built around your university subjects.',
  contactEmail: 'hello@wyllex.com',
  appStoreUrl: import.meta.env?.PUBLIC_APP_STORE_URL || '',
  socialLinks: [] as { label: string; url: string }[],
  posthog: {
    key: import.meta.env?.PUBLIC_POSTHOG_KEY || '',
    host: import.meta.env?.PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
  },
  supabase: {
    url: import.meta.env?.PUBLIC_SUPABASE_URL || '',
    anonKey: import.meta.env?.PUBLIC_SUPABASE_ANON_KEY || '',
  },
  legal: { operator: 'Wyllex', updated: '29 September 2026', jurisdiction: 'England and Wales' },
} as const;
export const primaryCta = {
  href: site.appStoreUrl || '/#waitlist',
  label: site.appStoreUrl ? 'Download on the App Store' : 'Join the waitlist',
};
