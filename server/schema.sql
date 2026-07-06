-- RUN THIS IN YOUR SUPABASE SQL EDITOR

-- 1. Tabel Kustomisasi Landing Page (Maksimal 1 baris)
CREATE TABLE IF NOT EXISTS landing_config (
    id INT PRIMARY KEY DEFAULT 1,
    hero_badge TEXT DEFAULT 'Penyedia Jasa IT Terpercaya & Premium',
    hero_title TEXT DEFAULT 'Transformasi Digital Bisnis Anda Bersama Berdikari Tech',
    hero_description TEXT DEFAULT 'Kami merancang dan mengembangkan website premium, aplikasi mobile (iOS & Android), serta sistem custom berkinerja tinggi untuk membantu bisnis Anda berkembang lebih cepat, aman, dan profesional.',
    cta_title TEXT DEFAULT 'Siap Memulai Transformasi Digital?',
    cta_description TEXT DEFAULT 'Konsultasikan ide aplikasi atau website Anda bersama tim konsultan ahli IT kami secara gratis. Dapatkan estimasi biaya dan rancangan proyek dalam waktu singkat.',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT one_row_only CHECK (id = 1)
);

-- Masukkan data default jika belum ada
INSERT INTO landing_config (id, hero_badge, hero_title, hero_description, cta_title, cta_description)
VALUES (1, 'Penyedia Jasa IT Terpercaya & Premium', 'Transformasi Digital Bisnis Anda Bersama Berdikari Tech', 'Kami merancang dan mengembangkan website premium, aplikasi mobile (iOS & Android), serta sistem custom berkinerja tinggi untuk membantu bisnis Anda berkembang lebih cepat, aman, dan profesional.', 'Siap Memulai Transformasi Digital?', 'Konsultasikan ide aplikasi atau website Anda bersama tim konsultan ahli IT kami secara gratis. Dapatkan estimasi biaya dan rancangan proyek dalam waktu singkat.')
ON CONFLICT (id) DO NOTHING;

-- 2. Tabel Portal Kegiatan/Berita
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Kegiatan', 'Rilis', 'Pengumuman', 'Berita'
    date DATE NOT NULL,
    short_desc TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Masukkan data contoh awal kegiatan
INSERT INTO activities (title, category, date, short_desc, content, image_url)
VALUES 
('Peningkatan Infrastruktur Server Berdikari Tech', 'Rilis', '2026-07-01', 'Berdikari Tech meningkatkan infrastruktur server cloud demi kinerja akses client 200% lebih cepat.', 'Kami dengan bangga mengumumkan bahwa per 1 Juli 2026, Berdikari Tech telah berhasil menyelesaikan migrasi dan peningkatan kapasitas infrastruktur server utama kami ke arsitektur multi-region yang baru. Peningkatan ini mencakup adopsi memori NVMe Gen5 berkecepatan tinggi, optimasi caching layer otomatis, dan pembagian beban server pintar (Load Balancing). Dampak langsung dari migrasi ini adalah pengurangan latensi server hingga 60% dan peningkatan kecepatan transfer data hingga 200%. Layanan ini langsung diaktifkan untuk seluruh website dan aplikasi mobile milik klien kami tanpa biaya tambahan.', '/images/erp_dashboard.png'),
('Pelatihan Coding Gratis untuk Siswa SMK', 'Kegiatan', '2026-06-25', 'Program CSR Berdikari Tech Berbagi Ilmu dalam dunia web development kepada komunitas lokal.', 'Berdikari Tech berkomitmen penuh untuk memajukan talenta digital Indonesia melalui program Tanggung Jawab Sosial Perusahaan (CSR). Kami mengadakan workshop intensif "Dasar Pembuatan Website Modern" selama 3 hari bagi 50 siswa SMK jurusan Rekayasa Perangkat Lunak. Kegiatan ini dibimbing langsung oleh tim expert senior developer kami, membahas HTML/CSS, React, dan pengenalan database Supabase. Melalui kegiatan ini, kami berharap para siswa mendapatkan gambaran praktis tentang industri software engineering saat ini.', '/images/ecommerce_web.png')
ON CONFLICT DO NOTHING;

-- 3. Tabel Formulir Kontak / Rekap Data Pelanggan (Leads)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Masukkan data contoh leads
INSERT INTO contact_submissions (name, company, email, phone, service, message)
VALUES
('Ahmad Fauzi', 'CV Maju Jaya', 'ahmad.fauzi@gmail.com', '081234567890', 'web', 'Halo Berdikari Tech, kami membutuhkan website e-commerce untuk toko retail kami. Mohon bantuannya.'),
('Sarah Wijaya', 'Medika Utama', 'sarah.w@medikautama.co.id', '085712345678', 'mobile', 'Kami ingin membuat aplikasi mobile konsultasi kesehatan serupa dengan MedPlus. Apakah bisa dibantu untuk estimasi biayanya?')
ON CONFLICT DO NOTHING;

-- 4. Tabel Manajemen Portofolio
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'web', 'mobile', 'uiux'
    category_label TEXT NOT NULL, -- 'Website & Web App', 'Mobile Application', 'UI/UX Design'
    image_url TEXT NOT NULL,
    short_desc TEXT NOT NULL,
    client TEXT NOT NULL,
    year TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Masukkan data portofolio bawaan
