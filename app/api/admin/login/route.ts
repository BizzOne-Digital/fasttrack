export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createAdminSession, verifyAdminCredentials } from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  if (typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }
  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }
  await createAdminSession(email);
  return NextResponse.json({ success: true });
}
