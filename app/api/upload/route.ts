export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAdminSession } from '../../../lib/auth';
import { getDb } from '../../../lib/mongodb';
import { UPLOAD_FOLDERS, ALLOWED_MIME_TYPES, MAX_UPLOAD_SIZE, deleteUploadByUrl } from '../../../lib/uploads';

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const folder = formData.get('folder');
  const replaceUrl = formData.get('replaceUrl');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }
  if (typeof folder !== 'string' || !UPLOAD_FOLDERS.includes(folder as any)) {
    return NextResponse.json({ error: 'Invalid folder' }, { status: 400 });
  }
  if (!(file.type in ALLOWED_MIME_TYPES)) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_SIZE) {
    return NextResponse.json({ error: 'File exceeds 8MB limit' }, { status: 400 });
  }

  const ext = ALLOWED_MIME_TYPES[file.type];
  const filename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const db = await getDb();
  await db.collection('StoredUpload').createIndex({ folder: 1, filename: 1 }, { unique: true });
  await db.collection('StoredUpload').insertOne({
    folder,
    filename,
    mimeType: file.type,
    size: file.size,
    data: buffer,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  if (typeof replaceUrl === 'string' && replaceUrl) {
    await deleteUploadByUrl(replaceUrl);
  }

  return NextResponse.json({
    success: true,
    url: `/api/uploads/${folder}/${filename}`,
    filename,
    size: file.size,
    folder,
  });
}
