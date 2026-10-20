export function siteUrl(): string | undefined {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || '');
    if (!['http:', 'https:'].includes(url.protocol) || ['example.com', 'localhost', '127.0.0.1', '[::1]', '0.0.0.0'].includes(url.hostname)) return undefined;
    return url.origin;
  } catch { return undefined; }
}
