import { NextResponse } from 'next/server';
import { deliver, isEmail, limitedBody } from '@/lib/form-delivery';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = JSON.parse(new TextDecoder().decode(await limitedBody(request, 65536))); }
  catch (error) { return NextResponse.json({ error: 'Invalid payload' }, { status: error instanceof RangeError ? 413 : 400 }); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  const limits: Record<string, number> = { name: 200, email: 254, phone: 50, service: 300, details: 10000, company: 300, address: 500 };
  const payload: Record<string, string> = {};
  for (const [field, max] of Object.entries(limits)) {
    const value = body[field]; const optional = field === 'company' || field === 'address' || field === 'phone';
    if (optional && value == null) continue;
    if (typeof value !== 'string' || value.length > max || (!optional && !value.trim())) return NextResponse.json({ error: `Invalid ${field}` }, { status: 400 });
    payload[field] = value.trim();
  }
  if (!isEmail(payload.email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  return deliver(process.env.CONTACT_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, source: 'machos-bey-contact', submittedAt: new Date().toISOString() }) });
}
