import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

function detectAndRedirectLocale(request: Request) {
  const { nextUrl, cookies: requestCookies } = request as any;
  const path = nextUrl.pathname;

  if (path.startsWith('/admin')) {
    return null;
  }
}


export default withAuth(
 
  function middleware(request) {
    const localeRedirect = detectAndRedirectLocale(request);
    if (localeRedirect) {
      return localeRedirect;
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: async ({ req, token }) => {
        const { pathname } = req.nextUrl;

        if (pathname === '/') {
          return true;
        }

        if (pathname.startsWith('/admin')) {
          return token?.role === 'admin';
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/', '/admin'],
};