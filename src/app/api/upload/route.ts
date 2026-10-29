// =============================================================
// POST /api/upload — Upload gambar ke Cloudinary (Cloud Storage)
// -------------------------------------------------------------
// - Menerima multipart/form-data dengan field "file".
// - Menggunakan unsigned upload preset (tidak perlu API Secret).
// - Mengembalikan { url, publicId } → url dikirim ke backend.
// =============================================================

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: Request) {

  // 1. Konfigurasi Cloudinary
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !uploadPreset) {
    return NextResponse.json(
      { error: 'Cloudinary belum dikonfigurasi. Isi CLOUDINARY_CLOUD_NAME dan CLOUDINARY_UPLOAD_PRESET di .env.local.' },
      { status: 500 }
    );
  }

  // 2. Validasi file
  let file: FormDataEntryValue | null;
  try {
    const form = await req.formData();
    file = form.get('file');
  } catch {
    return NextResponse.json({ error: 'Request upload tidak valid.' }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'File gambar tidak ditemukan.' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Hanya file gambar yang diizinkan.' }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'Ukuran gambar maksimal 5 MB.' }, { status: 400 });
  }

  // 3. Kirim ke Cloudinary menggunakan unsigned upload preset
  const body = new FormData();
  body.append('file', file);
  body.append('upload_preset', uploadPreset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body,
    });
    const json = await res.json().catch(() => ({}));

    if (!res.ok || !json.secure_url) {
      return NextResponse.json(
        { error: json?.error?.message || 'Gagal mengunggah gambar ke Cloud Storage.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: json.secure_url as string, publicId: json.public_id as string });
  } catch {
    return NextResponse.json(
      { error: 'Tidak dapat terhubung ke Cloud Storage.' },
      { status: 502 }
    );
  }
}

