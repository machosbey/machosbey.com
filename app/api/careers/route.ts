import { NextResponse } from 'next/server';
import { deliver, limitedBody } from '@/lib/form-delivery';

export const runtime = 'nodejs';
const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export async function POST(request: Request) {
  let form: FormData;
  try {
    const body = await limitedBody(request, MAX_FILE_SIZE + 65536);
    form = await new Response(body, { headers: { 'Content-Type': request.headers.get('content-type') || '' } }).formData();
  } catch (error) { return NextResponse.json({ error: 'Invalid payload' }, { status: error instanceof RangeError ? 413 : 400 }); }
  const name = form.get('name');
  const email = form.get('email');
  const experience = form.get('experience');
  const bio = form.get('bio');
  const cv = form.get('cv');

  if (![name, email, experience, bio].every((value) => typeof value === 'string' && value.trim() && value.length <= 10000)) {
    return NextResponse.json({ error: 'Missing required field' }, { status: 400 });
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (!(cv instanceof File) || !cv.size || cv.size > MAX_FILE_SIZE || !ALLOWED.has(cv.type)) {
    return NextResponse.json({ error: 'Invalid CV file' }, { status: 400 });
  }

  const webhook = process.env.CAREERS_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ code: 'NOT_CONFIGURED' }, { status: 503 });

  const forward = new FormData();
  forward.set('name', name as string);
  forward.set('email', email as string);
  forward.set('experience', experience as string);
  forward.set('bio', bio as string);
  forward.set('cv', cv, cv.name);
  forward.set('source', 'machos-bey-careers');
  forward.set('submittedAt', new Date().toISOString());

  return deliver(webhook, { method: 'POST', body: forward });
}
