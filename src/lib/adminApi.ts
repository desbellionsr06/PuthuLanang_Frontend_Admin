// =============================================================
// adminApi.ts — Service layer untuk Admin Panel (Pemantau/Manajer)
// Menggunakan Bearer JWT token (role: 'manager') yang ditukar dari sesi
// NextAuth via /api/admin/session-token, sambil menjaga kompatibilitas
// endpoint backend yang sudah berjalan.
// =============================================================

import { BACKEND_URL, ADMIN_KEY } from '@/lib/config';

let cachedManagerJwt: string | null = null;
let pendingTokenPromise: Promise<string | null> | null = null;

async function getManagerJwtToken(): Promise<string | null> {
  if (cachedManagerJwt) return cachedManagerJwt;

  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('manager_jwt_token');
    if (stored) {
      cachedManagerJwt = stored;
      return stored;
    }
  }

  if (!pendingTokenPromise) {
    pendingTokenPromise = fetch('/api/admin/session-token', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) return null;
        const json = await res.json();
        const token = typeof json.jwt_token === 'string' ? json.jwt_token : null;
        if (token && typeof window !== 'undefined') {
          cachedManagerJwt = token;
          sessionStorage.setItem('manager_jwt_token', token);
        }
        return token;
      })
      .catch(() => null)
      .finally(() => {
        pendingTokenPromise = null;
      });
  }

  return pendingTokenPromise;
}

export function clearCachedManagerJwt(): void {
  cachedManagerJwt = null;
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('manager_jwt_token');
  }
}

async function buildAdminHeaders(includeJsonContentType = true): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'X-Admin-Key': ADMIN_KEY,
  };
  if (includeJsonContentType) {
    headers['Content-Type'] = 'application/json';
  }
  const jwt = await getManagerJwtToken();
  if (jwt) {
    headers['Authorization'] = `Bearer ${jwt}`;
  }
  return headers;
}

