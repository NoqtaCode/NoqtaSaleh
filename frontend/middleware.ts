import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminSessionToken } from './lib/session';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;
  const isAuthenticated = await verifyAdminSessionToken(session?.value);

  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// تحديد الصفحات التي يراقبها الحارس (كل ما هو داخل admin)
export const config = {
  matcher: ['/admin/:path*', '/login'],
};
