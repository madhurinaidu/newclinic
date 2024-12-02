export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    /*
     * Match only for dashboard routes:
     * 1. /dashboard/*
     */
    // '/dashboard/:path*',
  ],
};
