// =============================================================
// adminApi.ts — Service layer untuk Admin Panel
// Semua request ke backend berpusat di sini.
// =============================================================

const BACKEND_URL = 'http://localhost:5000';
const ADMIN_KEY = 'puthu-admin-2026';

const adminHeaders: HeadersInit = {
  'Content-Type': 'application/json',
  'X-Admin-Key': ADMIN_KEY,
};

// ---------------------------------------------------------------
// Tipe data dari backend
// ---------------------------------------------------------------
export interface BackendOrder {
  id: number;
  order_id: string;          // 'ORD-{id}'
  qr_code_token: string;
  antrean: number;
  status: string;
  total: number;
  customer_name: string;
  customer_phone: string;
  pickup_time: string;
  pickup_date: string;
  notes: string;
  summary_items: string;
  created_at: string;
}

export interface BackendMenu {
  id: string | number;
  name: string;
  category: string;
  description?: string;
  image?: string;
  price: number;
  stock?: number;
  rating?: string | number;
  // Kolom tambahan dari ensureMenuSchema
  nama?: string;
  harga?: number;
  kategori?: string;
  deskripsi?: string;
  gambar?: string;
  tersedia?: number;
}

export interface AdminStats {
  total_orders: number;
  new_orders: number;
  total_menu: number;
  total_customers: number;
}

// ---------------------------------------------------------------
// Fetch semua pesanan (opsional filter status)
// ---------------------------------------------------------------
export async function fetchAdminOrders(status?: string): Promise<BackendOrder[]> {
  const params = new URLSearchParams({ admin_key: ADMIN_KEY });
  if (status && status !== 'Semua') params.set('status', status);

  const res = await fetch(`${BACKEND_URL}/api/admin/orders?${params}`, {
    headers: adminHeaders,
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Gagal mengambil pesanan: ${res.status}`);
  const json = await res.json();
  return json.data as BackendOrder[];
}

// ---------------------------------------------------------------
// Ubah status pesanan
// ---------------------------------------------------------------
export async function updateOrderStatus(orderId: string, status: string): Promise<void> {
  // orderId boleh 'ORD-5' atau '5'
  const numericId = orderId.replace(/^ORD-/i, '');

  const res = await fetch(`${BACKEND_URL}/api/admin/orders/${numericId}/status?admin_key=${ADMIN_KEY}`, {
    method: 'PATCH',
    headers: adminHeaders,
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || `Gagal mengubah status: ${res.status}`);
  }
}

// ---------------------------------------------------------------
// Fetch semua menu dari database
// ---------------------------------------------------------------
export async function fetchAdminMenu(): Promise<BackendMenu[]> {
  const res = await fetch(`${BACKEND_URL}/api/admin/menu?admin_key=${ADMIN_KEY}`, {
    headers: adminHeaders,
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Gagal mengambil menu: ${res.status}`);
  const json = await res.json();
  return json.data as BackendMenu[];
}

// ---------------------------------------------------------------
// Fetch statistik dashboard
// ---------------------------------------------------------------
export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await fetch(`${BACKEND_URL}/api/admin/stats?admin_key=${ADMIN_KEY}`, {
    headers: adminHeaders,
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Gagal mengambil statistik: ${res.status}`);
  return res.json() as Promise<AdminStats>;
}
