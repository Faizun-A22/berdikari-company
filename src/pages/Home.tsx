import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Star,
  Sparkles,
  Zap,
  CheckCircle2,
  Calendar,
  Clock,
  Send,
  Heart,
  Quote,
  MessageSquare,
  Globe,
  Smartphone,
  Cpu,
  Palette,
  X,
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Home() {
  const [portfolioRef, portfolioVisible] = useScrollReveal();
  const [servicesRef, servicesVisible] = useScrollReveal();
  const [calcRef, calcVisible] = useScrollReveal();
  const [newsRef, newsVisible] = useScrollReveal();
  const [reviewsRef, reviewsVisible] = useScrollReveal();
  const [faqRef, faqVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  // Service-First Interactive Showcase state & Modal Popup
  type ServiceType = 'web' | 'erp' | 'mobile' | 'uiux';
  const [activeModalService, setActiveModalService] = useState<ServiceType | null>(null);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Testimonial slider state
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Interactive Calculator state
  const [calcType, setCalcType] = useState('web-starter');
  const [calcAddons, setCalcAddons] = useState<string[]>([]);

  // CTA inline form state
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  // Berdikari Services Collection (Kotak-Kotak Layanan)
  const servicesList = [
    {
      id: 'web' as ServiceType,
      num: '01',
      name: 'Website & E-Commerce',
      shortName: 'Website & Toko Online',
      tagline: 'Website Modern, Cepat & Terindeks Google',
      desc: 'Website bisnis ultra-responsif, toko online kilat dengan payment gateway Midtrans otomatis, dan arsitektur SEO mutakhir.',
      icon: <Globe size={24} />,
      badge: 'Paling Populer',
      badgeColor: '#e53e3e',
      highlights: 'Lighthouse 98+ • Konversi Naik 3x • Payment Midtrans Otomatis',
      bullets: [
        'Audit Google Lighthouse 98+ (Super Cepat)',
        'Integrasi Payment Gateway & WhatsApp Otomatis',
        'Desain Kustom Responsif Sesuai Identitas Brand',
      ],
    },
    {
      id: 'erp' as ServiceType,
      num: '02',
      name: 'Sistem Informasi & ERP',
      shortName: 'Sistem ERP & Database',
      tagline: 'Otomasi Operasional Bisnis Terintegrasi',
      desc: 'Sistem pergudangan multi-cabang, barcode inventaris, automasi presensi karyawan, dan dashboard keuangan real-time.',
      icon: <Cpu size={24} />,
      badge: 'Efisiensi Tinggi',
      badgeColor: '#0284c7',
      highlights: 'Hemat 15 Jam Kerja/Mgg • 99.9% Uptime Cloud • Multi-Cabang',
      bullets: [
        'Hemat 15 Jam Kerja Manual Staf Setiap Minggu',
        'Pencatatan Stok & Barcode Multi-Cabang Akurat',
        'Dashboard Keuangan & Laporan Otomatis Real-time',
      ],
    },
    {
      id: 'mobile' as ServiceType,
      num: '03',
      name: 'Mobile Apps Android & iOS',
      shortName: 'Aplikasi Mobile Apps',
      tagline: 'Aplikasi Native & Cross-Platform (Flutter)',
      desc: 'Aplikasi smartphone performa tinggi dengan autentikasi biometrik aman, transaksi QRIS instan, notifikasi push, dan mode offline.',
      icon: <Smartphone size={24} />,
      badge: 'Multiplatform',
      badgeColor: '#16a34a',
      highlights: '50k+ Active Users • QRIS 0.8 Detik • Notifikasi Realtime',
      bullets: [
        'Multiplatform Android & iOS dengan Flutter',
        'Autentikasi Biometrik Aman & QRIS Instan',
        'Push Notification & Caching Mode Offline',
      ],
    },
    {
      id: 'uiux' as ServiceType,
      num: '04',
      name: 'UI/UX Design & Prototype',
      shortName: 'Desain UI/UX & Riset',
      tagline: 'Desain Antarmuka Interaktif & Sistem Desain',
      desc: 'Wireframing mendalam, prototipe interaktif Figma standar perbankan, micro-interactions halus, dan pengujian kegunaan nyata.',
      icon: <Palette size={24} />,
      badge: 'Eksklusif Figma',
      badgeColor: '#9333ea',
      highlights: '80+ Komponen Figma • Standar WCAG AAA • SUS Skor 89/100',
      bullets: [
        '80+ Komponen Figma Desain Sistem Teruji',
        'Prototipe Interaktif Layaknya Aplikasi Asli',
        'Uji Kegunaan Pengguna (SUS Skor Tinggi)',
      ],
    },
  ];

  // Data Collections: Exactly 4 Top Projects Per Service (Strict 4 Cards Maximum)
  const allProjects = [
    // --- 01. WEBSITE & E-COMMERCE ---
    {
      id: 1,
      title: 'Bloom & Wild Flora E-Commerce',
      serviceType: 'web',
      category: 'E-Commerce',
      categoryLabel: 'E-Commerce Platform',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Platform toko online dengan sistem checkout kilat, integrasi payment gateway Midtrans otomatis, dan analitik real-time.',
      client: 'PT Bloom Flora Nusantara',
      tech: ['Next.js', 'PostgreSQL', 'Midtrans Gateway', 'Tailwind CSS'],
      metrics: 'Konversi Naik 310% • Lighthouse 98/100',
      slug: 'bloom-wild-flora',
    },
    {
      id: 2,
      title: 'Kriya Nusantara Craft Marketplace',
      serviceType: 'web',
      category: 'E-Commerce',
      categoryLabel: 'Marketplace Multi-Vendor',
      image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Marketplace produk kerajinan nusantara dengan integrasi ongkir kurir instan, payment gateway, dan dashboard toko multi-vendor.',
      client: 'PT Kriya Digital Nusantara',
      tech: ['React', 'Node.js', 'Redis', 'Tailwind CSS'],
      metrics: '12.000+ Transaksi • Rating 4.9★',
      slug: 'bloom-wild-flora',
    },
    {
      id: 3,
      title: 'Bimasena Energy Portal & Investor Relations',
      serviceType: 'web',
      category: 'Web Korporat',
      categoryLabel: 'Portal Korporat & ESG',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Portal profil resmi korporasi energi nasional dengan laporan tahunan interaktif, kepatuhan ESG, dan data saham real-time.',
      client: 'Bimasena Energy Group',
      tech: ['TypeScript', 'Next.js', 'Headless CMS', 'Tailwind'],
      metrics: 'Keamanan Grade A+ • Peringkat #1 SEO',
      slug: 'bloom-wild-flora',
    },
    {
      id: 4,
      title: 'Ruang Seduh Artisan Coffee Roastery Web',
      serviceType: 'web',
      category: 'Web & Order',
      categoryLabel: 'Pemesanan Kafe & Toko Online',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Website interaktif dengan pesanan meja mandiri (QR order), langganan biji kopi bulanan, dan integrasi WhatsApp CS instan.',
      client: 'Ruang Seduh Roastery',
      tech: ['Vite', 'React', 'WhatsApp API', 'Supabase'],
      metrics: 'Antrean Berkurang 45% • Rating 4.9★',
      slug: 'bloom-wild-flora',
    },

    // --- 02. SISTEM INFORMASI & ERP ---
    {
      id: 5,
      title: 'Northline Studio Cloud & Logistics ERP',
      serviceType: 'erp',
      category: 'Sistem ERP',
      categoryLabel: 'Sistem ERP Pergudangan',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Sistem ERP terpadu untuk pencatatan pergudangan multi-cabang, inventaris barcode otomatis, dan pelaporan keuangan konsolidasi.',
      client: 'Northline Creative Group',
      tech: ['React.js', 'Node.js', 'Docker', 'PostgreSQL'],
      metrics: 'Hemat 15 Jam Kerja/Mgg • 99.9% Uptime',
      slug: 'northline-studio-cloud',
    },
    {
      id: 6,
      title: 'Medika Farmasi Resep Digital & Rekam Medis',
      serviceType: 'erp',
      category: 'Sistem Web',
      categoryLabel: 'Portal Kesehatan Digital',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Sistem reservasi konsultasi dokter, manajemen resep digital farmasi, dan sinkronisasi data kesehatan SatuSehat Kemenkes.',
      client: 'Medika Hospital Network',
      tech: ['React', 'TypeScript', 'Supabase DB', 'SatuSehat API'],
      metrics: 'Antrean Turun 70% • Enkripsi Medis Teruji',
      slug: 'medika-farmasi-digital',
    },
    {
      id: 7,
      title: 'Karya Mandiri POS Kasir & Inventaris Multi-Cabang',
      serviceType: 'erp',
      category: 'Sistem Kasir',
      categoryLabel: 'Point of Sale & Multi-Branch',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Aplikasi kasir desktop & cloud dengan dukungan offline-first saat internet terputus, cetak struk termal, dan stok otomatis.',
      client: 'PT Karya Mandiri Sentosa',
      tech: ['Electron', 'React', 'SQLite Offline', 'Node.js'],
      metrics: 'Audit Stok Akurat 99.8% • Transaksi Kilat',
      slug: 'northline-studio-cloud',
    },
    {
      id: 8,
      title: 'Sinergi HRM Presensi & Otomasi Payroll Karyawan',
      serviceType: 'erp',
      category: 'Sistem HRM',
      categoryLabel: 'HRM & Otomasi Penggajian',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Platform manajemen 500+ karyawan dengan presensi GPS radius kantor, pengajuan cuti instan, dan perhitungan pajak PPh 21 otomatis.',
      client: 'Sinergi Corpora Indonesia',
      tech: ['Vue.js', 'Express.js', 'PostgreSQL', 'Redis'],
      metrics: 'Payroll Selesai 2 Jam • Tanpa Human Error',
      slug: 'northline-studio-cloud',
    },

    // --- 03. MOBILE APPS ANDROID & IOS ---
    {
      id: 9,
      title: 'Pure Balance Fintech & E-Wallet App',
      serviceType: 'mobile',
      category: 'Mobile App',
      categoryLabel: 'Fintech & E-Wallet',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Aplikasi mobile multiplatform (Android & iOS) dengan enkripsi data berlapis, login biometrik sidik jari/wajah, dan pembayaran QRIS.',
      client: 'PT Nusantara Pay Sejahtera',
      tech: ['Flutter', 'Firebase', 'WebSocket', 'QRIS API'],
      metrics: '50.000+ Pengguna • Transaksi 0.8 Detik',
      slug: 'pure-balance-fintech',
    },
    {
      id: 10,
      title: 'Sahabat Sehat Telemedicine & Konsultasi Dokter',
      serviceType: 'mobile',
      category: 'Mobile App',
      categoryLabel: 'Telemedisin & Reservasi',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Aplikasi konsultasi dokter video call HD terenkripsi, tebus resep obat langsung sampai ke rumah, dan riwayat lab digital.',
      client: 'Klinik Pratama Sahabat Sehat',
      tech: ['React Native', 'WebRTC', 'FastAPI', 'AWS'],
      metrics: 'Konsultasi 24/7 • Rating 4.8★ di Playstore',
      slug: 'pure-balance-fintech',
    },
    {
      id: 11,
      title: 'KurirKilat Driver Logistics & Live GPS Tracking',
      serviceType: 'mobile',
      category: 'Mobile App',
      categoryLabel: 'Logistik & Pelacakan GPS',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Aplikasi khusus driver armada pengiriman barang dengan rute cerdas hemat BBM, bukti serah terima foto + ttd, dan peta GPS realtime.',
      client: 'PT Kurir Kilat Express',
      tech: ['Flutter', 'Google Maps SDK', 'MQTT', 'Golang'],
      metrics: 'Ketepatan Waktu 99.4% • Hemat BBM 18%',
      slug: 'pure-balance-fintech',
    },
    {
      id: 12,
      title: 'BelajarPintar Edutech Interactive Learning App',
      serviceType: 'mobile',
      category: 'Mobile App',
      categoryLabel: 'Edutech & Gamifikasi',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Aplikasi pembelajaran interaktif dengan gamifikasi badge skor, video materi hemat kuota, dan forum diskusi tanya tutor.',
      client: 'Yayasan Cerdas Generasi Bangsa',
      tech: ['Flutter', 'Node.js', 'Supabase Realtime'],
      metrics: '10.000+ Murid Aktif • 98% Retensi Belajar',
      slug: 'pure-balance-fintech',
    },

    // --- 04. UI/UX DESIGN & PROTOTYPE ---
    {
      id: 13,
      title: 'Aura Brand Design System & Figma UI Kit',
      serviceType: 'uiux',
      category: 'UI/UX Design',
      categoryLabel: 'Design System & Token',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Design system menyeluruh dengan 80+ komponen Figma interaktif, dokumentasi token desain, dan prototipe responsif standar perbankan.',
      client: 'Aura Media Kreasi',
      tech: ['Figma Pro', 'Design Tokens', 'Storybook', 'WCAG AAA'],
      metrics: 'Dipakai 8 Tim Produk • Aksesibilitas Teruji',
      slug: 'northline-studio-cloud',
    },
    {
      id: 14,
      title: 'Horizon Banking Mobile App Redesign Concept',
      serviceType: 'uiux',
      category: 'UI/UX Design',
      categoryLabel: 'Studi Kasus Perbankan',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Redesain total antarmuka perbankan digital yang ramah segala usia, navigasi transfer 2 ketukan, dan visualisasi cash flow elegan.',
      client: 'Bank Horizon Digital',
      tech: ['Figma', 'Protopie Interactive', 'Usability Testing'],
      metrics: 'SUS Skor 89/100 (Sangat Mudah) • Clean UI',
      slug: 'northline-studio-cloud',
    },
    {
      id: 15,
      title: 'AgriConnect Marketplace Petani UI Case Study',
      serviceType: 'uiux',
      category: 'UI/UX Design',
      categoryLabel: 'Riset Desain Pasar Tani',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Riset dan perancangan antarmuka aplikasi jual beli hasil tani langsung dengan tipografi besar kontras tinggi dan ikon mudah dipahami.',
      client: 'AgriConnect Koperasi Tani',
      tech: ['Figma UI', 'User Journey Mapping', 'Design Sprint'],
      metrics: 'Uji Lapangan 100% Petani Paham Penggunaan',
      slug: 'northline-studio-cloud',
    },
    {
      id: 16,
      title: 'FlowState SaaS Analytics & Productivity Dashboard',
      serviceType: 'uiux',
      category: 'UI/UX Design',
      categoryLabel: 'Prototipe Dashboard SaaS',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'Prototipe dashboard analitik SaaS dengan dark/light theme otomatis, 24 widget data interaktif, dan animasi micro-interactions halus.',
      client: 'FlowState Technologies',
      tech: ['Figma', 'Design Systems', 'Micro-interactions'],
      metrics: '24 Widget Interaktif • Dark/Light Mode',
      slug: 'northline-studio-cloud',
    },
  ];

  // News / Insights (Simplified, High-Value, Non-media blog)
  const newsList = [
    {
      id: 'news-1',
      tag: 'RILIS SISTEM',
      date: '15 Sep 2026',
      readTime: '1 Menit Baca',
      title: 'Optimasi Infrastruktur Cloud Generasi Terbaru Berdikari',
      summary: 'Peningkatan arsitektur server terisolasi dengan auto-scaling dan sertifikasi SSL otomatis. Kecepatan memuat halaman melonjak 45%.',
      bullets: [
        'Skor Google Lighthouse audit stabil di kisaran 96-99 untuk seluruh portal klien.',
        'Proteksi DDoS dan firewall cerdas aktif 24 jam nonstop.',
        'Pencadangan data (backup) otomatis setiap 6 jam ke storage aman.',
      ],
      impact: 'Website klien lebih aman, hemat bandwith, dan selalu responsif diakses jutaan pengguna.',
    },
    {
      id: 'news-2',
      tag: 'AKSELERASI UMKM',
      date: '10 Sep 2026',
      readTime: '1 Menit Baca',
      title: 'Program Go-Digital Terjangkau untuk Bisnis Mandiri',
      summary: 'Paket web starter hemat dengan sistem pemeliharaan terkelola ringan tanpa beban biaya operasional tinggi bagi pelaku usaha lokal.',
      bullets: [
        'Investasi awal terjangkau mulai Rp 499rb untuk memiliki website resmi.',
        'Sudah termasuk domain gratis, hosting cloud, dan bantuan edit materi bulanan.',
        'Meningkatkan reputasi bisnis UMKM di hadapan calon pembeli dan investor.',
      ],
      impact: 'Ratusan UMKM telah memiliki etalase digital tanpa perlu keahlian teknis pemrograman.',
    },
    {
      id: 'news-3',
      tag: 'INOVASI AI',
      date: '02 Sep 2026',
      readTime: '1 Menit Baca',
      title: 'Asisten Chatbot WhatsApp Cerdas 24/7 Berbasis LLM',
      summary: 'Integrasi otomatisasi kecerdasan buatan yang mampu melayani tanya-jawab konsumen, mengecek stok, dan mendata prospek secara realtime.',
      bullets: [
        'Model dilatih khusus menggunakan dokumen SOP dan katalog produk internal perusahaan.',
        'Waktu tunggu respons pelanggan terpangkas dari hitungan jam menjadi 3 detik.',
        'Terhubung langsung ke Google Sheets dan dashboard CRM admin.',
      ],
      impact: 'Konversi penjualan meningkat karena pelanggan terlayani instan bahkan di luar jam kerja.',
    },
  ];

  // Testimonials (Kind Words)
  const testimonials = [
    {
      id: 1,
      quote: 'Berdikari benar-benar mentransformasi kehadiran digital kami. Website kami tidak hanya tampil memukau dan rapi, tetapi juga mendongkrak konversi pemesanan hingga 3x lipat dalam bulan pertama!',
      name: 'Jessica Larasati',
      role: 'Founder & CEO, Bloom & Wild Flora',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      stars: 5,
    },
    {
      id: 2,
      quote: 'Tim teknis yang sangat profesional, tepat waktu, dan mudah diajak diskusi. Dashboard sistem pergudangan yang dibangun Berdikari menghemat setidaknya 15 jam kerja manual staf kami setiap minggu.',
      name: 'Daniel Kurniadi',
      role: 'Direktur Operasional, Northline Studio Logistics',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      stars: 5,
    },
    {
      id: 3,
      quote: 'Sistem aplikasi resep obat digital kami berjalan sangat cepat dan tanpa kendala. Klien pasien kami sangat puas dengan kemudahan antarmukanya. Rekomendasi software house terbaik di Indonesia!',
      name: 'dr. Hendra Setiawan',
      role: 'Kepala Manajemen, Medika Digital Clinic',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      stars: 5,
    },
  ];

  // Pricing packages calculation
  const calcBasePrices: Record<string, { name: string; price: number; desc: string }> = {
    'web-starter': { name: 'Web Starter UMKM', price: 499000, desc: 'Website 1-3 Halaman Kilat & Responsif' },
    'web-pro': { name: 'Web Bisnis & Company Profile', price: 1500000, desc: 'Desain Kustom Hingga 7-10 Halaman' },
    'ecommerce': { name: 'Toko Online & E-Commerce', price: 2500000, desc: 'Katalog Produk & Pembayaran Digital' },
    'mobile-app': { name: 'Aplikasi Mobile (Android/iOS)', price: 3500000, desc: 'Flutter Single Codebase Teruji' },
    'ai-bot': { name: 'AI WhatsApp Chatbot & Otomasi', price: 3000000, desc: 'Asisten Cerdas 24 Jam Nonstop' },
  };

  const calcAddonList = [
    { id: 'gateway', name: 'Integrasi Payment Gateway', price: 350000 },
    { id: 'multilang', name: 'Dukungan Multi-Bahasa (ID/EN)', price: 250000 },
    { id: 'figma', name: 'Desain UI/UX Prototipe Figma', price: 450000 },
    { id: 'seo', name: 'Audit SEO & Google Search Console', price: 250000 },
    { id: 'sla', name: 'Dedicated Maintenance & SLA High', price: 300000 },
  ];

  const toggleAddon = (addonId: string) => {
    setCalcAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const currentBase = calcBasePrices[calcType] || calcBasePrices['web-starter'];
  const addonsTotal = calcAddons.reduce((acc, curr) => {
    const item = calcAddonList.find((a) => a.id === curr);
    return acc + (item ? item.price : 0);
  }, 0);
  const totalCalculated = currentBase.price + addonsTotal;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // FAQ items
  const faqList = [
    {
      q: 'Mengapa memilih Berdikari Digital Nusantara dibandingkan software house lain?',
      a: 'Berdikari menawarkan arsitektur modern berkecepatan tinggi (audit Lighthouse 95+), biaya transparan tanpa biaya siluman, garansi bebas bug 3 bulan penuh, serta pendampingan langsung oleh lead engineer berpengalaman.',
    },
    {
      q: 'Bagaimana alur pengerjaan dan berapa lama estimasi pembuatan sistem?',
      a: 'Alur kami transparan: 1) Konsultasi & Pengumpulan Kebutuhan, 2) Mockup Prototipe Desain Figma, 3) Koding Bersih Agile 2 mingguan, 4) Pengujian QA & Security, 5) Deployment ke Cloud Server. Website starter selesai dalam 3-5 hari kerja, proyek kustom memakan waktu 2-4 minggu.',
    },
    {
      q: 'Apakah saya mendapatkan akses penuh terhadap source code dan aset produk?',
      a: 'Tentu saja. Semua kode sumber (*source code*), aset desain, akses akun domain, dan server cloud diserahkan sepenuhnya kepada Anda tanpa ikatan lisensi tersembunyi.',
    },
    {
      q: 'Bagaimana jika website atau aplikasi mengalami kendala teknis setelah peluncuran?',
      a: 'Seluruh proyek di Berdikari dilindungi oleh garansi bug-free serta opsi pemeliharaan terkelola (*managed maintenance*) mulai Rp 50.000/bln untuk memantau keamanan server, pembaharuan versi, dan backup berkala 24/7.',
    },
  ];

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formContact) return;

    // Send to contact API
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formName,
        email: formContact.includes('@') ? formContact : '',
        phone: !formContact.includes('@') ? formContact : '',
        message: formMessage || 'Permintaan konsultasi dari formulir kilat halaman beranda.',
        service: 'Konsultasi Kilat Beranda',
      }),
    }).catch((err) => console.log('Notice: Submitting contact lead:', err));

    setFormSent(true);
  };

  return (
    <div className="home-container">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. TECH STACK & CLIENTS LOGO MARQUEE */}
      <div className="brand-marquee-strip">
        <div className="container">
          <p className="marquee-caption">DIPERCAYA &amp; DIDUKUNG OLEH TEKNOLOGI KELAS DUNIA</p>
          <div className="marquee-track-wrap">
            <div className="marquee-track">
              <span className="marquee-item">REACT.JS</span>
              <span className="marquee-item">NEXT.JS</span>
              <span className="marquee-item">FLUTTER</span>
              <span className="marquee-item">NODE.JS</span>
              <span className="marquee-item">PYTHON</span>
              <span className="marquee-item">AWS CLOUD</span>
              <span className="marquee-item">POSTGRESQL</span>
              <span className="marquee-item">OPENAI LLM</span>
              <span className="marquee-item">DOCKER</span>
              <span className="marquee-item">FIGMA DESIGN</span>
              {/* Duplicate for seamless infinite loop */}
              <span className="marquee-item">REACT.JS</span>
              <span className="marquee-item">NEXT.JS</span>
              <span className="marquee-item">FLUTTER</span>
              <span className="marquee-item">NODE.JS</span>
              <span className="marquee-item">PYTHON</span>
              <span className="marquee-item">AWS CLOUD</span>
              <span className="marquee-item">POSTGRESQL</span>
              <span className="marquee-item">OPENAI LLM</span>
              <span className="marquee-item">DOCKER</span>
              <span className="marquee-item">FIGMA DESIGN</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. KOTAK-KOTAK LAYANAN & MODAL PORTOFOLIO INTERAKTIF (Pinterest Inspired) */}
      <section
        id="portfolio"
        ref={portfolioRef as React.RefObject<HTMLDivElement>}
        className={`section featured-work-section reveal reveal-fade ${portfolioVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          {/* Section Header */}
          <div className="service-showcase-header">
            <div className="showcase-badge-wrap">
              <span className="badge-tag-pill">
                <Sparkles size={13} className="text-red inline-icon" />
                LAYANAN &amp; PORTOFOLIO UNGGULAN
              </span>
            </div>
            <h2 className="section-heading-bold">
              Layanan Utama &amp; <span className="hero-cursive-highlight">Karya Nyata</span>
            </h2>
            <p className="section-subtext">
              Pilih dan klik salah satu kotak layanan di bawah ini. Modal interaktif akan terbuka menampilkan ringkasan portofolio mini dan studi kasus terbaik di setiap bidang.
            </p>
          </div>

          {/* KOTAK-KOTAK LAYANAN (4 Grid Boxes) */}
          <div className="service-boxes-grid">
            {servicesList.map((service) => (
              <div
                key={service.id}
                className="service-box-card"
                onClick={() => setActiveModalService(service.id)}
                role="button"
                tabIndex={0}
                aria-label={`Buka portofolio layanan ${service.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveModalService(service.id);
                  }
                }}
              >
                {/* Top Number & Tag */}
                <div className="box-top-row">
                  <span className="box-num-badge">{service.num}</span>
                  <span className="box-badge-tag" style={{ color: service.badgeColor }}>
                    {service.badge}
                  </span>
                </div>

                {/* Icon Bubble */}
                <div className="box-icon-wrap">
                  {service.icon}
                </div>

                {/* Title & Tagline */}
                <h3 className="box-title">{service.name}</h3>
                <p className="box-tagline">{service.tagline}</p>
                <p className="box-desc">{service.desc}</p>

                {/* Bullets */}
                <ul className="box-bullets">
                  {service.bullets.map((b, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={13} className="text-red flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Box Footer Button */}
                <div className="box-action-footer">
                  <span className="box-action-text">Lihat Portofolio</span>
                  <div className="box-action-arrow">
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM REDIRECT TO FULL PORTFOLIO */}
          <div className="service-boxes-bottom">
            <a href="/portfolio.html" className="btn-showcase-primary">
              <span>Buka Seluruh Portofolio &amp; Katalog Lengkap</span>
              <div className="btn-circle-icon">
                <ArrowRight size={15} />
              </div>
            </a>
            <p className="boxes-bottom-sub">
              ✓ Garansi Pemeliharaan Sistem • ✓ 100% Hak Milik Source Code • ✓ Audit Google Lighthouse 95+
            </p>
          </div>
        </div>

        {/* MODAL OVERLAY (Smooth Popup with Mini-Portfolio Cards) */}
        {activeModalService && (() => {
          const currentService = servicesList.find((s) => s.id === activeModalService) || servicesList[0];
          const modalProjects = allProjects.filter((p) => p.serviceType === activeModalService).slice(0, 4);

          return (
            <div
              className="service-modal-backdrop"
              onClick={() => setActiveModalService(null)}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="service-modal-dialog"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="modal-header">
                  <div className="modal-header-info">
                    <div className="modal-icon-bubble">
                      {currentService.icon}
                    </div>
                    <div>
                      <div className="modal-badge-row">
                        <span className="modal-num-tag">{currentService.num}</span>
                        <span className="modal-category-tag">{currentService.name}</span>
                        <span className="modal-count-pill">4 Portofolio Terpilih</span>
                      </div>
                      <h3 className="modal-title">{currentService.tagline}</h3>
                      <p className="modal-subtitle">
                        Klik kartu portofolio kecil di bawah untuk diarahkan ke halaman portofolio kami:
                      </p>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={() => setActiveModalService(null)}
                    aria-label="Tutup Modal"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Body: 4 Mini Portfolio Cards */}
                <div className="modal-body">
                  <div className="mini-cards-grid">
                    {modalProjects.map((item, index) => (
                      <div
                        key={item.id}
                        className="mini-portfolio-card"
                        style={{ animationDelay: `${index * 60}ms` }}
                        onClick={() => {
                          // Mengarahkan ke navigasi portfolio sesuai instruksi!
                          window.location.href = '/portfolio.html';
                        }}
                        title={`Buka ${item.title} di halaman portofolio`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            window.location.href = '/portfolio.html';
                          }
                        }}
                      >
                        {/* Thumbnail Image */}
                        <div className="mini-card-thumb-wrap">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="mini-card-img"
                            loading="lazy"
                          />
                          <span className="mini-card-category-badge">{item.categoryLabel}</span>
                        </div>

                        {/* Content */}
                        <div className="mini-card-info">
                          <div className="mini-card-metric-pill">
                            <Zap size={11} className="text-red" />
                            <span>{item.metrics}</span>
                          </div>

                          <h4 className="mini-card-title">{item.title}</h4>
                          <p className="mini-card-desc">{item.shortDesc}</p>

                          <div className="mini-card-bottom-row">
                            <span className="mini-card-client">{item.client}</span>
                            <span className="mini-card-link-prompt">
                              <span>Buka di Portofolio</span>
                              <ArrowRight size={13} />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                  <div className="modal-footer-actions">
                    <a href="/portfolio.html" className="btn-modal-primary">
                      <span>Buka Halaman Navigasi Portofolio Lengkap</span>
                      <ArrowRight size={15} />
                    </a>

                    <a
                      href={`https://wa.me/6281234567890?text=Halo%20Berdikari%20Tech,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(currentService.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-modal-secondary"
                    >
                      <MessageSquare size={15} className="text-red" />
                      <span>Konsultasikan Kebutuhan Anda</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 4. SERVICES & PACKAGES (Styled like reference image) */}
      <section
        id="pricing"
        ref={servicesRef as React.RefObject<HTMLDivElement>}
        className={`section services-packages-section reveal reveal-fade ${servicesVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="packages-header-wrap">
            <div className="packages-header-left">
              <span className="badge-tag-pill">PAKET &amp; INVESTASI</span>
              <h2 className="section-heading-bold">
                Paket Sederhana. <br />
                <span className="hero-cursive-highlight">Dampak Maksimal.</span>
              </h2>
              <p className="packages-subtext">
                Investasi rasional, transparan tanpa biaya tersembunyi. Solusi tepat untuk setiap tahap pertumbuhan bisnis Anda.
              </p>
              <div style={{ marginTop: '16px', marginBottom: '20px' }}>
                <a href="/services.html" className="btn-pill-subtle">
                  <span>Lihat Seluruh Layanan &amp; Fitur</span>
                  <ArrowRight size={15} />
                </a>
              </div>
              <div className="packages-doodle-arrow">
                <svg width="45" height="32" viewBox="0 0 50 35" fill="none">
                  <path
                    d="M5 10C25 5 35 25 42 28M42 28L34 26M42 28L40 18"
                    stroke="#e53e3e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="doodle-packages-text">Pilih paket sesuai skala kebutuhan Anda!</span>
              </div>
            </div>

            {/* 3 Packages Cards */}
            <div className="packages-cards-row">
              {/* Card 1: Starter */}
              <div className="package-card">
                <div className="package-header">
                  <div className="package-badge-row">
                    <span className="package-tag-sub">STARTER</span>
                    <div className="package-icon-wrap">
                      <Send size={16} className="text-red" />
                    </div>
                  </div>
                  <div className="package-price">
                    <span className="price-val">Rp 499rb</span>
                    <span className="price-period">+ Maint. Rp 50rb/bln</span>
                  </div>
                  <p className="package-aim">Sangat cocok untuk UMKM, promosi awal, &amp; profil usaha online.</p>
                </div>

                <div className="package-body">
                  <ul className="package-features">
                    <li><CheckCircle2 size={15} className="text-red" /> Website 1-3 Halaman Responsif</li>
                    <li><CheckCircle2 size={15} className="text-red" /> Kecepatan Audit Lighthouse 90+</li>
                    <li><CheckCircle2 size={15} className="text-red" /> Gratis Cloud Hosting &amp; SSL Terkelola</li>
                    <li><CheckCircle2 size={15} className="text-red" /> Formulir Kontak &amp; Integrasi WhatsApp</li>
                    <li><CheckCircle2 size={15} className="text-red" /> Gratis Update Konten Ringan Bulanan</li>
                  </ul>
                </div>

                <div className="package-footer">
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Berdikari%20Digital,%20saya%20tertarik%20dengan%20Paket%20Starter%20Rp%20499rb."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-package-action"
                  >
                    Pilih Paket Starter
                  </a>
                </div>
              </div>

              {/* Card 2: Growth (Highlighted / Most Popular) */}
              <div className="package-card package-card-popular">
                <div className="popular-top-ribbon">
                  <Star size={13} fill="#ffffff" color="#ffffff" />
                  <span>PALING POPULER</span>
                </div>

                <div className="package-header">
                  <div className="package-badge-row">
                    <span className="package-tag-sub">GROWTH PRO</span>
                    <div className="package-icon-wrap popular-icon-wrap">
                      <Sparkles size={16} />
                    </div>
                  </div>
                  <div className="package-price">
                    <span className="price-val text-red">Rp 1.5jt</span>
                    <span className="price-period">Website Bisnis Lengkap</span>
                  </div>
                  <p className="package-aim">Pilihan utama perusahaan berkembang, katalog, &amp; e-commerce.</p>
                </div>

                <div className="package-body">
                  <ul className="package-features">
                    <li><CheckCircle2 size={15} className="text-red" /> Hingga 7-10 Halaman Desain Kustom</li>
                    <li><CheckCircle2 size={15} className="text-red" /> Audit Lighthouse 95+ (Super Kencang)</li>
                    <li><CheckCircle2 size={15} className="text-red" /> CMS Manajemen Konten Mandiri</li>
                    <li><CheckCircle2 size={15} className="text-red" /> Gratis Domain (.com/.id) &amp; SSL 1 Tahun</li>
                    <li><CheckCircle2 size={15} className="text-red" /> Integrasi Order WhatsApp &amp; Analitik</li>
                    <li><CheckCircle2 size={15} className="text-red" /> 30 Hari Garansi Bug-Free &amp; Pendampingan</li>
                  </ul>
                </div>

                <div className="package-footer">
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Berdikari%20Digital,%20saya%20tertarik%20dengan%20Paket%20Growth%20Rp%201.5jt."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-package-action btn-package-popular"
                  >
                    Pilih Paket Growth
                  </a>
                </div>
              </div>

              {/* Card 3: Premium / Enterprise */}
              <div className="package-card">
                <div className="package-header">
                  <div className="package-badge-row">
                    <span className="package-tag-sub">ENTERPRISE</span>
                    <div className="package-icon-wrap">
                      <Zap size={16} className="text-red" />
                    </div>
                  </div>
                  <div className="package-price">
                    <span className="price-val">Rp 3.5jt+</span>
                    <span className="price-period">Aplikasi &amp; Sistem Khusus</span>
                  </div>
                  <p className="package-aim">Untuk startup, instansi, &amp; aplikasi mobile skala besar.</p>
                </div>

                <div className="package-body">
                  <ul className="package-features">
                    <li><CheckCircle2 size={15} className="text-red" /> Aplikasi Mobile Android &amp; iOS (Flutter)</li>
                    <li><CheckCircle2 size={15} className="text-red" /> Integrasi AI Chatbot / Otomasi n8n</li>
                    <li><CheckCircle2 size={15} className="text-red" /> Dashboard Analisis Data &amp; Multi-Role</li>
                    <li><CheckCircle2 size={15} className="text-red" /> Server Cloud Terisolasi &amp; Enkripsi</li>
                    <li><CheckCircle2 size={15} className="text-red" /> Dedicated Lead Engineer &amp; SLA 24/7</li>
                  </ul>
                </div>

                <div className="package-footer">
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Berdikari%20Digital,%20saya%20ingin%20konsultasi%20Paket%20Enterprise/Mobile%20App."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-package-action"
                  >
                    Konsultasi Enterprise
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE COST CALCULATOR (Kreatif & Sangat Bermanfaat) */}
      <section
        ref={calcRef as React.RefObject<HTMLDivElement>}
        className={`section calc-interactive-section reveal reveal-fade ${calcVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="calc-card-container">
            <div className="calc-info-col">
              <span className="badge-tag-pill">SIMULATOR BIAYA INTERAKTIF</span>
              <h3 className="calc-heading">Hitung Estimasi Anggaran Proyek Anda Secara Instan</h3>
              <p className="calc-desc">
                Transparansi adalah janji kami. Pilih jenis sistem yang Anda butuhkan dan fitur pendukung untuk mendapatkan perkiraan investasi awal tanpa komitmen.
              </p>
              <div className="calc-highlight-box">
                <div className="calc-highlight-item">
                  <ShieldCheck size={20} className="text-red" />
                  <div>
                    <strong>Bebas Biaya Siluman</strong>
                    <span>Rincian transparan sejak hari pertama diskusi.</span>
                  </div>
                </div>
                <div className="calc-highlight-item">
                  <Sparkles size={20} className="text-red" />
                  <div>
                    <strong>Konsultasi Arsitektur Gratis</strong>
                    <span>Dapatkan arahan teknologi dari tech lead Berdikari.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Widget Box */}
            <div className="calc-widget-col">
              <div className="calc-widget-card">
                <div className="calc-step-section">
                  <label className="calc-step-label">1. Pilih Jenis Produk Utama:</label>
                  <div className="calc-options-grid">
                    {Object.entries(calcBasePrices).map(([key, item]) => (
                      <button
                        key={key}
                        type="button"
                        className={`calc-option-btn ${calcType === key ? 'active' : ''}`}
                        onClick={() => setCalcType(key)}
                      >
                        <span className="option-name">{item.name}</span>
                        <span className="option-price">{formatRupiah(item.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="calc-step-section">
                  <label className="calc-step-label">2. Pilih Fitur Tambahan (Opsional):</label>
                  <div className="calc-addons-grid">
                    {calcAddonList.map((addon) => {
                      const isChecked = calcAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          className={`calc-addon-pill ${isChecked ? 'active' : ''}`}
                          onClick={() => toggleAddon(addon.id)}
                        >
                          <div className={`addon-checkbox ${isChecked ? 'checked' : ''}`}>
                            {isChecked && <CheckCircle2 size={14} className="text-white" />}
                          </div>
                          <span className="addon-title">{addon.name}</span>
                          <span className="addon-cost">+{formatRupiah(addon.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Total Estimate Calculation */}
                <div className="calc-result-box">
                  <div className="result-text-wrap">
                    <span className="result-label">Perkiraan Investasi:</span>
                    <strong className="result-number text-red">{formatRupiah(totalCalculated)}</strong>
                    <span className="result-sub">*Estimasi awal dapat disesuaikan kembali sesuai kompleksitas.</span>
                  </div>

                  <a
                    href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                      `Halo Berdikari Digital, saya sudah mencoba simulator biaya di website:\n- Tipe Produk: ${currentBase.name}\n- Total Estimasi: ${formatRupiah(
                        totalCalculated
                      )}\nSaya ingin mendiskusikan detail proyek ini.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-calc-wa"
                  >
                    <span>Konsultasikan Estimasi Ini</span>
                    <MessageSquare size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. KABAR & WAWASAN SINGKAT (Sederhana & Menginformasi, Bukan Artikel Berita Media) */}
      <section
        id="news"
        ref={newsRef as React.RefObject<HTMLDivElement>}
        className={`section clean-news-section reveal reveal-fade ${newsVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="split-header-row">
            <div className="split-header-left">
              <span className="badge-tag-pill">INFORMASI &amp; WAWASAN</span>
              <h2 className="section-heading-bold">Kabar &amp; Update Rekayasa</h2>
              <p className="section-subtext">
                Ringkas, informatif, dan langsung pada inti manfaat bagi mitra bisnis kami — tanpa artikel panjang yang berbelit-belit.
              </p>
            </div>
            <div className="split-header-right">
              <a href="/news.html" className="btn-pill-subtle">
                <span>Lihat Arsip Lengkap</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          <div className="clean-news-grid">
            {newsList.map((news) => (
              <div
                key={news.id}
                className="clean-news-card"
                onClick={() => {
                  window.location.href = '/news.html';
                }}
              >
                <div className="news-meta-top">
                  <span className="news-tag-badge">{news.tag}</span>
                  <div className="news-meta-right">
                    <Calendar size={13} className="text-red" />
                    <span>{news.date}</span>
                    <span className="meta-sep">•</span>
                    <Clock size={13} className="text-red" />
                    <span>{news.readTime}</span>
                  </div>
                </div>

                <h3 className="news-card-title">{news.title}</h3>
                <p className="news-card-summary">{news.summary}</p>

                <div className="news-card-bottom">
                  <a href="/news.html" className="btn-read-summary" onClick={(e) => e.stopPropagation()}>
                    <span>Buka Halaman Berita</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. KIND WORDS / TESTIMONIALS (Styled like reference image) */}
      <section
        ref={reviewsRef as React.RefObject<HTMLDivElement>}
        className={`section testimonials-section reveal reveal-fade ${reviewsVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="split-testimonials-row">
            {/* Left Column: Heading & Reviews Link */}
            <div className="testimonials-left-col">
              <span className="badge-tag-pill">KATA MEREKA</span>
              <h2 className="section-heading-bold">
                Klien Puas, <br />
                <span className="hero-cursive-highlight">Hasil Nyata. 💛</span>
              </h2>
              <p className="testimonials-subtext">
                Dedikasi kami adalah kepuasan mitra. Inilah pengalaman nyata dari para pendiri usaha yang mempercayakan transformasi teknologinya bersama Berdikari.
              </p>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Berdikari%20Digital,%20saya%20ingin%20konsultasi%20proyek%20saya."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-subtle"
              >
                <span>Mulai Kolaborasi Bersama Kami</span>
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Right Column: Testimonial Cards & Slider Controls */}
            <div className="testimonials-right-col">
              <div className="testimonials-cards-wrap">
                {testimonials.slice(testimonialIndex, testimonialIndex + 2).map((item) => (
                  <div key={item.id} className="testimonial-card">
                    <div className="quote-icon-wrap">
                      <Quote size={28} className="text-red" />
                    </div>
                    <p className="testimonial-quote">"{item.quote}"</p>
                    <div className="testimonial-client-row">
                      <img src={item.avatar} alt={item.name} className="client-avatar-img" />
                      <div className="client-info-group">
                        <strong className="client-name">{item.name}</strong>
                        <span className="client-role">{item.role}</span>
                        <div className="client-stars">
                          {[...Array(item.stars)].map((_, sIdx) => (
                            <Star key={sIdx} size={12} fill="#e53e3e" color="#e53e3e" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Toggle Controls */}
              <div className="testimonials-nav-row">
                <button
                  type="button"
                  className="testimonial-nav-btn"
                  onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 2 : 0))}
                  aria-label="Previous Testimonial"
                >
                  <ArrowLeft size={16} />
                </button>
                <div className="testimonial-dots">
                  <span className={`dot-indicator ${testimonialIndex === 0 ? 'active' : ''}`}></span>
                  <span className={`dot-indicator ${testimonialIndex !== 0 ? 'active' : ''}`}></span>
                </div>
                <button
                  type="button"
                  className="testimonial-nav-btn"
                  onClick={() => setTestimonialIndex((prev) => (prev === 0 ? 1 : 0))}
                  aria-label="Next Testimonial"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE CONSULTATION CTA BANNER (Curved Red Banner like reference) */}
      <section
        ref={ctaRef as React.RefObject<HTMLDivElement>}
        className={`section consultation-banner-section reveal reveal-scale-in ${ctaVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="consultation-curved-banner">
            {/* Left Envelope & Sticky Note Graphic */}
            <div className="banner-graphic-col">
              <div className="sticky-envelope-card">
                <div className="envelope-back">
                  <div className="sticky-yellow-note">
                    <span className="note-cursive-text">Ayo buat sesuatu yang luar biasa!</span>
                    <Heart size={16} className="note-heart-icon" fill="#e53e3e" color="#e53e3e" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text & Inline Form */}
            <div className="banner-form-col">
              <h2 className="banner-title">Punya Ide Proyek Digital?</h2>
              <p className="banner-subtitle">
                Ceritakan rencana website atau sistem Anda. Tim ahli kami akan membalas dengan estimasi biaya dan rancangan arsitektur terbaik secara cuma-cuma!
              </p>

              {formSent ? (
                <div className="banner-success-box">
                  <CheckCircle2 size={32} className="text-white" />
                  <div>
                    <h4>Terima Kasih, Pesan Terkirim!</h4>
                    <p>Tim Berdikari akan segera menghubungi Anda melalui kontak yang dicantumkan.</p>
                  </div>
                  <a
                    href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                      `Halo Berdikari Digital, saya ${formName}. Saya baru saja mengirimkan formulir konsultasi kilat.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-banner-direct-wa"
                  >
                    <span>Lanjutkan via WhatsApp</span>
                    <MessageSquare size={16} />
                  </a>
                </div>
              ) : (
                <form className="banner-inline-form" onSubmit={handleCtaSubmit}>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap Anda"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="banner-input"
                  />
                  <input
                    type="text"
                    required
                    placeholder="WhatsApp atau Email"
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    className="banner-input"
                  />
                  <input
                    type="text"
                    placeholder="Kebutuhan Sistem / Ide Proyek"
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="banner-input input-wide"
                  />
                  <button type="submit" className="btn-banner-submit">
                    <span>Kirim Pesan</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION (Pertanyaan Umum) */}
      <section
        ref={faqRef as React.RefObject<HTMLDivElement>}
        className={`section faq-section reveal reveal-fade ${faqVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="faq-header-wrap">
            <span className="badge-tag-pill">PERTANYAAN UMUM</span>
            <h2 className="section-heading-bold">Jawaban Pertanyaan Anda</h2>
            <p className="section-subtext">Semua informasi penting seputar kolaborasi, keamanan, dan kepemilikan aset sistem Anda.</p>
          </div>

          <div className="faq-accordion-list">
            {faqList.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item-card ${isOpen ? 'is-active' : ''}`}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                >
                  <div className="faq-question-bar">
                    <h4 className="faq-q-text">{item.q}</h4>
                    <div className="faq-icon-arrow">
                      {isOpen ? <ChevronUp size={20} className="text-red" /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                  {isOpen && (
                    <div className="faq-answer-bar">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      <style>{`
        /* ===== Section Common Styles ===== */
        .section-heading-bold {
          font-family: var(--font-heading);
          font-size: 2.6rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin: 10px 0 16px 0;
        }

        .badge-tag-pill {
          display: inline-block;
          font-size: 0.76rem;
          font-weight: 800;
          color: var(--primary);
          background: #fff1f2;
          border: 1px solid #fecdd3;
          padding: 4px 14px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .section-subtext {
          font-size: 1rem;
          color: #64748b;
          line-height: 1.65;
          max-width: 580px;
        }

        .btn-pill-subtle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.925rem;
          color: var(--primary);
          text-decoration: none;
          background: #fff5f5;
          border: 1px solid rgba(229, 62, 62, 0.2);
          padding: 10px 22px;
          border-radius: 100px;
          transition: all 0.25s ease;
        }

        .btn-pill-subtle:hover {
          background: var(--primary);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(229, 62, 62, 0.25);
        }

        /* ===== 2. Brand Marquee Strip ===== */
        .brand-marquee-strip {
          background: #ffffff;
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
          padding: 24px 0;
          overflow: hidden;
          text-align: center;
        }

        .marquee-caption {
          font-size: 0.72rem;
          font-weight: 800;
          color: #94a3b8;
          letter-spacing: 0.12em;
          margin-bottom: 16px;
        }

        .marquee-track-wrap {
          display: flex;
          overflow: hidden;
          position: relative;
        }

        .marquee-track {
          display: flex;
          gap: 48px;
          white-space: nowrap;
          animation: marqueeScroll 25s linear infinite;
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-item {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.05em;
          display: inline-flex;
          align-items: center;
        }

        .marquee-item::after {
          content: '•';
          color: var(--primary);
          margin-left: 48px;
        }

        /* ===== 3. Service-First Interactive Portfolio Showcase ===== */
        .featured-work-section {
          background: #ffffff;
          padding: 85px 0 95px 0;
          position: relative;
        }

        .service-showcase-header {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 40px auto;
        }

        .showcase-badge-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }

        .service-showcase-header .section-subtext {
          margin: 0 auto;
        }

        /* ===== KOTAK-KOTAK LAYANAN (4 Grid Boxes) ===== */
        .service-boxes-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        @media (max-width: 1200px) {
          .service-boxes-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 640px) {
          .service-boxes-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .service-box-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 24px;
          padding: 26px 22px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.03);
          position: relative;
          user-select: none;
          text-align: left;
        }

        .service-box-card:hover {
          transform: translateY(-8px);
          border-color: rgba(229, 62, 62, 0.5);
          box-shadow: 0 18px 40px rgba(229, 62, 62, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .box-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .box-num-badge {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 900;
          color: #94a3b8;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 6px;
          transition: all 0.25s ease;
        }

        .service-box-card:hover .box-num-badge {
          background: #fff1f2;
          color: var(--primary);
        }

        .box-badge-tag {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: rgba(15, 23, 42, 0.04);
          padding: 3px 9px;
          border-radius: 100px;
        }

        .box-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 16px;
          background: #fff1f2;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-box-card:hover .box-icon-wrap {
          background: var(--primary);
          color: #ffffff;
          transform: scale(1.08) rotate(-4deg);
          box-shadow: 0 6px 18px rgba(229, 62, 62, 0.35);
        }

        .box-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 4px;
          line-height: 1.3;
          transition: color 0.25s ease;
        }

        .service-box-card:hover .box-title {
          color: var(--primary);
        }

        .box-tagline {
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 10px;
        }

        .box-desc {
          font-size: 0.82rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .box-bullets {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
          border-top: 1px dashed #e2e8f0;
          padding-top: 14px;
        }

        .box-bullets li {
          font-size: 0.76rem;
          color: #475569;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .box-action-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
        }

        .box-action-text {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 800;
          color: #334155;
          transition: color 0.25s ease;
        }

        .service-box-card:hover .box-action-text {
          color: var(--primary);
        }

        .box-action-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .service-box-card:hover .box-action-arrow {
          background: var(--primary);
          border-color: var(--primary);
          color: #ffffff;
          transform: translateX(4px);
        }

        /* Bottom Section Button */
        .service-boxes-bottom {
          text-align: center;
          margin-top: 10px;
        }

        .boxes-bottom-sub {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 600;
          margin-top: 12px;
        }

        /* ===== MODAL OVERLAY & POPUP (Pinterest Inspired) ===== */
        .service-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .service-modal-dialog {
          background: #ffffff;
          border-radius: 28px;
          width: 100%;
          max-width: 860px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(229, 62, 62, 0.15);
          display: flex;
          flex-direction: column;
          animation: modalPopIn 0.38s cubic-bezier(0.16, 1, 0.3, 1) both;
          text-align: left;
        }

        @keyframes modalPopIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(24px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Modal Header */
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 24px 28px 20px 28px;
          border-bottom: 1px solid #f1f5f9;
          background: linear-gradient(180deg, #fffafa 0%, #ffffff 100%);
          gap: 16px;
        }

        .modal-header-info {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .modal-icon-bubble {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: #fff1f2;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(229, 62, 62, 0.2);
        }

        .modal-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }

        .modal-num-tag {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          background: #fff1f2;
          color: var(--primary);
          padding: 2px 7px;
          border-radius: 5px;
        }

        .modal-category-tag {
          font-size: 0.8rem;
          font-weight: 800;
          color: #0f172a;
        }

        .modal-count-pill {
          font-size: 0.68rem;
          font-weight: 700;
          color: #0284c7;
          background: #f0f9ff;
          padding: 2px 8px;
          border-radius: 100px;
        }

        .modal-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .modal-subtitle {
          font-size: 0.84rem;
          color: #64748b;
          margin: 0;
          line-height: 1.45;
        }

        .modal-close-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-close-btn:hover {
          background: #fee2e2;
          color: var(--primary);
          border-color: #fca5a5;
          transform: rotate(90deg);
        }

        /* Modal Body: Mini Portfolio Cards */
        .modal-body {
          padding: 24px 28px;
          flex-grow: 1;
        }

        .mini-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 768px) {
          .mini-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .mini-portfolio-card {
          display: flex;
          gap: 14px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          padding: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: miniCardSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
          text-align: left;
        }

        @keyframes miniCardSlideUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mini-portfolio-card:hover {
          background: #ffffff;
          border-color: rgba(229, 62, 62, 0.45);
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(229, 62, 62, 0.12), 0 2px 6px rgba(0, 0, 0, 0.02);
        }

        .mini-card-thumb-wrap {
          width: 95px;
          height: 95px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          background: #e2e8f0;
          flex-shrink: 0;
        }

        .mini-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .mini-portfolio-card:hover .mini-card-img {
          transform: scale(1.08);
        }

        .mini-card-category-badge {
          position: absolute;
          bottom: 4px;
          left: 4px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.58rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .mini-card-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          min-width: 0;
        }

        .mini-card-metric-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #fff1f2;
          color: #b91c1c;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
          margin-bottom: 6px;
          align-self: flex-start;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .mini-card-title {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s ease;
        }

        .mini-portfolio-card:hover .mini-card-title {
          color: var(--primary);
        }

        .mini-card-desc {
          font-size: 0.74rem;
          color: #64748b;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0 0 8px 0;
          flex-grow: 1;
        }

        .mini-card-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.7rem;
          padding-top: 6px;
          border-top: 1px dashed #e2e8f0;
        }

        .mini-card-client {
          color: #94a3b8;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 110px;
        }

        .mini-card-link-prompt {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 800;
          color: var(--primary);
          transition: gap 0.2s ease;
        }

        .mini-portfolio-card:hover .mini-card-link-prompt {
          gap: 7px;
        }

        /* Modal Footer */
        .modal-footer {
          padding: 18px 28px 24px 28px;
          border-top: 1px solid #f1f5f9;
          background: #fafbfc;
        }

        .modal-footer-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-modal-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--primary);
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 800;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 100px;
          box-shadow: 0 6px 18px rgba(229, 62, 62, 0.3);
          transition: all 0.25s ease;
        }

        .btn-modal-primary:hover {
          background: #c53030;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(229, 62, 62, 0.4);
        }

        .btn-modal-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          color: #0f172a;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          padding: 11px 20px;
          border-radius: 100px;
          transition: all 0.25s ease;
        }

        .btn-modal-secondary:hover {
          border-color: var(--primary);
          color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
        }

        /* ===== 4. Services & Packages ===== */
        .services-packages-section {
          background: #fbfcfd;
          padding: 90px 0;
          border-top: 1px solid #f1f5f9;
        }

        .packages-header-wrap {
          display: grid;
          grid-template-columns: 0.85fr 2.15fr;
          gap: 48px;
          align-items: flex-start;
        }

        @media (max-width: 991px) {
          .packages-header-wrap {
            grid-template-columns: 1fr;
          }
        }

        .packages-header-left {
          text-align: left;
        }

        .packages-subtext {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.6;
          margin: 16px 0 24px 0;
        }

        .packages-doodle-arrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 20px;
        }

        .doodle-packages-text {
          font-family: var(--font-cursive);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary);
          line-height: 1.2;
        }

        .packages-cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 991px) {
          .packages-cards-row {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin: 0 auto;
          }
        }

        .package-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 24px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          text-align: left;
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.02);
        }

        .package-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
          border-color: rgba(229, 62, 62, 0.3);
        }

        .package-card-popular {
          border-color: var(--primary);
          box-shadow: 0 12px 35px rgba(229, 62, 62, 0.12);
          transform: scale(1.03);
          background: #fffdfd;
        }

        .package-card-popular:hover {
          transform: scale(1.03) translateY(-6px);
        }

        .popular-top-ribbon {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: #ffffff;
          padding: 4px 16px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);
        }

        .package-badge-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .package-tag-sub {
          font-size: 0.76rem;
          font-weight: 900;
          color: #64748b;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .package-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popular-icon-wrap {
          background: #fef08a;
          color: #b45309;
        }

        .package-price {
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
        }

        .price-val {
          font-family: var(--font-heading);
          font-size: 2.1rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
        }

        .price-period {
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 700;
          margin-top: 4px;
        }

        .package-aim {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.45;
          margin-bottom: 20px;
          min-height: 38px;
        }

        .package-body {
          flex: 1;
          margin-bottom: 24px;
          border-top: 1px solid #f1f5f9;
          padding-top: 20px;
        }

        .package-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 0.85rem;
          color: #334155;
        }

        .package-features li {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-package-action {
          display: block;
          text-align: center;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #1e293b;
          padding: 12px 20px;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .btn-package-action:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: #fff5f5;
        }

        .btn-package-popular {
          background: var(--primary);
          border-color: var(--primary);
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(229, 62, 62, 0.3);
        }

        .btn-package-popular:hover {
          background: #dc2626;
          border-color: #dc2626;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(229, 62, 62, 0.4);
        }

        /* ===== 5. Interactive Calculator Section ===== */
        .calc-interactive-section {
          background: #ffffff;
          padding: 90px 0;
        }

        .calc-card-container {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 32px;
          padding: 48px;
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 991px) {
          .calc-card-container {
            grid-template-columns: 1fr;
            padding: 28px;
          }
        }

        .calc-info-col {
          text-align: left;
        }

        .calc-heading {
          font-family: var(--font-heading);
          font-size: 2.1rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.25;
          margin: 12px 0 16px 0;
        }

        .calc-desc {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.65;
          margin-bottom: 28px;
        }

        .calc-highlight-box {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .calc-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .calc-highlight-item strong {
          display: block;
          font-size: 0.92rem;
          color: #0f172a;
        }

        .calc-highlight-item span {
          font-size: 0.82rem;
          color: #64748b;
        }

        .calc-widget-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          text-align: left;
        }

        .calc-step-section {
          margin-bottom: 24px;
        }

        .calc-step-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .calc-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        @media (max-width: 576px) {
          .calc-options-grid {
            grid-template-columns: 1fr;
          }
        }

        .calc-option-btn {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 14px;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: all 0.2s ease;
        }

        .calc-option-btn:hover {
          border-color: var(--primary);
        }

        .calc-option-btn.active {
          background: #fff5f5;
          border-color: var(--primary);
        }

        .option-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: #1e293b;
        }

        .option-price {
          font-size: 0.84rem;
          font-weight: 800;
          color: var(--primary);
        }

        .calc-addons-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .calc-addon-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .calc-addon-pill:hover {
          border-color: var(--primary);
        }

        .calc-addon-pill.active {
          background: #fff5f5;
          border-color: var(--primary);
        }

        .addon-checkbox {
          width: 18px;
          height: 18px;
          border-radius: 5px;
          border: 1.5px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .addon-checkbox.checked {
          background: var(--primary);
          border-color: var(--primary);
        }

        .addon-title {
          font-size: 0.84rem;
          font-weight: 600;
          color: #334155;
          flex: 1;
        }

        .addon-cost {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--primary);
        }

        .calc-result-box {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          padding-top: 20px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .result-text-wrap {
          display: flex;
          flex-direction: column;
        }

        .result-label {
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 700;
          text-transform: uppercase;
        }

        .result-number {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 900;
          line-height: 1.1;
        }

        .result-sub {
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 4px;
        }

        .btn-calc-wa {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #22c55e;
          color: #ffffff;
          padding: 12px 22px;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.3);
          transition: all 0.25s ease;
        }

        .btn-calc-wa:hover {
          background: #16a34a;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);
        }

        /* ===== 6. Clean News Section ===== */
        .clean-news-section {
          background: #ffffff;
          padding: 90px 0;
          border-top: 1px solid #f1f5f9;
        }

        .clean-news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        @media (max-width: 991px) {
          .clean-news-grid {
            grid-template-columns: 1fr;
          }
        }

        .clean-news-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 28px;
          text-align: left;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.02);
        }

        .clean-news-card:hover {
          transform: translateY(-6px);
          border-color: rgba(229, 62, 62, 0.35);
          box-shadow: 0 16px 36px rgba(229, 62, 62, 0.08);
        }

        .news-meta-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .news-tag-badge {
          background: #fff1f2;
          color: var(--primary);
          font-size: 0.72rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 100px;
          text-transform: uppercase;
        }

        .news-meta-right {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 600;
        }

        .meta-sep {
          color: #cbd5e1;
        }

        .news-card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.35;
          margin-bottom: 10px;
        }

        .news-card-summary {
          font-size: 0.86rem;
          color: #64748b;
          line-height: 1.55;
          margin-bottom: 20px;
          flex: 1;
        }

        .news-card-bottom {
          margin-top: auto;
          border-top: 1px solid #f1f5f9;
          padding-top: 14px;
        }

        .btn-read-summary {
          background: none;
          border: none;
          color: var(--primary);
          font-size: 0.85rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: transform 0.2s ease;
          padding: 0;
        }

        .clean-news-card:hover .btn-read-summary {
          transform: translateX(4px);
        }

        /* ===== 7. Testimonials (Kind Words) ===== */
        .testimonials-section {
          background: #fbfcfd;
          padding: 90px 0;
          border-top: 1px solid #f1f5f9;
        }

        .split-testimonials-row {
          display: grid;
          grid-template-columns: 0.95fr 2.05fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 991px) {
          .split-testimonials-row {
            grid-template-columns: 1fr;
          }
        }

        .testimonials-left-col {
          text-align: left;
        }

        .testimonials-subtext {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.65;
          margin: 16px 0 28px 0;
        }

        .testimonials-cards-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        @media (max-width: 768px) {
          .testimonials-cards-wrap {
            grid-template-columns: 1fr;
          }
        }

        .testimonial-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 32px 28px;
          text-align: left;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
        }

        .quote-icon-wrap {
          margin-bottom: 16px;
        }

        .testimonial-quote {
          font-size: 0.925rem;
          color: #334155;
          line-height: 1.65;
          margin-bottom: 24px;
          flex: 1;
        }

        .testimonial-client-row {
          display: flex;
          align-items: center;
          gap: 14px;
          border-top: 1px solid #f1f5f9;
          padding-top: 18px;
        }

        .client-avatar-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #fee2e2;
        }

        .client-info-group {
          display: flex;
          flex-direction: column;
        }

        .client-name {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
        }

        .client-role {
          font-size: 0.78rem;
          color: #64748b;
          margin-bottom: 4px;
        }

        .client-stars {
          display: flex;
          gap: 3px;
        }

        .testimonials-nav-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 14px;
          margin-top: 24px;
        }

        .testimonial-nav-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1.5px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .testimonial-nav-btn:hover {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
        }

        .testimonial-dots {
          display: flex;
          gap: 6px;
        }

        .dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #cbd5e1;
          transition: all 0.25s ease;
        }

        .dot-indicator.active {
          background: var(--primary);
          width: 22px;
          border-radius: 100px;
        }

        /* ===== 8. Consultation Banner (Curved Red) ===== */
        .consultation-banner-section {
          padding: 60px 0;
          background: #ffffff;
        }

        .consultation-curved-banner {
          background: linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #b91c1c 100%);
          border-radius: 36px;
          padding: 56px 48px;
          color: #ffffff;
          display: grid;
          grid-template-columns: 0.8fr 1.8fr;
          gap: 40px;
          align-items: center;
          box-shadow: 0 20px 60px rgba(220, 38, 38, 0.28);
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 991px) {
          .consultation-curved-banner {
            grid-template-columns: 1fr;
            padding: 36px 24px;
            text-align: center;
          }
          .banner-graphic-col {
            display: none;
          }
        }

        .banner-graphic-col {
          display: flex;
          justify-content: center;
        }

        .sticky-envelope-card {
          width: 170px;
          height: 130px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 18px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sticky-yellow-note {
          background: #fef08a;
          color: #713f12;
          padding: 14px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          transform: rotate(-6deg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          max-width: 140px;
          text-align: center;
        }

        .note-cursive-text {
          font-family: var(--font-cursive);
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .banner-form-col {
          text-align: left;
        }

        @media (max-width: 991px) {
          .banner-form-col {
            text-align: center;
          }
        }

        .banner-title {
          font-family: var(--font-heading);
          font-size: 2.3rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 10px;
        }

        .banner-subtitle {
          font-size: 0.95rem;
          color: #fee2e2;
          line-height: 1.6;
          margin-bottom: 24px;
          max-width: 580px;
        }

        .banner-inline-form {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .banner-input {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #0f172a;
          padding: 12px 18px;
          border-radius: 100px;
          font-size: 0.9rem;
          outline: none;
          flex: 1;
          min-width: 180px;
          transition: all 0.2s ease;
        }

        .banner-input:focus {
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
        }

        .input-wide {
          min-width: 220px;
        }

        .btn-banner-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #fef08a;
          color: #713f12;
          padding: 12px 26px;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.925rem;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        }

        .btn-banner-submit:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
        }

        .banner-success-box {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .banner-success-box h4 {
          font-size: 1.15rem;
          margin: 0 0 4px 0;
          color: #ffffff;
        }

        .banner-success-box p {
          font-size: 0.88rem;
          margin: 0;
          color: #fee2e2;
        }

        .btn-banner-direct-wa {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #22c55e;
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
          margin-left: auto;
        }

        /* ===== 9. FAQ Section ===== */
        .faq-section {
          background: #fbfcfd;
          padding: 90px 0;
          border-top: 1px solid #f1f5f9;
        }

        .faq-header-wrap {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 48px auto;
        }

        .faq-accordion-list {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .faq-item-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 20px 24px;
          cursor: pointer;
          text-align: left;
          transition: all 0.25s ease;
        }

        .faq-item-card:hover {
          border-color: rgba(229, 62, 62, 0.3);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.03);
        }

        .faq-item-card.is-active {
          border-color: var(--primary);
          box-shadow: 0 8px 24px rgba(229, 62, 62, 0.06);
        }

        .faq-question-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .faq-q-text {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .faq-answer-bar {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
          font-size: 0.925rem;
          color: #475569;
          line-height: 1.65;
        }

        /* ===== MODALS (Portfolio & News) ===== */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalFadeIn 0.25s ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-card-box {
          background: #ffffff;
          border-radius: 28px;
          max-width: 650px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
          animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.6);
          color: #ffffff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: background 0.2s ease;
        }

        .modal-close-btn:hover {
          background: var(--primary);
        }

        .modal-media-wrap {
          position: relative;
          height: 240px;
          overflow: hidden;
          background: #0f172a;
        }

        .modal-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-cat-tag {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: var(--primary);
          color: #ffffff;
          padding: 4px 14px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .modal-body-content {
          padding: 32px;
          text-align: left;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .modal-desc {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .modal-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .modal-meta-item {
          display: flex;
          flex-direction: column;
        }

        .meta-caption {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .modal-tech-stack {
          margin-bottom: 28px;
        }

        .tech-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .tech-badge-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #334155;
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .modal-actions-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-modal-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--primary);
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(229, 62, 62, 0.28);
        }

        .btn-modal-primary:hover {
          background: #dc2626;
        }

        .btn-modal-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #1e293b;
          padding: 12px 22px;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
        }

        .btn-modal-secondary:hover {
          border-color: #22c55e;
          color: #166534;
        }

        /* News Modal Specific */
        .modal-news-box {
          max-width: 580px;
        }

        .modal-news-header {
          padding: 32px 32px 16px 32px;
          text-align: left;
        }

        .news-time-wrap {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 600;
          margin-left: 12px;
        }

        .modal-news-body {
          padding: 0 32px 32px 32px;
          text-align: left;
        }

        .news-sub-heading {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .modal-news-bullets {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-news-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.9rem;
          color: #334155;
          line-height: 1.5;
        }

        .news-impact-box {
          background: #fff5f5;
          border-left: 3px solid var(--primary);
          padding: 14px 18px;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .news-impact-box strong {
          display: block;
          font-size: 0.82rem;
          color: var(--primary);
          margin-bottom: 4px;
        }

        .news-impact-box p {
          font-size: 0.88rem;
          color: #475569;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
