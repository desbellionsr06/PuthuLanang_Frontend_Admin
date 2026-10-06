# 🎋 Puthu Lanang Malang - Frontend Admin Management System

> **Ujian Tengah Semester (UTS) - Pemrograman Frontend / Frontend Development**  
> Sistem Manajemen & Dashboard Operasional Berbasis Web untuk Kuliner Legendaris Celaket Malang Sejak 1935.

---

## 📌 Ringkasan Proyek
**Puthu Lanang Frontend Admin** adalah platform manajemen dashboard berbasis **Next.js (App Router)** dan **TypeScript** yang dirancang khusus untuk mengelola operasional gerai kuliner legendaris **Puthu Lanang Celaket Malang (Est. 1935)**. 

Aplikasi ini menyajikan solusi digital untuk memantau transaksi masuk, mengelola antrean dapur kukusan bambu (*Smart Takeaway Order Management*), melakukan manajemen katalog produk (*Menu CRUD*), serta menghadirkan rancangan konseptual **AI Smart Stock & Demand Predictor** guna mengantisipasi lonjakan pembeli berdasarkan dinamika cuaca dan hari libur di Kota Malang.

---

## 🚀 Panduan Menjalankan Proyek di Lokal

Ikuti langkah-langkah berikut untuk menjalankan repositori ini di komputer lokal Anda:

### 1. Clone Repositori
```bash
git clone <URL_REPOSITORY_ANDA>
cd PuthuLanang_Frontend_Admin
```

### 2. Instalasi Dependensi
Pastikan **Node.js** (versi 18+ atau versi 20+ yang direkomendasikan) sudah terpasang di sistem Anda.
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Development Server)
```bash
npm run dev
```

Buka peramban (browser) dan akses alamat:
```
http://localhost:3000
```

### 4. Kredensial Akses Akun Admin
Aplikasi dilengkapi sistem autentikasi login terproteksi:
- **Username**: `admin`
- **Password**: `admin` *(atau `admin123`)*

---

## 🛠️ Daftar Teknologi & Library Utama

Sistem ini dibangun dengan stack teknologi modern berkinerja tinggi sesuai dengan `package.json`:

