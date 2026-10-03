export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '../../../../lib/auth';
import { getContent, setContent } from '../../../../lib/content';
import { pageDefaultsBySlug } from '../../../../lib/pageDefaults';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const defaults = pageDefaultsBySlug[slug];
  if (!defaults) {
    return NextResponse.json({ error: 'Unknown page' }, { status: 404 });
  }
  const data = await getContent(slug, defaults);
  return NextResponse.json({ slug, data });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { slug } = await params;
  if (!pageDefaultsBySlug[slug]) {
    return NextResponse.json({ error: 'Unknown page' }, { status: 404 });
  }
  const body = await request.json();
  if (!body || typeof body !== 'object' || !body.data) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }
  await setContent(slug, body.data);
  return NextResponse.json({ success: true });
}