// ---------------------------------------------------------------
// Tipe data dari backend
// ---------------------------------------------------------------
export interface BackendOrder {
  id: number;
  order_id: string;
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
  estimated_minutes?: number | null;
  estimated_ready_at?: string | null;
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

export interface MenuPayload {
  name: string;
  price: number;
  category: string;
  description?: string;
  stock?: number;
  image?: string;
  estimasi_waktu_kukus?: number;
  takaran_porsi?: string;
}

export interface MenuUpdatePayload {
  name?: string;
  price?: number;
  category?: string;
  description?: string;
  estimasi_waktu_kukus?: number;
  takaran_porsi?: string;
}

// ---------------------------------------------------------------
// Tipe data AI Logs & Verifikasi Manual Manajer
// ---------------------------------------------------------------
export type AiFeatureType = 'queue_estimator' | 'menu_recommendation';
export type AiVerificationStatus = 'pending' | 'verified' | 'rejected';

export interface AiLogItem {
  id: number;
  feature_type: AiFeatureType;
  requested_by_user_id: number | null;
  requested_by_name: string | null;
  anonymized_input: Record<string, unknown>;
  validated_output: Record<string, unknown>;
  confidence_score: string | null;
  verification_status: AiVerificationStatus;
  verified_by_name?: string | null;
  verification_notes: string | null;
  verified_at: string | null;
  created_at: string;
}

export interface AiVerificationStats {
  total_logs: number;
  pending_count: number;
  verified_count: number;
  rejected_count: number;
  verification_rate_pct: number;
}

async function readError(res: Response, fallback: string): Promise<string> {
  if (res.status === 403) {
    return 'Akses ditolak: Dashboard hanya dapat diakses oleh akun admin terdaftar (maks. 3 akun).';
  }
  const json = await res.json().catch(() => ({}));
  if (json.error?.includes?.('403') || json.message?.includes?.('403') || json.error?.includes?.('Akses ditolak')) {
    return 'Akses ditolak: Dashboard hanya dapat diakses oleh akun admin terdaftar (maks. 3 akun).';
  }
  return json.error || json.message || `${fallback}: ${res.status}`;
}

// ---------------------------------------------------------------
// Pesanan & Statistik Dashboard
// ---------------------------------------------------------------
export async function fetchAdminOrders(status?: string): Promise<BackendOrder[]> {
  const params = new URLSearchParams({ admin_key: ADMIN_KEY });
  if (status && status !== 'Semua') params.set('status', status);

  const res = await fetch(`${BACKEND_URL}/api/admin/orders?${params}`, {
    headers: await buildAdminHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error('Akses ditolak: Dashboard hanya dapat diakses oleh akun admin terdaftar (maks. 3 akun).');
    }
    throw new Error(`Gagal mengambil pesanan: ${res.status}`);
  }
  const json = await res.json();
  return json.data as BackendOrder[];
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  estimatedMinutes?: number
): Promise<void> {
  const numericId = orderId.replace(/^ORD-/i, '');

  const bodyPayload: { status: string; estimated_minutes?: number } = { status };
  if (estimatedMinutes !== undefined && Number.isInteger(estimatedMinutes) && estimatedMinutes > 0) {
    bodyPayload.estimated_minutes = estimatedMinutes;
  }

  const res = await fetch(`${BACKEND_URL}/api/admin/orders/${numericId}/status?admin_key=${ADMIN_KEY}`, {
    method: 'PATCH',
    headers: await buildAdminHeaders(),
    body: JSON.stringify(bodyPayload),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    if (res.status === 403) {
      throw new Error('Akses ditolak: Dashboard hanya dapat diakses oleh akun admin terdaftar (maks. 3 akun).');
    }
    throw new Error(json.error || json.message || `Gagal mengubah status: ${res.status}`);
  }
}

export async function fetchAdminMenu(): Promise<BackendMenu[]> {
  const res = await fetch(`${BACKEND_URL}/api/admin/menu?admin_key=${ADMIN_KEY}`, {
    headers: await buildAdminHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Gagal mengambil menu: ${res.status}`);
  const json = await res.json();
  return json.data as BackendMenu[];
}

export async function createAdminMenu(payload: MenuPayload): Promise<{ id: string }> {
  const res = await fetch(`${BACKEND_URL}/api/admin/menu?admin_key=${ADMIN_KEY}`, {
    method: 'POST',
    headers: await buildAdminHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await readError(res, 'Gagal menyimpan menu ke database'));
  const json = await res.json().catch(() => ({}));
  return { id: String(json.data?.id ?? '') };
}

export async function updateAdminMenu(id: string, payload: MenuUpdatePayload): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/api/admin/menu/${id}?admin_key=${ADMIN_KEY}`, {
    method: 'PATCH',
    headers: await buildAdminHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await readError(res, 'Gagal memperbarui menu'));
}

export async function deleteAdminMenu(id: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/api/admin/menu/${id}?admin_key=${ADMIN_KEY}`, {
    method: 'DELETE',
    headers: await buildAdminHeaders(false),
  });

  if (!res.ok) throw new Error(await readError(res, 'Gagal menghapus menu'));
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await fetch(`${BACKEND_URL}/api/admin/stats?admin_key=${ADMIN_KEY}`, {
    headers: await buildAdminHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Gagal mengambil statistik: ${res.status}`);
  return res.json() as Promise<AdminStats>;
}

export async function fetchSalesChart(days: number): Promise<SalesChartData> {
  const res = await fetch(
    `${BACKEND_URL}/api/admin/sales-chart?days=${days}&admin_key=${ADMIN_KEY}`,
    { headers: await buildAdminHeaders(false), cache: 'no-store' }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<SalesChartData>;
}

// ---------------------------------------------------------------
// AI Analytics & Verifikasi Manual Manajer
// ---------------------------------------------------------------
export async function fetchAiLogs(
  status?: AiVerificationStatus | 'all',
  featureType?: AiFeatureType | 'all'
): Promise<AiLogItem[]> {
  const params = new URLSearchParams();
  if (status && status !== 'all') params.set('status', status);
  if (featureType && featureType !== 'all') params.set('feature_type', featureType);

  const qs = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${BACKEND_URL}/api/ai/logs${qs}`, {
    headers: await buildAdminHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(await readError(res, 'Gagal mengambil log hasil AI'));
  const json = await res.json();
  return (json.data ?? []) as AiLogItem[];
}

export async function fetchAiStats(): Promise<AiVerificationStats> {
  const res = await fetch(`${BACKEND_URL}/api/ai/stats`, {
    headers: await buildAdminHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(await readError(res, 'Gagal mengambil statistik AI'));
  const json = await res.json();
  return json.data as AiVerificationStats;
}

export async function verifyAiLog(
  logId: number,
  verificationStatus: 'verified' | 'rejected',
  verificationNotes?: string
): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/api/ai/logs/${logId}/verify`, {
    method: 'PATCH',
    headers: await buildAdminHeaders(),
    body: JSON.stringify({
      verification_status: verificationStatus,
      verification_notes: verificationNotes?.trim() || undefined,
    }),
  });

  if (!res.ok) throw new Error(await readError(res, 'Gagal memverifikasi hasil AI'));
}

export async function generateAiQueueTest(payload: {
  outlet: string;
  day: string;
  timeSlot: string;
  distanceKm?: number;
}): Promise<Record<string, unknown>> {
  const res = await fetch(`${BACKEND_URL}/api/ai/queue-estimator`, {
    method: 'POST',
    headers: await buildAdminHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await readError(res, 'Gagal menjalankan prediksi AI'));
  return res.json();
}
