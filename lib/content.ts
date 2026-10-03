import { getDb } from './mongodb';

export interface ContentDoc<T = Record<string, unknown>> {
  slug: string;
  data: T;
  updatedAt: Date;
}

/**
 * Fetch page content from Mongo, falling back to defaults if no override
 * exists yet or the DB is unreachable. Never throws — content pages must
 * keep rendering even if Mongo is briefly unavailable.
 */
export async function getContent<T extends Record<string, unknown>>(slug: string, defaults: T): Promise<T> {
  try {
    const db = await getDb();
    const doc = await db.collection<ContentDoc<T>>('content').findOne({ slug });
    if (!doc) return defaults;
    return { ...defaults, ...doc.data };
  } catch (err) {
    console.error(`getContent(${slug}) failed, using defaults:`, err);
    return defaults;
  }
}

export async function setContent(slug: string, data: Record<string, unknown>): Promise<void> {
  const db = await getDb();
  await db.collection('content').updateOne(
    { slug },
    { $set: { slug, data, updatedAt: new Date() } },
    { upsert: true }
  );
}

export async function listContentSlugs(): Promise<string[]> {
  const db = await getDb();
  const docs = await db.collection('content').find({}, { projection: { slug: 1 } }).toArray();
  return docs.map(d => d.slug as string);
}
