import { site } from '../../src/config/site';
import { validateWaitlist } from '../../src/lib/waitlist';

export interface Env {
  PUBLIC_SUPABASE_URL?: string;
  PUBLIC_SUPABASE_ANON_KEY?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
}
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};
function json(body: Record<string, string>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers });
}
/** Read a bounded body even when Content-Length is absent or dishonest. */
async function readBody(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('empty');
  const chunks: Uint8Array[] = [];
  let length = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 4096) {
      await reader.cancel();
      throw new Error('too large');
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}
export async function handleWaitlist(
  request: Request,
  env: Env,
  waitUntil: (promise: Promise<unknown>) => void,
): Promise<Response> {
  if (request.method !== 'POST')
    return new Response(
      JSON.stringify({ status: 'error', message: 'Use POST to join the waitlist.' }),
      { status: 405, headers: { ...headers, Allow: 'POST' } },
    );
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return json({ status: 'error', message: 'Please join from the Wyllex website.' }, 403);
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return json({ status: 'error', message: 'Please submit the waitlist form.' }, 415);
  let raw: unknown;
  try {
    raw = JSON.parse(await readBody(request));
  } catch {
    return json({ status: 'error', message: 'Please check your details and try again.' }, 400);
  }
  if (raw && typeof raw === 'object' && 'website' in raw && raw.website)
    return json({ status: 'joined' });
  const data = validateWaitlist(raw);
  if (!data)
    return json(
      {
        status: 'error',
        message: 'Please enter a valid email and a university name under 160 characters.',
      },
      400,
    );
  const url = env.PUBLIC_SUPABASE_URL;
  const key = env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key)
    return json(
      {
        status: 'error',
        message:
          'Early access signup is temporarily unavailable. Please try again shortly or contact us.',
      },
      503,
    );
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(parsed.hostname))
      throw new Error('Invalid database URL');
    const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10000),
    });
    if (response.status === 409) {
      const error = (await response.json()) as { code?: string };
      if (error.code === '23505') return json({ status: 'duplicate' });
    }
    if (!response.ok)
      return json(
        {
          status: 'error',
          message: 'We couldn’t save your place right now. Please try again in a moment.',
        },
        502,
      );
    if (env.RESEND_API_KEY)
      waitUntil(
        sendConfirmation(data.email, env).catch(() => {
          console.error('Waitlist confirmation delivery failed. Signup remains saved.');
        }),
      );
    return json({ status: 'joined' }, 201);
  } catch {
    return json(
      {
        status: 'error',
        message: 'We couldn’t reach the waitlist right now. Please try again in a moment.',
      },
      502,
    );
  }
}
async function sendConfirmation(email: string, env: Env) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL || `${site.name} <${site.contactEmail}>`,
      to: [email],
      subject: `You’re on the ${site.name} early access list.`,
      text: `Welcome to ${site.name}.\n\nYou’re on the early access list. We’ll let you know when ${site.name} is ready.\n\nLaw worth scrolling.\n${site.url}\n\nTo leave the list, reply to this email or contact ${site.contactEmail}.`,
      html: `<div style="background:#f4f2eb;padding:40px 24px;font-family:Arial,sans-serif;color:#073e33"><div style="max-width:480px;margin:auto"><p style="font-size:27px;font-weight:700;letter-spacing:-1px">wyllex</p><h1 style="font-size:36px;letter-spacing:-1.5px;line-height:1.1">Your next chapter<br>is on its way.</h1><p style="font-size:16px;line-height:1.7">Welcome to Wyllex.<br>You’re on the early access list.<br>We’ll let you know when Wyllex is ready.</p><p style="margin-top:32px;font-size:14px">Law worth scrolling.</p><a href="${site.url}" style="color:#073e33">${site.domain}</a><p style="font-size:12px;color:#496655;margin-top:40px">To leave the list, reply to this email or contact <a style="color:inherit" href="mailto:${site.contactEmail}?subject=Unsubscribe">${site.contactEmail}</a>.</p></div></div>`,
      reply_to: site.contactEmail,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error('Email provider rejected delivery');
}
export const onRequest: PagesFunction<Env> = ({ request, env, waitUntil }) =>
  handleWaitlist(request, env, waitUntil);
