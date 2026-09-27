-- RUN THIS IN YOUR SUPABASE SQL EDITOR OR MIGRATE TO DATABASE

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
    video_url TEXT,
    short_desc TEXT NOT NULL,
    client TEXT NOT NULL,
    year TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results TEXT NOT NULL,
    demo_url TEXT,
    live_url TEXT,
    project_importance TEXT,
    client_info TEXT,
    stat_1_val TEXT,
    stat_1_label TEXT,
    stat_1_desc TEXT,
    stat_2_val TEXT,
    stat_2_label TEXT,
    stat_2_desc TEXT,
    stat_3_val TEXT,
    stat_3_label TEXT,
    stat_3_desc TEXT,
    challenge_detailed TEXT,
    solution_detailed TEXT,
    testimonial_text TEXT,
    testimonial_author TEXT,
    media JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Masukkan data portofolio bawaan
INSERT INTO portfolios (
  slug, title, category, category_label, image_url, video_url, short_desc, client, year, tags, challenge, solution, results,
  demo_url, live_url, project_importance, client_info, 
  stat_1_val, stat_1_label, stat_1_desc,
  stat_2_val, stat_2_label, stat_2_desc,
  stat_3_val, stat_3_label, stat_3_desc,
  challenge_detailed, solution_detailed, testimonial_text, testimonial_author, media
)
VALUES
(
  'wepose',
  'Wepose Visa Assistant',
  'web',
  'Website & Web App',
  '/images/wepose_web.png',
  '',
  'Sistem pengajuan visa terintegrasi AI Chatbot untuk mempermudah birokrasi aplikasi perjalanan internasional.',
  'Wepose Agensi Layanan Visa',
  '2025',
  ARRAY['Laravel 11', 'Svelte Kit', 'Mastra', 'n8n', 'Go'],
  'Tingkat kerumitan regulasi 35+ negara dan tingginya volume tiket pertanyaan manual seputar dokumen visa.',
  'Membangun dashboard pelacakan terpusat dan chatbot asisten AI interaktif dengan n8n & Mastra.',
  'Otomatisasi 24/7 customer care, penanganan 35+ negara secara dinamis, dan peningkatan efisiensi operasional sebesar 50%.',
  '/demo/wepose',
  'https://wepose.travel',
  'Pengajuan visa internasional sering kali menjadi proses yang menakutkan, membingungkan, dan rawan kesalahan bagi banyak pelancong. Berkas yang tidak lengkap atau informasi yang tertinggal dapat berujung pada penolakan visa yang merugikan secara waktu dan finansial. Melalui proyek Wepose, kami membuktikan bagaimana perpaduan antara desain antarmuka yang intuitif dan kecerdasan buatan (AI Chatbot) dapat mengubah birokrasi pengajuan visa yang rumit menjadi proses digital yang effortless, transparan, dan terstruktur.',
  'Wepose, agensi layanan pengajuan visa yang menangani proses aplikasi ke lebih dari 35 negara tujuan dengan pengalaman bertahun-tahun.',
  '24/7', 'Layanan Pelanggan (AI)', 'Integrasi AI Chatbot memastikan setiap calon pelancong mendapatkan jawaban instan mengenai syarat visa kapan pun tanpa batasan jam kerja.',
  '35+', 'Manajemen Destinasi Dinamis', 'Platform mampu mengelola regulasi, biaya, dan persyaratan dokumen untuk lebih dari 35 negara tujuan yang dapat diperbarui secara mandiri melalui CMS.',
  '50%', 'Efisiensi Tim Operasional', 'Pengurangan beban tiket pertanyaan masuk secara manual berkat sistem website yang informatif dan fitur pelacakan status (tracking) mandiri oleh pengguna.',
  'Tingtingya volume pertanyaan berulang dari pelanggan mengenai persyaratan visa, status aplikasi, dan biaya untuk berbagai negara. Proses pengumpulan dan verifikasi dokumen yang dilakukan secara manual melalui aplikasi pesan instan sering menyebabkan dokumen terselip, lambatnya respons layanan pelanggan, dan pengalaman pengguna yang kurang profesional. Regulasi Visa yang Dinamis: Setiap kedutaan memiliki syarat dokumen dan harga yang berbeda-beda dan bisa berubah sewaktu-waktu. Sistem harus sangat fleksibel agar admin dapat mengubah requirement ini tanpa harus merombak kode sumber.',
  'Kodeflow mendesain Wepose sebagai platform SaaS-like yang memadukan automasi cerdas dengan manajemen data terstruktur: 1. Conversational Interface Pipeline: Menghubungkan frontend dengan layanan pemrosesan bahasa alami (NLP) untuk Chatbot, memungkinkan bot memahami konteks pertanyaan pengguna seputar visa dan memberikan jawaban yang relevan dari knowledge base Wepose. 2. Secure Document Flow: Membangun arsitektur unggah dokumen (upload architecture) yang menggunakan cloud storage terenkripsi. Dokumen hanya dapat diakses oleh pelanggan yang bersangkutan dan admin Wepose yang memiliki otorisasi. 3. Dynamic Content Management: Mengembangkan CMS headless atau arsitektur terdekopel di mana tim internal dapat dengan mudah menambah negara tujuan baru, mengkustomisasi form persyaratan visa, dan menyesuaikan harga secara mandiri.',
  'Proses development yg sangat cepat dan transparant sehingga kami dapat dengan mudah menyampaikan apa yang kami inginkan.',
  'IT Leader Wepose',
  '[{"type": "image", "url": "/images/wepose_web.png"}]'::jsonb
),
(
  'lppm-portal',
  'LPPM Portal Penelitian',
  'web',
  'Website & Web App',
  '/images/lppm_dashboard.png',
  '',
  'Portal manajemen pengajuan penelitian dan pengabdian masyarakat terintegrasi bagi institusi pendidikan tinggi.',
  'Universitas Berdikari',
  '2025',
  ARRAY['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
  'Pengajuan proposal dan laporan dana penelitian dilakukan manual lewat berkas cetak yang rentan hilang.',
  'Sistem informasi terintegrasi untuk pengumpulan, review reviewer eksternal, laporan kemajuan, dan statistik penyerapan dana.',
  'Memangkas birokrasi hingga 70%, 500+ proposal diproses secara simultan, dan transparansi dana hibah penelitian 100%.',
  '/demo/lppm-portal',
  '',
  'Pengelolaan kegiatan akademik di luar perkuliahan (penelitian dan pengabdian masyarakat) sering terhambat proses birokrasi manual. Berkas proposal riset berlembar-lembar harus ditandatangani basah, dinilai oleh reviewer secara manual lewat berkas kertas, dan laporan kemajuan sering terlambat diserahkan. Portal LPPM memfasilitasi keseluruhan siklus riset ini secara digital sehingga proses transfer dana hibah menjadi lebih akuntabel.',
  'Lembaga Penelitian dan Pengabdian Masyarakat (LPPM) adalah unit universitas yang mengelola hibah penelitian internal dan eksternal.',
  '70%', 'Pemangkasan Birokrasi', 'Alur kerja persetujuan proposal dari tingkat kaprodi, dekan, hingga LPPM kini sepenuhnya digital tanpa dokumen fisik.',
  '500+', 'Proposal Terproses', 'Sistem mampu menangani pengumpulan dan penugasan review proposal riset secara online untuk ratusan dosen peneliti secara serentak.',
  '100%', 'Transparansi Anggaran Riset', 'Dosen dan manajemen universitas dapat melacak secara tepat penyerapan anggaran dana hibah di setiap tahapan riset.',
  'Setiap tahun, dosen peneliti dihadapkan pada tumpukan berkas pengajuan manual. Reviewer kesulitan memberikan penilaian objektif secara terstruktur. LPPM juga kesulitan melacak progress luaran penelitian (seperti publikasi jurnal atau paten) karena tidak ada database terpadu.',
  'Mengembangkan portal dengan sistem multi-role (Dosen, Reviewer, Kaprodi, Admin LPPM) yang memfasilitasi pengunggahan proposal, lembar penilaian reviewer (scoring sheet), tracking logbook harian riset, hingga pengunggahan bukti luaran ilmiah secara mandiri.',
  'Portal LPPM ini memudahkan kami melacak luaran penelitian dosen secara real-time untuk kebutuhan akreditasi institusi.',
  'Ketua LPPM Universitas Berdikari',
  '[{"type": "image", "url": "/images/lppm_dashboard.png"}]'::jsonb
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
    receipt_url TEXT,
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

-- 7. Tabel Users (Kredensial Pengguna Admin dan Anggota/Members)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE, -- Nullable karena member mendaftar pakai nomor HP
    password_hash TEXT, -- Nullable karena member login via OTP
    phone_number TEXT UNIQUE, -- Nullable karena admin mendaftar pakai username
    name TEXT, -- Nama lengkap member/pengguna
    profile_picture TEXT, -- URL foto profil pengguna
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Masukkan user default awal (admin) jika belum ada
INSERT INTO users (username, password_hash, role)
VALUES ('admin', 'berdikariadmin', 'admin')
ON CONFLICT (username) DO NOTHING;

-- 8. Tabel OTP Codes (Penyimpanan OTP sementara untuk Verifikasi)
CREATE TABLE IF NOT EXISTS otp_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number TEXT NOT NULL,
    code TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Buat index untuk performa pencarian OTP berdasarkan nomor HP
CREATE INDEX IF NOT EXISTS idx_otp_codes_phone ON otp_codes(phone_number);
