import { getDb } from './mongodb';

export const UPLOAD_FOLDERS = ['products', 'gallery', 'pages', 'misc'] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const ALLOWED_MIME_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export const MAX_UPLOAD_SIZE = 8 * 1024 * 1024; // 8MB

export interface StoredUploadDoc {
  folder: string;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

export async function ensureUploadIndexes() {
  const db = await getDb();
  await db.collection('StoredUpload').createIndex({ folder: 1, filename: 1 }, { unique: true });
}

/**
 * Deletes a stored upload if the given URL points at our Mongo-backed
 * upload API (/api/uploads/<folder>/<filename>). No-op for any other URL
 * (external, unsplash, or legacy /uploads/* disk paths).
 */
export async function deleteUploadByUrl(url: string | undefined | null): Promise<void> {
  if (!url || !url.startsWith('/api/uploads/')) return;
  const parts = url.replace('/api/uploads/', '').split('/');
  if (parts.length !== 2) return;
  const [folder, filename] = parts;
  try {
    const db = await getDb();
    await db.collection('StoredUpload').deleteOne({ folder, filename });
  } catch (err) {
    console.error('deleteUploadByUrl failed:', err);
  }
}