| Kategori | Teknologi / Library | Versi | Peran & Kegunaan |
| :--- | :--- | :--- | :--- |
| **Framework Utama** | [Next.js](https://nextjs.org/) (App Router) | `16.3.7` | Framework React dengan Server Components & optimasi rendering modern. |
| **UI Library** | [React](https://react.dev/) & React DOM | `19.2.8` | Library fondasi antarmuka komponen reaktif berbasis hooks. |
| **Bahasa Pemrograman** | [TypeScript](https://www.typescriptlang.org/) | `^5` | Static type-checking untuk kode yang andal, aman, dan minim bug. |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) | `^5.0.15` | Centralized state store yang ringan dan cepat untuk keranjang, autentikasi, & notifikasi. |
| **Styling & Design System** | [Tailwind CSS](https://tailwindcss.com/) | `^4.0.0` | Utility-first CSS framework versi 4 dengan tema kustom Heritage Dark Wood. |
| **Icon Pack** | [Lucide React](https://lucide.dev/) | `^1.49.0` | Kumpulan icon vektor yang konsisten, modern, dan informatif. |
| **Development Tooling** | `tsx` & `PostCSS` | Latest | Runtime TypeScript executor & PostCSS preprocessor. |
| **Kode & Kualitas** | `ESLint` & Next Lint | `^9` | Linter untuk menjaga standar clean code dan best practice JavaScript/TypeScript. |

---

## 📁 Struktur Folder & Arsitektur Kode

Kode diorganisasi secara modular dan terstruktur (*Clean Architecture*) di dalam direktori `src/` guna memastikan pemisahan tanggung jawab (*separation of concerns*):

```text
PuthuLanang_Frontend_Admin/
├── public/
│   └── images/                     # Aset gambar menu otentik (Puthu, Klepon, Cenil, Lupis, Hampers)
├── src/
│   ├── app/
│   │   ├── globals.css             # Konfigurasi Tailwind CSS v4 & variabel palet warna Heritage
│   │   ├── layout.tsx              # Root Layout Next.js, metadata SEO, font Plus Jakarta Sans
│   │   └── page.tsx                # Entry point utama antarmuka Admin (Auth guard & tab controller)
│   ├── components/
│   │   ├── admin/                  # Modul komponen khusus manajemen Admin
│   │   │   ├── AdminDashboard.tsx      # Dashboard metrik KPI, tabel data pesanan, & filter status
│   │   │   ├── AdminMenuCrud.tsx       # Manajemen formulir tambah/edit & katalog menu aktif
│   │   │   ├── AdminLogin.tsx          # Tampilan autentikasi admin dengan efek ambient glow
│   │   │   ├── AdminSidebarNavbar.tsx  # Header & navigasi tab interaktif
│   │   │   └── AdminAiPredictorModal.tsx # Showcase modal konsep AI Stock & Demand Predictor
│   │   ├── mobile/                 # Modul pendukung tampilan responsif layar mobile (UTS showcase)
│   │   ├── views/                  # Modul view pendukung portal konsumen & takeaway
│   │   ├── AuthModal.tsx           # Modal autentikasi user
│   │   ├── CartDrawer.tsx          # Drawer keranjang interaktif
│   │   ├── Navbar.tsx              # Navigasi utama portal
│   │   ├── Footer.tsx              # Komponen footer informasi gerai
│   │   └── ToastContainer.tsx      # Komponen notifikasi toast reaktif
│   ├── lib/
│   │   └── db.ts                   # In-memory database, katalog menu statis, & skema TypeScript
│   └── store/
│       └── useStore.ts             # Global Zustand store (Cart, Auth, Ticket, Filter, & Toasts)
├── package.json                    # Konfigurasi dependensi dan scripts proyek
├── tsconfig.json                   # Konfigurasi TypeScript path alias (@/*)
└── README.md                       # Dokumentasi resmi proyek UTS
```

---

## ✨ Fitur-Fitur Utama & Implementasi Teknis

### 1. 🔐 Admin Authentication Guard
- Dilengkapi sistem login interaktif (`AdminLogin.tsx`) dengan validasi input dan umpan balik error real-time.
- State login tersimpan secara aman dalam komponen controller (`page.tsx`) untuk melindungi data operasional.

### 2. 📊 Real-Time Operations Dashboard & Order Management
- **4 Metrik KPI Utama**: Memantau Total Pesanan, Total Menu Aktif, Antrean Pesanan Baru Dapur, dan Total Pelanggan.
- **Tabel Antrean Dapur Interaktif**: Menampilkan ID Pesanan, Nama Pemesan, Rincian Item, Metode Ambil (Jadwal Jam / Takeaway Langsung), dan Total Bayar.
- **Quick Status Changer**: Dropdown dinamis untuk mengupdate status pesanan seketika (*Baru* ➔ *Diproses* ➔ *Selesai* ➔ *Dibatalkan*).
- **Filter Tab Status**: Memfilter daftar pesanan berdasarkan status secara instan tanpa perlu reload halaman.

### 3. 🍱 Manajemen Menu Lengkap (CRUD Produk Jajanan)
- **Create**: Formulir penambahan menu baru dengan validasi nama produk, harga, kategori (*Pusaka*, *Paling Laris*, *Paket Campur*, *Besek*), estimasi waktu kukus bambu, dan takaran porsi.
- **Read**: Menampilkan kartu katalog menu aktif beresolusi tinggi dengan harga terformat Rupiah (`Intl.NumberFormat`).
- **Update**: Memuat kembali data item menu terpilih ke dalam formulir secara halus dengan *auto-scroll* untuk langsung disunting.
- **Delete**: Konfirmasi penghapusan item menu dari katalog aktif disertai notifikasi toast konfirmasi.

### 4. 🤖 Rencana Fitur AI: Smart Stock & Demand Predictor
- Banner integrasi dan modal analitik prediktif (`AdminAiPredictorModal.tsx`).
- Memperagakan sistem estimasi stok adonan tepung beras suji, kelapa parut, dan gula aren cair berdasarkan indikator cuaca Kota Malang (musim hujan vs cerah) serta libur akhir pekan (*long weekend*).

### 5. 🎨 UI/UX Tradisional Modern & Responsif Penuh
- **Filosofi Visual**: Mengadopsi palet warna Jawa Kuno & Gerai Tradisional (*Dark Wood* `#17110C`, Emas Aren `#D49B42`, dan Hijau Daun Pandan `#2E7D32`).
- **Responsifitas Lintas Perangkat**: Mulai dari tampilan smartphone (layar kecil), tablet, hingga layar desktop lebar dengan adaptasi layout CSS Grid & Flexbox yang rapi.
- **Micro-Interactions**: Transisi halus, animasi pulse/glow, hover feedback, dan custom scrollbar.

---

## 📸 Dokumentasi & Screenshot Antarmuka (Bukti Responsif)

> Bagian ini disiapkan untuk penilaian UTS guna membuktikan implementasi antarmuka yang responsif, rapi, dan fungsional.

### 1. Tampilan Desktop (Admin Dashboard & Menu Management)
| Halaman / Fitur | Screenshot Desktop |
| :--- | :--- |
| **Login Admin** | ![Screenshot Login Desktop](https://via.placeholder.com/1200x675.png?text=Screenshot+Admin+Login+-+Desktop) |
| **Dashboard Utama & Antrean Dapur** | ![Screenshot Dashboard Desktop](https://via.placeholder.com/1200x675.png?text=Screenshot+Dashboard+Utama+-+Desktop) |
| **Kelola Menu (CRUD Katalog)** | ![Screenshot CRUD Menu Desktop](https://via.placeholder.com/1200x675.png?text=Screenshot+CRUD+Menu+-+Desktop) |
| **Showcase Fitur AI Predictor** | ![Screenshot AI Modal Desktop](https://via.placeholder.com/1200x675.png?text=Screenshot+Modal+AI+Predictor+-+Desktop) |

### 2. Tampilan Mobile (Responsif Smartphone)
| Halaman / Fitur | Screenshot Mobile |
| :--- | :--- |
| **Login Admin (Mobile View)** | ![Screenshot Login Mobile](https://via.placeholder.com/400x800.png?text=Screenshot+Login+-+Mobile) |
| **Tabel Pesanan & Filter (Mobile)** | ![Screenshot Dashboard Mobile](https://via.placeholder.com/400x800.png?text=Screenshot+Dashboard+-+Mobile) |
| **Formulir Input & Katalog (Mobile)** | ![Screenshot CRUD Menu Mobile](https://via.placeholder.com/400x800.png?text=Screenshot+CRUD+Menu+-+Mobile) |

*(Catatan: Anda dapat mengganti link placeholder gambar di atas dengan screenshot aktual dari browser Anda, misalnya di folder `public/screenshots/`)*

---

## 👨‍💻 Informasi Pengembang (Ujian Tengah Semester)
- **Mata Kuliah**: Pemrograman Frontend / Frontend Development
- **Topik Proyek**: Sistem Admin & Smart Takeaway Puthu Lanang Celaket Malang Est. 1935
- **Tahun Akademik**: 2026
