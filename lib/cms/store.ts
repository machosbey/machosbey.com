import 'server-only';
import { cache } from 'react';
import type { RowDataPacket } from 'mysql2';
import { db, init, configured } from './db';
import { defaults, type Content } from './model';
export const publishedContent = cache(async (): Promise<Content> => {
  if (!configured()) return defaults;
  try { await init(); const [rows] = await db().execute<RowDataPacket[]>('SELECT published FROM cms_content WHERE id=1'); return {...defaults,...JSON.parse(rows[0].published)}; }
  catch { console.error('CMS public content unavailable; serving bundled content.'); return defaults; }
});
