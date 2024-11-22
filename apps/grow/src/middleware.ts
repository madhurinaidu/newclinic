export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /login
     * 2. /api (API routes)
     * 3. /_next (Next.js internals)
     * 4. /static (static files)
     * 5. /favicon.ico, /robots.txt (public files)
     */
    '/((?!login|api|_next|static|favicon.ico|robots.txt).*)',
  ],
};
