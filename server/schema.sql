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
),
(
  'erp-aethera', 
  'Aethera Enterprise ERP', 
  'web', 
  'Website & Web App', 
  '/images/erp_dashboard.png', 
  '',
  'Dashboard ERP kustom untuk otomatisasi keuangan, SDM, dan rantai pasokan korporasi.',
  'PT Aethera Manufaktur',
  '2025',
  ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Chart.js'],
  'Mengintegrasikan data multi-cabang yang sebelumnya tersebar secara manual di Excel, menyebabkan keterlambatan sinkronisasi data keuangan hingga 4 hari.',
  'Menangani sinkronisasi data real-time kurang dari 2 detik dan visualisasi chart interaktif untuk pengambilan keputusan instan.',
  'Meningkatkan akurasi laporan keuangan hingga 99.8%, menghemat 120+ jam kerja administratif per bulan, dan mempercepat rekonsiliasi bulanan dari 4 hari menjadi 15 menit.',
  '/demo/erp-aethera',
  'https://aethera-demo.berdikari.co',
  'Dalam industri manufaktur skala menengah ke atas, sinkronisasi data antar cabang sangat krusial. Tanpa sistem yang terintegrasi, inventarisasi gudang, manajemen HRD, dan data penjualan mengalami lag yang berdampak buruk pada proses pengadaan bahan baku.',
  'PT Aethera Manufaktur adalah perusahaan perakitan suku cadang otomotif terkemuka dengan 3 cabang pabrik di Jawa Barat.',
  '2dtk', 'Sinkronisasi Data', 'Data operasional dari 3 cabang terintegrasi secara real-time di bawah 2 detik untuk menghindari duplikasi data.',
  '120+', 'Jam Kerja Dihemat', 'Otomatisasi proses input data rekonsiliasi inventaris dan penggajian karyawan memangkas lembur staf administrasi.',
  '15mnt', 'Rekonsiliasi Bulanan', 'Menyusun laporan bulanan konsolidasi kini selesai dalam hitungan menit dari sebelumnya membutuhkan waktu 4 hari kerja.',
  'Data inventori di gudang seringkali tidak sinkron dengan laporan penjualan, menyebabkan tim produksi memproduksi suku cadang yang stoknya masih melimpah sementara stok yang kritis justru kosong.',
  'Membangun modul Enterprise Resource Planning (ERP) berbasis web terintegrasi dengan modul Finance, Supply Chain, and HR. Dilengkapi dengan rest API berkinerja tinggi serta optimasi index database PostgreSQL.',
  'ERP ini membantu kami menyinkronkan rantai produksi kami secara efisien. Keterlambatan pengadaan material berkurang drastis.',
  'Direktur Operasional Aethera',
  '[{"type": "image", "url": "/images/erp_dashboard.png"}]'::jsonb
),
(
  'medplus-health', 
  'MedPlus Health Solution', 
  'mobile', 
  'Mobile Application', 
  '/images/medical_app.png', 
  '',
  'Aplikasi konsultasi dokter online, rekam medis digital, dan pemesanan obat langsung.',
  'Klinik MedPlus Utama',
  '2025',
  ARRAY['Flutter', 'Firebase', 'Node.js', 'Google Maps API'],
  'Pasien harus mengantre hingga 2 jam untuk konsultasi rutin dan kesulitan melacak riwayat resep obat secara digital.',
  'Mengembangkan aplikasi mobile Android & iOS dengan fitur telekonsultasi video terintegrasi, pemesanan obat berbasis lokasi, dan e-medical record terenkripsi.',
  'Mengurangi waktu tunggu pasien sebesar 82%, melayani 5.000+ telekonsultasi aktif di bulan pertama, dan meningkatkan retensi pasien klinik sebesar 45%.',
  '/demo/medplus-health',
  '',
  'Pelayanan kesehatan tradisional sering terhambat oleh antrean fisik yang padat dan resep obat kertas yang gampang hilang. Pasien membutuhkan alternatif layanan jarak jauh (telemedicine) yang andal dan mudah diakses langsung lewat ponsel pintar.',
  'Klinik MedPlus Utama merupakan jaringan klinik kesehatan keluarga dengan puluhan dokter spesialis berlisensi.',
  '82%', 'Pengurangan Waktu Tunggu', 'Daftar konsultasi via mobile memangkas waktu tunggu di ruang tunggu klinik secara dramatis.',
  '5.000+', 'Pasien Terlayani', 'Bulan pertama peluncuran mencatat ribuan telekonsultasi sukses melalui sambungan video terenkripsi.',
  '45%', 'Retensi Pasien', 'Pasien lebih setia kembali berobat berkat riwayat medis digital dan notifikasi resep otomatis di ponsel mereka.',
  'Kepadatan pasien di klinik fisik di jam-jam sibuk menimbulkan risiko penularan penyakit di ruang tunggu dan kelelahan staf medis.',
  'Mengembangkan aplikasi mobile Flutter dengan integrasi layanan video call WebRTC, database rekam medis terenkripsi berbasis Firebase, dan tracking pengiriman obat ojek online.',
  'Sistem telekonsultasi MedPlus membantu kami menjangkau pasien di daerah terpencil dengan sangat baik dan profesional.',
  'Kepala Klinik MedPlus',
  '[{"type": "image", "url": "/images/medical_app.png"}]'::jsonb
),
(
  'solaria-ecommerce', 
  'Solaria Premium E-Commerce', 
  'web', 
  'Website & Web App', 
  '/images/ecommerce_web.png', 
  '',
  'Platform belanja online dengan navigasi modern, checkout kilat, dan payment gateway.',
  'Solaria Retail Group',
  '2024',
  ARRAY['Next.js', 'TailwindCSS', 'Stripe', 'GraphQL', 'Shopify API'],
  'Tingkat drop-off (keranjang belanja ditinggalkan) mencapai 68% karena proses pengisian formulir checkout yang berbelit-belit.',
  'Mendesain ulang user flow website dan mengimplementasikan fitur checkout satu klik dengan integrasi payment gateway otomatis yang menurunkan tingkat drop-off menjadi 22%.',
  'Menurunkan tingkat keranjang belanja diabaikan sebesar 46%, meningkatkan rata-rata nilai transaksi (AOV) sebesar 18%, dan mendongkrak penjualan online sebesar 32%.',
  '/demo/solaria-ecommerce',
  'https://solaria-ecommerce.com',
  'Toko ritel fisik Solaria membutuhkan ekspansi digital berskala besar untuk menangkap pasar Gen-Z. Website lama mereka lambat dan memiliki alur belanja yang memusingkan bagi pengguna ponsel.',
  'Solaria Retail Group adalah brand pakaian gaya hidup kontemporer dengan 50+ gerai di pusat perbelanjaan.',
  '46%', 'Pengurangan Drop-off', 'Checkout ringkas menurunkan tingkat keranjang belanja yang terbengkalai secara drastis.',
  '18%', 'Kenaikan Nilai Transaksi', 'Fitur upsell otomatis berdasarkan rekomendasi produk AI di keranjang mendorong pembelian tambahan.',
  '32%', 'Kenaikan Penjualan Online', 'Kecepatan loading website berbasis server-side rendering Next.js melipatgandakan konversi pengunjung.',
  'Platform e-commerce lama sering lambat memproses gambar resolusi tinggi produk pakaian, berakibat pada tingginya bounce rate pengunjung di bawah 5 detik.',
  'Mendesain dan mendeploy web e-commerce Next.js headless menggunakan Shopify API untuk manajemen inventori serta Stripe untuk pembayaran internasional terenkripsi.',
  'Sistem e-commerce baru ini terasa sangat cepat di mobile. Konversi penjualan digital kami melonjak tajam.',
  'VP E-Commerce Solaria',
  '[{"type": "image", "url": "/images/ecommerce_web.png"}]'::jsonb
),
(
  'velo-wallet', 
  'Velo E-Wallet & Crypto', 
  'mobile', 
  'Mobile Application', 
  '/images/ewallet_app.png', 
  '',
  'Aplikasi dompet digital multifungsi untuk transfer, pembayaran biller, dan jual-beli crypto.',
  'Velo Finance Ltd.',
  '2025',
  ARRAY['React Native', 'Web3.js', 'NestJS', 'Redis', 'FaceID SDK'],
  'Memerlukan otentikasi transaksi super aman yang tetap terasa cepat dan tanpa lag di ponsel berspesifikasi rendah.',
  'Membuat aplikasi e-wallet ultra-ringan dengan otentikasi biometrik lokal yang diamankan enkripsi AES-256 dan sinkronisasi blockchain asinkron.',
  'Mencapai 200.000+ pengguna aktif bulanan dalam 90 hari pertama, dengan tingkat keberhasilan transaksi 99,99% dan rating 4.8 di Play Store.',
  '/demo/velo-wallet',
  '',
  'Aplikasi keuangan terdesentralisasi (Web3) seringkali dinilai terlalu rumit untuk pengguna awam. Penggabungan fitur dompet konvensional (fiat) dan mata uang kripto dalam satu UI yang sederhana adalah tantangan produk ini.',
  'Velo Finance Ltd. adalah startup fintech berlisensi yang fokus pada inklusi keuangan digital modern.',
  '200K+', 'Pengguna Aktif', 'Mendapatkan antusiasme tinggi berkat kemudahan transaksi crypto tanpa pemahaman teknis blockchain yang rumit.',
  '99,99%', 'Keberhasilan Transaksi', 'Optimasi caching backend Redis menjamin tidak ada transaksi ganda atau kegagalan transfer.',
  '4.8', 'Rating Play Store', 'Ulasan positif memuji kemudahan otentikasi sidik jari/FaceID dan kelancaran UI aplikasi.',
  'Waktu sinkronisasi data saldo blockchain seringkali lambat di jaringan internet seluler yang kurang stabil di daerah rural.',
  'Membangun aplikasi mobile cross-platform dengan React Native, modul enkripsi native biometrik FaceID/Keychain, serta microservices NestJS dengan message queue Redis.',
  'Velo berhasil menjembatani kebutuhan pembayaran harian dan manajemen aset digital dengan cara yang sangat simpel.',
  'CTO Velo Finance',
  '[{"type": "image", "url": "/images/ewallet_app.png"}]'::jsonb
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

-- 7. Tabel Users (Kredensial Pengguna Admin)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Masukkan user default awal
INSERT INTO users (username, password_hash, role)
VALUES ('admin', 'berdikariadmin', 'admin')
ON CONFLICT (username) DO NOTHING;
