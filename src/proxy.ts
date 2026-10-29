// =============================================================
// proxy.ts — Perlindungan rute /admin/** (Next.js 16+)
// -------------------------------------------------------------
// Next.js 16 menggunakan "proxy.ts" (bukan "middleware.ts").
// auth() dari Auth.js otomatis redirect user yang belum login
// ke halaman /login.
// =============================================================

export { auth as default } from '@/auth';

export const config = {
  matcher: ['/admin/:path*'],
};


