export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../../../lib/mongodb';
import { UPLOAD_FOLDERS } from '../../../../../lib/uploads';

function isSafeSegment(segment: string): boolean {
  return !segment.includes('..') && !segment.includes('/') && !segment.includes('\\');
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ folder: string; filename: string }> }
) {
  const { folder, filename } = await params;

  if (!isSafeSegment(folder) || !isSafeSegment(filename)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }
  if (!UPLOAD_FOLDERS.includes(folder as any)) {
    return NextResponse.json({ error: 'Invalid folder' }, { status: 400 });
  }

  const db = await getDb();
  const doc = await db.collection('StoredUpload').findOne({ folder, filename });

  if (!doc) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const buffer: Buffer = doc.data.buffer ? Buffer.from(doc.data.buffer) : Buffer.from(doc.data);

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Content-Type': doc.mimeType,
      'Content-Length': String(buffer.length),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