INSERT INTO portfolios (slug, title, category, category_label, image_url, short_desc, client, year, tags, challenge, solution, results)
VALUES
(
  'erp-aethera', 
  'Aethera Enterprise ERP', 
  'web', 
  'Website & Web App', 
  '/images/erp_dashboard.png', 
  'Dashboard ERP kustom untuk otomatisasi keuangan, SDM, dan rantai pasokan korporasi.',
  'PT Aethera Manufaktur',
  '2025',
  ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Chart.js'],
  'Mengintegrasikan data multi-cabang yang sebelumnya tersebar secara manual di Excel, menyebabkan keterlambatan sinkronisasi data keuangan hingga 4 hari.',
  'Membangun dashboard ERP tersentralisasi berkecepatan tinggi dengan data sinkronisasi real-time kurang dari 2 detik dan visualisasi chart interaktif untuk pengambilan keputusan instan.',
  'Meningkatkan akurasi laporan keuangan hingga 99.8%, menghemat 120+ jam kerja administratif per bulan, dan mempercepat rekonsiliasi bulanan dari 4 hari menjadi 15 menit.'
),
(
  'medplus-health', 
  'MedPlus Health Solution', 
  'mobile', 
  'Mobile Application', 
  '/images/medical_app.png', 
  'Aplikasi konsultasi dokter online, rekam medis digital, dan pemesanan obat langsung.',
  'Klinik MedPlus Utama',
  '2025',
  ARRAY['Flutter', 'Firebase', 'Node.js', 'Google Maps API'],
  'Pasien harus mengantre hingga 2 jam untuk konsultasi rutin dan kesulitan melacak riwayat resep obat secara digital.',
  'Mengembangkan aplikasi mobile Android & iOS dengan fitur telekonsultasi video terintegrasi, pemesanan obat berbasis lokasi, dan e-medical record terenkripsi.',
  'Mengurangi waktu tunggu pasien sebesar 82%, melayani 5.000+ telekonsultasi aktif di bulan pertama, dan meningkatkan retensi pasien klinik sebesar 45%.'
),
(
  'solaria-ecommerce', 
  'Solaria Premium E-Commerce', 
  'web', 
  'Website & Web App', 
  '/images/ecommerce_web.png', 
  'Platform belanja online dengan navigasi modern, checkout kilat, dan payment gateway.',
  'Solaria Retail Group',
  '2024',
  ARRAY['Next.js', 'TailwindCSS', 'Stripe', 'GraphQL', 'Shopify API'],
  'Tingkat drop-off (keranjang belanja ditinggalkan) mencapai 68% karena proses pengisian formulir checkout yang berbelit-belit.',
  'Mendesain ulang user flow website dan mengimplementasikan fitur checkout satu klik dengan integrasi payment gateway otomatis yang menurunkan tingkat drop-off menjadi 22%.',
  'Menurunkan tingkat keranjang belanja diabaikan sebesar 46%, meningkatkan rata-rata nilai transaksi (AOV) sebesar 18%, dan mendongkrak penjualan online sebesar 32%.'
),
(
  'velo-wallet', 
  'Velo E-Wallet & Crypto', 
  'mobile', 
  'Mobile Application', 
  '/images/ewallet_app.png', 
  'Aplikasi dompet digital multifungsi untuk transfer, pembayaran biller, dan jual-beli crypto.',
  'Velo Finance Ltd.',
  '2025',
  ARRAY['React Native', 'Web3.js', 'NestJS', 'Redis', 'FaceID SDK'],
  'Memerlukan otentikasi transaksi super aman yang tetap terasa cepat dan tanpa lag di ponsel berspesifikasi rendah.',
  'Membuat aplikasi e-wallet ultra-ringan dengan otentikasi biometrik lokal yang diamankan enkripsi AES-256 dan sinkronisasi blockchain asinkron.',
  'Mencapai 200.000+ pengguna aktif bulanan dalam 90 hari pertama, dengan tingkat keberhasilan transaksi 99,99% dan rating 4.8 di Play Store.'
)
ON CONFLICT (slug) DO NOTHING;

-- 5. Tabel Transaksi Keuangan (Ledger Keuangan)
CREATE TABLE IF NOT EXISTS financial_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    category TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Masukkan data transaksi simulasi awal
INSERT INTO financial_transactions (date, type, category, amount, description)
VALUES
('2026-07-02', 'income', 'Proyek Web', 15000000, 'DP 50% Pembuatan E-Commerce PT Maju'),
('2026-07-03', 'income', 'Produk Digital: Undangan', 297000, 'Penjualan 3 unit Undangan Pernikahan Gold'),
('2026-07-04', 'expense', 'Gaji Karyawan', 7500000, 'Pembayaran gaji bulanan desainer UI/UX'),
('2026-07-05', 'expense', 'Sewa Server', 850000, 'Biaya server AWS & GCP Hosting Utama'),
('2026-07-05', 'income', 'Produk Digital: E-Book', 196000, 'Penjualan 4 unit E-Book Panduan AI Automasi'),
('2026-07-06', 'expense', 'Pemasaran', 1200000, 'Iklan Instagram & Google Ads untuk Leads Campaign'),
('2026-07-06', 'income', 'Proyek Mobile', 24500000, 'Pelunasan Aplikasi Klinik MedPlus Mobile')
ON CONFLICT DO NOTHING;

-- 6. Tabel Invoices (Penagihan Klien)
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    project_name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
    due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Masukkan data invoice awal
INSERT INTO invoices (invoice_number, client_name, client_email, project_name, amount, status, due_date)
VALUES
('INV-2026-001', 'Budi Santoso', 'budi@majujaya.com', 'ERP Integration Phase 1', 12500000, 'paid', '2026-07-15'),
('INV-2026-002', 'Dewi Lestari', 'dewi.l@medika.co.id', 'Mobile App Health Portal', 8000000, 'pending', '2026-07-20'),
('INV-2026-003', 'Rian Hidayat', 'rian@solaria.com', 'E-Commerce Website Revamp', 4500000, 'cancelled', '2026-07-10')
ON CONFLICT (invoice_number) DO NOTHING;

