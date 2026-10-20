import { NextResponse } from 'next/server';
export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export async function deliver(webhook: string | undefined, init: RequestInit) {
  if (!webhook) return NextResponse.json({ code: 'NOT_CONFIGURED' }, { status: 503 });
  try {
    const url = new URL(webhook);
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Invalid endpoint');
  } catch { return NextResponse.json({ code: 'NOT_CONFIGURED' }, { status: 503 }); }
  try {
    const response = await fetch(webhook, { ...init, redirect: 'error', signal: AbortSignal.timeout(12000) });
    if (!response.ok) return NextResponse.json({ error: 'Delivery failed' }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: 'Delivery unavailable' }, { status: 502 }); }
}

// Bound the actual streamed body, including requests without Content-Length.
export async function limitedBody(request: Request, limit: number): Promise<Uint8Array<ArrayBuffer>> {
  if (Number(request.headers.get('content-length')) > limit) throw new RangeError('Payload too large');
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > limit) { await reader.cancel(); throw new RangeError('Payload too large'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
  return body;
}
