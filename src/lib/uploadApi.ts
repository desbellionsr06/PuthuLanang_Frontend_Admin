// =============================================================
// uploadApi.ts — Client helper untuk upload gambar ke Cloud Storage
// Alur: browser → /api/upload (Next.js, butuh login) → Cloudinary
// =============================================================

export const MAX_IMAGE_SIZE_MB = 5;

/**
 * Upload satu file gambar ke Cloud Storage dan kembalikan URL publiknya.
 * Melempar Error dengan pesan yang siap ditampilkan ke pengguna.
 */
export async function uploadImageToCloud(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', { method: 'POST', body: formData });
  const json = await res.json().catch(() => ({}));

  if (!res.ok || !json.url) {
    throw new Error(json.error || `Gagal mengunggah gambar (${res.status}).`);
  }
  return json.url as string;
}
