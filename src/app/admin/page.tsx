import { redirect } from 'next/navigation';

// /admin → langsung ke dashboard
export default function AdminIndexPage() {
  redirect('/admin/dashboard');
}
