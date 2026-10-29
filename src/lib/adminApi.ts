// =============================================================
// adminApi.ts — Service layer untuk Admin Panel
// Semua request ke backend berpusat di sini.
// Endpoint backend TIDAK diubah; hanya pemanggilan fetch yang dirapikan.
// =============================================================

import { BACKEND_URL, ADMIN_KEY } from '@/lib/config';

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

export interface SalesChartPoint {
  date: string;
  label: string;
  total_orders: number;
  total_revenue: number;
}

export interface SalesChartData {
  days: number;
  data: SalesChartPoint[];
  labels: string[];
  orders: number[];
  revenue: number[];
}

// Payload untuk POST /api/admin/menu (field `image` berisi URL Cloud Storage)
export interface MenuPayload {
  name: string;
  price: number;
  category: string;
  description?: string;
  stock?: number;
  image?: string;
}

// Payload untuk PATCH /api/admin/menu/:id (backend tidak menerima `image`)
export interface MenuUpdatePayload {
  name?: string;
  price?: number;
  category?: string;
  description?: string;
}

// Helper: ambil pesan error dari respons backend
async function readError(res: Response, fallback: string): Promise<string> {
  const json = await res.json().catch(() => ({}));
  return json.error || json.message || `${fallback}: ${res.status}`;
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
// Tambah menu baru — POST /api/admin/menu
// `image` (opsional) berisi URL gambar dari Cloud Storage.
// Mengembalikan id menu yang dibuat backend.
// ---------------------------------------------------------------
export async function createAdminMenu(payload: MenuPayload): Promise<{ id: string }> {
  const res = await fetch(`${BACKEND_URL}/api/admin/menu?admin_key=${ADMIN_KEY}`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await readError(res, 'Gagal menyimpan menu ke database'));
  const json = await res.json().catch(() => ({}));
  return { id: String(json.data?.id ?? '') };
}

// ---------------------------------------------------------------
// Edit menu — PATCH /api/admin/menu/:id
// ---------------------------------------------------------------
export async function updateAdminMenu(id: string, payload: MenuUpdatePayload): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/api/admin/menu/${id}?admin_key=${ADMIN_KEY}`, {
    method: 'PATCH',
    headers: adminHeaders,
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await readError(res, 'Gagal memperbarui menu'));
}

// ---------------------------------------------------------------
// Hapus menu — DELETE /api/admin/menu/:id
// ---------------------------------------------------------------
export async function deleteAdminMenu(id: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/api/admin/menu/${id}?admin_key=${ADMIN_KEY}`, {
    method: 'DELETE',
    headers: { 'X-Admin-Key': ADMIN_KEY },
  });

  if (!res.ok) throw new Error(await readError(res, 'Gagal menghapus menu'));
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

// ---------------------------------------------------------------
// Fetch data grafik penjualan — GET /api/admin/sales-chart
// ---------------------------------------------------------------
export async function fetchSalesChart(days: number): Promise<SalesChartData> {
  const res = await fetch(
    `${BACKEND_URL}/api/admin/sales-chart?days=${days}&admin_key=${ADMIN_KEY}`,
    { headers: { 'X-Admin-Key': ADMIN_KEY }, cache: 'no-store' }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<SalesChartData>;
}
