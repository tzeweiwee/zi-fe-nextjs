import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {

  const protectedRoutes = ['/api/users'];
  const session = await auth();

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  return NextResponse.next();
}