import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { BACKEND_URL } from '@/lib/config';

/**
 * GET /api/admin/session-token
 * Menukar sesi Google OAuth (NextAuth) yang aktif di server menjadi JWT role 'manager'
 * dari backend Express agar client Admin berkomunikasi menggunakan Bearer JWT.
 */
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Sesi admin tidak valid.' }, { status: 401 });
  }

  const adminSecret =
    process.env.ADMIN_SECRET ||
    process.env.NEXT_PUBLIC_ADMIN_KEY ||
    'puthu-admin-2026';

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/manager-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': adminSecret,
      },
      body: JSON.stringify({
        email: session.user.email,
        nama: session.user.name || 'Manajer Puthu Lanang',
      }),
      cache: 'no-store',
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: errJson.message || 'Gagal memperoleh token JWT manajer dari backend.' },
        { status: res.status }
      );
    }

    const json = await res.json();
    return NextResponse.json({
      jwt_token: json.jwt_token,
      user: json.user,
    });
  } catch {
    return NextResponse.json(
      { error: 'Backend tidak dapat dijangkau saat menukar token sesi.' },
      { status: 503 }
    );
  }
}

