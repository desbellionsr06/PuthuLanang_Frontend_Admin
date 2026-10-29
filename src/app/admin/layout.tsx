// Layout untuk seluruh rute /admin/** (dashboard, kelola).
// Server Component: memeriksa sesi NextAuth di sisi server.
// Belum login → redirect ke /login (lapisan kedua setelah src/proxy.ts).

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata: Metadata = {
  title: 'Admin | Puthu Lanang Malang',
  description: 'Admin Management System Puthu Lanang Malang — kelola pesanan dan menu.',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const adminName = session.user.name || session.user.email || 'Admin';

  return <AdminShell adminName={adminName}>{children}</AdminShell>;
}
