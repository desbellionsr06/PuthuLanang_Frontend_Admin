import { redirect } from 'next/navigation';

// Route "/" — dulunya halaman admin. Sekarang seluruh panel ada di /admin/**
// (dilindungi login), sehingga root cukup mengarahkan ke sana.
export default function RootPage() {
  redirect('/admin/dashboard');
}
