import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masuk Admin | Puthu Lanang Malang',
  description: 'Halaman masuk untuk Admin Management System Puthu Lanang Malang.',
};

// Layout minimal untuk grup rute (auth) — tidak ada sidebar/navbar admin.
// Folder (auth) = Route Group: tidak memengaruhi URL path sama sekali.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#1E1510]">
      {children}
    </div>
  );
}
