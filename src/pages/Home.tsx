import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import {
  ArrowRight,
  Globe,
  Smartphone,
  FolderKanban,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Star,
  Layers,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Home() {
  const [servicesRef, servicesVisible] = useScrollReveal();
  const [portfolioRef, portfolioVisible] = useScrollReveal();
  const [guideRef, guideVisible] = useScrollReveal();
  const [calcRef, calcVisible] = useScrollReveal();
  const [faqRef, faqVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const [ctaTitle, setCtaTitle] = useState('Siap Memulai Transformasi Digital?');
  const [ctaDesc, setCtaDesc] = useState(
    'Konsultasikan ide produk digital atau sistem Anda bersama tim ahli kami secara gratis. Dapatkan estimasi biaya dan rancangan proyek dalam waktu singkat.'
  );

  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.cta_title) setCtaTitle(data.cta_title);
        if (data.cta_description) setCtaDesc(data.cta_description);
      })
      .catch((err) => console.error('Gagal mengambil config untuk CTA:', err));

    fetch('/api/portfolios?t=' + Date.now())
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.slice(0, 2).map((item: any) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          category: item.category_label,
          image: item.image_url,
          shortDesc: item.short_desc,
        }));
        setFeaturedProjects(mapped);
      })
      .catch((err) => console.error('Gagal mengambil data portfolio untuk homepage:', err));
  }, []);

  const popularSolutions = [
    {
      title: 'Portal Web & Profil Bisnis',
      category: 'Web Development',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      price: 'Mulai Rp 499rb',
      desc: 'Arsitektur cloud super cepat dengan skor Lighthouse 95+.',
    },
    {
      title: 'Aplikasi Mobile Multiplatform',
      category: 'Mobile Flutter & React Native',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
      price: 'Mulai Rp 3.5jt',
      desc: 'Aplikasi Android & iOS dari single codebase efisien dan stabil.',
    },
    {
      title: 'AI Chatbot & Workflow Otomatis',
      category: 'AI & Automasi',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
      price: 'Mulai Rp 3.5jt',
      desc: 'Integrasi LLM OpenAI, asisten virtual CS, dan alur kerja cerdas.',
    },
    {
      title: 'Sistem SaaS Kasir & Manajemen',
      category: 'Software Ready-to-Use',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      price: 'Mulai Rp 99rb/bln',
      desc: 'Manajemen kasir, laporan penjualan, dan absensi terpusat.',
    },
  ];

  const categoryPills = [
    { icon: <Globe size={15} />, label: 'Web Apps' },
    { icon: <Smartphone size={15} />, label: 'Mobile Flutter' },
    { icon: <Cpu size={15} />, label: 'AI Automasi' },
    { icon: <Layers size={15} />, label: 'Cloud Server' },
    { icon: <ShieldCheck size={15} />, label: 'Maintenance' },
    { icon: <Sparkles size={15} />, label: 'UI/UX Design' },
  ];

  const faqList = [
    {
      q: 'Apa itu Berdikari Digital Nusantara?',
      a: 'Berdikari Digital Nusantara adalah perusahaan rekayasa perangkat lunak premium yang fokus pada pembuatan website kustom, mobile app, sistem kecerdasan buatan (AI) otomatisasi, serta produk digital siap guna berkualitas tinggi.',
    },
    {
      q: 'Bagaimana model pemesanan Produk Digital?',
      a: 'Anda dapat melihat pilihan produk digital melalui menu Layanan, memilih paket yang sesuai kebutuhan, lalu memesannya secara langsung melalui integrasi WhatsApp kami untuk respons cepat.',
    },
    {
      q: 'Bagaimana metode pengerjaan proyek di Berdikari Digital Nusantara?',
      a: 'Kami menggunakan metode agile interaktif: Analisis Kebutuhan, Prototipe Desain Figma, Pengodean Sistem, Quality Assurance (Audit Lighthouse 90+), Deployment ke Cloud Server, dan Garansi Bug-Free gratis 3 bulan.',
    },
    {
      q: 'Bagaimana penentuan biaya investasi proyek?',
      a: 'Penentuan biaya investasi kami transparan dan rasional berdasarkan kebutuhan modul, performa sistem, serta skala fitur. Kami menawarkan paket Starter hemat mulai Rp 499.000 dengan opsi langganan pemeliharaan Rp 50.000/bln.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="home-page animate-fade-in">
      <Hero />

      {/* --- TECH STACK TICKER --- */}
      <div className="tech-ticker-container">
        <div className="tech-ticker-wrapper">
          <div className="tech-ticker-track">
            <span>React.js</span>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Flutter</span>
            <span>React Native</span>
            <span>Node.js</span>
            <span>Python</span>
            <span>OpenAI API</span>
            <span>n8n Automasi</span>
            <span>Figma Design</span>
            <span>AWS Server</span>
            <span>Supabase DB</span>
            {/* Loop */}
            <span>React.js</span>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Flutter</span>
            <span>React Native</span>
            <span>Node.js</span>
            <span>Python</span>
            <span>OpenAI API</span>
            <span>n8n Automasi</span>
            <span>Figma Design</span>
          </div>
        </div>
      </div>

      {/* --- POPULAR SOLUTIONS GRID (Pomaii Style) --- */}
      <section
        ref={servicesRef as React.RefObject<HTMLDivElement>}
        className={`section popular-solutions-section reveal reveal-fade ${servicesVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="editorial-section-header">
            <div>
              <span className="editorial-mini-tag">SOLUSI TERBAIK</span>
              <h2 className="editorial-section-h2">Layanan & Produk Unggulan</h2>
            </div>
            <a href="/services.html" className="editorial-see-all-btn">
              <span>Lihat Semua Layanan</span>
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="editorial-cards-grid">
            {popularSolutions.map((item, idx) => (
              <div
                key={idx}
                className={`editorial-card reveal reveal-slide-up delay-${(idx + 1) * 100} ${
                  servicesVisible ? 'in-view' : ''
                }`}
              >
                <div className="card-thumb-wrap">
                  <img src={item.image} alt={item.title} className="card-thumb-img" />
                  <div className="card-badge-rating">
                    <Star size={12} fill="#ffffff" color="#ffffff" />
                    <span>{item.rating}</span>
                  </div>
                  <div className="card-price-overlay">
                    <span className="price-tag-badge">{item.price}</span>
                  </div>
                </div>

                <div className="card-text-wrap">
                  <span className="card-category-label">{item.category}</span>
                  <h3 className="card-item-title">{item.title}</h3>
                  <p className="card-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal Category Pill Filter Bar (Pomaii Style) */}
          <div className="editorial-category-pill-row">
            {categoryPills.map((pill, idx) => (
              <a href="/services.html" key={idx} className="category-filter-pill">
                <span className="pill-icon-circle">{pill.icon}</span>
                <span className="pill-name">{pill.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- VALUE & STORY BANNER (Pomaii Guide Style) --- */}
      <section
        ref={guideRef as React.RefObject<HTMLDivElement>}
        className={`section guide-story-section reveal reveal-fade ${guideVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="guide-card-container">
            <div className="guide-text-col">
              <span className="guide-mini-tag">STANDAR REKAYASA KAMI</span>
              <h3 className="guide-heading">Mengapa Mitra Bisnis Memilih Berdikari?</h3>
              <p className="guide-desc">
                Kami membangun sistem digital bukan sekadar kode, melainkan aset bernilai tinggi dengan kecepatan maksimal, keamanan terproteksi, dan garansi penuh tanpa biaya tersembunyi.
              </p>
              <a href="/about.html" className="btn-guide-action">
                <span>Pelajari Pendekatan Kami</span>
                <ArrowRight size={15} />
              </a>
            </div>

            <div className="guide-cards-col">
              <div className="guide-mini-card">
                <div className="mini-card-thumb">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80"
                    alt="Audit Kecepatan"
                  />
                </div>
                <div className="mini-card-content">
                  <h4>Audit Lighthouse 95+</h4>
                  <p>Kecepatan akses tinggi memastikan pengunjung tidak beralih ke kompetitor.</p>
                  <span className="mini-card-meta">3 menit baca</span>
                </div>
              </div>

              <div className="guide-mini-card">
                <div className="mini-card-thumb">
                  <img
                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80"
                    alt="Keamanan Cloud"
                  />
                </div>
                <div className="mini-card-content">
                  <h4>Sertifikat SSL & Proteksi Cloud</h4>
                  <p>Infrastruktur terisolasi, enkripsi data, dan backup berkala otomatis.</p>
                  <span className="mini-card-meta">2 menit baca</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RECENT PORTFOLIO SHOWCASE --- */}
      <section
        ref={portfolioRef as React.RefObject<HTMLDivElement>}
        className={`section portfolio-preview-section reveal reveal-fade ${portfolioVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="editorial-section-header">
            <div>
              <span className="editorial-mini-tag">HASIL KARYA</span>
              <h2 className="editorial-section-h2">Portofolio Terbaru</h2>
            </div>
            <a href="/portfolio.html" className="editorial-see-all-btn">
              <span>Lihat Semua Karya</span>
              <FolderKanban size={15} />
            </a>
          </div>

          <div className="portfolio-preview-grid">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="portfolio-preview-card"
                onClick={() => {
                  window.location.href = `/portfolio-detail.html?slug=${encodeURIComponent(project.slug)}`;
                }}
              >
                <div className="portfolio-preview-img-box">
                  <img src={project.image} alt={project.title} className="portfolio-preview-img" />
                </div>
                <div className="portfolio-preview-info">
                  <span className="portfolio-preview-cat">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.shortDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING & RATIONAL COMPARISON SECTION --- */}
      <section
        ref={calcRef as React.RefObject<HTMLDivElement>}
        className={`section pricing-section reveal reveal-fade ${calcVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="section-title">
            <span className="editorial-mini-tag">INVESTASI TRANSPARAN</span>
            <h2>Penawaran Harga & Nilai Layanan Rasional</h2>
            <p>Perbandingan kompetitif dan transparan investasi teknologi Anda bersama Berdikari Digital Nusantara.</p>
            <div className="accent-bar"></div>
          </div>

          {/* Pricing Cards */}
          <div className="pricing-cards-grid">
            {/* Card 1: Web Starter (UMKM) */}
            <div className={`card-glass pricing-card reveal reveal-slide-up delay-100 ${calcVisible ? 'in-view' : ''}`}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(229, 62, 62, 0.08)', color: 'var(--primary)' }}>
                    <Globe size={24} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', background: '#e2e8f0', color: '#334155', padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase', fontWeight: 'bold' }}>Hemat & Praktis</span>
                    <h3 style={{ fontSize: '1.2rem', margin: '2px 0 0 0', fontWeight: 700 }}>Web Starter (UMKM)</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Cocok untuk UMKM, Landing Page Promosi, & Profil Bisnis Online.</p>

                <div style={{ margin: '20px 0', padding: '16px', background: 'rgba(248, 250, 252, 0.8)', borderRadius: '10px', borderLeft: '3px solid var(--primary)' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Biaya Awal</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>Rp 499.000</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>+ Maintenance: Mulai Rp 50.000/bln</div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Gratis Hosting Cloud & SSL Terkelola</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Bebas Pusing Mati Server / Maintenance</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Gratis Update Konten Ringan Setiap Bulan</li>
                </ul>
              </div>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Berdikari%20Digital%20Nusantara,%20saya%20tertarik%20dengan%20paket%20Web%20Starter%20Rp%20499rb."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full"
                style={{ textAlign: 'center', marginTop: '16px' }}
              >
                Pilih Paket Starter <ArrowRight size={16} />
              </a>
            </div>

            {/* Card 2: Web Kustom & System — Popular */}
            <div className={`card-glass pricing-card pricing-card--popular reveal reveal-slide-up delay-200 ${calcVisible ? 'in-view' : ''}`}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--primary)', color: '#ffffff' }}>
                    <Globe size={24} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', background: 'var(--primary)', color: '#fff', padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase', fontWeight: 'bold' }}>Paling Populer</span>
                    <h3 style={{ fontSize: '1.2rem', margin: '2px 0 0 0', fontWeight: 700 }}>Web Kustom & System</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Company Profile, E-Commerce, & Dashboard Manajemen Data Kustom.</p>

                <div style={{ margin: '20px 0', padding: '16px', background: '#ffffff', borderRadius: '10px', borderLeft: '3px solid var(--primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Biaya Awal</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>Rp 1.500.000</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>Opsional Maintenance: Rp 100.000/bln</div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Gratis Domain (.com/.id) & SSL 1 Tahun</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Speed Ultra Kencang (Lighthouse 90+)</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Garansi Bug-Free & Support Eksklusif</li>
                </ul>
              </div>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Berdikari%20Digital%20Nusantara,%20saya%20tertarik%20dengan%20layanan%20Web%20Kustom."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
                style={{ textAlign: 'center', marginTop: '16px' }}
              >
                Konsultasikan Web Kustom <ArrowRight size={16} />
              </a>
            </div>

            {/* Card 3: Mobile App & AI */}
            <div className={`card-glass pricing-card reveal reveal-slide-up delay-300 ${calcVisible ? 'in-view' : ''}`}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(229, 62, 62, 0.08)', color: 'var(--primary)' }}>
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', background: '#e2e8f0', color: '#334155', padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase', fontWeight: 'bold' }}>Advanced</span>
                    <h3 style={{ fontSize: '1.2rem', margin: '2px 0 0 0', fontWeight: 700 }}>Mobile App & AI</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Aplikasi Android/iOS Kustom & Chatbot AI Cerdas Bisnis.</p>

                <div style={{ margin: '20px 0', padding: '16px', background: 'rgba(248, 250, 252, 0.8)', borderRadius: '10px', borderLeft: '3px solid var(--primary)' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Biaya Awal</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>Rp 3.500.000</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>Opsional Maintenance: SLA</div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Single Codebase Flutter / React Native</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Integrasi AI Chatbot & Agent n8n</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Opsi Managed Maintenance SLA High</li>
                </ul>
              </div>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Berdikari%20Digital%20Nusantara,%20saya%20tertarik%20dengan%20layanan%20Mobile%20App%20/%20AI."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full"
                style={{ textAlign: 'center', marginTop: '16px' }}
              >
                Konsultasikan App / AI <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Comparison Table */}
          <div className={`card-glass comparison-table-wrapper reveal reveal-slide-up delay-400 ${calcVisible ? 'in-view' : ''}`} style={{ padding: '32px', background: '#fafbfc' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>Mengapa Model Starter BDN Lebih Menguntungkan?</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '24px' }}>Perbandingan nyata antara jasa web Rp 500rb biasa (lepas tangan) vs Model Starter Berdikari Digital Nusantara.</p>

            <table className="comparison-table">
              <thead>
                <tr>
                  <th style={{ color: 'var(--text-primary)' }}>Faktor</th>
                  <th style={{ color: 'var(--text-muted)' }}>Jasa Web 500rb Lain</th>
                  <th style={{ color: 'var(--primary)', fontWeight: 800 }}>Model Starter BDN</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Biaya Awal</td>
                  <td style={{ color: '#64748b' }}>Rp 500.000 (Lunas)</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Hemat (Rp 499.000 + Rp 50.000/bln)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Perawatan & Server Down</td>
                  <td style={{ color: '#64748b' }}>Lepas tangan saat error</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Server dipantau 24/7, gratis perbaikan</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Update Konten</td>
                  <td style={{ color: '#64748b' }}>Harus edit sendiri / bayar joki</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Gratis bantuan edit konten ringan tiap bulan</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Keamanan</td>
                  <td style={{ color: '#64748b' }}>Mudah kena hack / script malware</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>SSL & patching selalu diperbarui otomatis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- SPECIAL OFFER BANNER (Pomaii Curved Promo Banner Style) --- */}
      <section className="section promo-banner-section">
        <div className="container">
          <div className="promo-curved-banner">
            <div className="promo-banner-content">
              <span className="promo-badge-tag">PENAWARAN SPESIAL</span>
              <h2 className="promo-banner-title">Wujudkan Transformasi Digital Anda Hari Ini</h2>
              <p className="promo-banner-desc">
                Konsultasikan ide bisnis Anda bersama tim tech lead kami. Dapatkan arsitektur sistem awal, estimasi biaya transparan, dan jaminan purna jual tanpa komitmen rumit.
              </p>
              <a href="/contact.html" className="btn-promo-action">
                <span>Mulai Konsultasi Gratis</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST STATS ROW (Pomaii Bottom Stats Style, NO EMOJIS) --- */}
      <div className="editorial-bottom-stats-bar">
        <div className="container">
          <div className="stats-row-grid">
            <div className="stats-metric-item">
              <span className="stats-number text-red">150+</span>
              <span className="stats-subtext">Proyek Selesai</span>
            </div>
            <div className="stats-metric-item">
              <span className="stats-number text-red">50K+</span>
              <span className="stats-subtext">Pengguna Aktif</span>
            </div>
            <div className="stats-metric-item">
              <span className="stats-number text-red">4.9/5.0</span>
              <span className="stats-subtext">Skor Kepuasan Klien</span>
            </div>
            <div className="stats-metric-item">
              <span className="stats-number text-red">24/7</span>
              <span className="stats-subtext">Dukungan Teknis</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- FAQ ACCORDION SECTION --- */}
      <section
        ref={faqRef as React.RefObject<HTMLDivElement>}
        className={`faq-section section reveal reveal-fade ${faqVisible ? 'in-view' : ''}`}
        style={{ background: '#f8fafc', borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <div className="section-title">
            <span className="editorial-mini-tag">INFORMASI UMUM</span>
            <h2>Pertanyaan Umum (FAQ)</h2>
            <p>Temukan jawaban instan mengenai layanan, produk digital, dan model kerja kolaborasi kami.</p>
            <div className="accent-bar"></div>
          </div>

          <div className="faq-accordion-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqList.map((item, idx) => (
              <div
                key={idx}
                className="faq-item card-glass"
                style={{ padding: '20px 24px', marginBottom: '16px', cursor: 'pointer', textAlign: 'left' }}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{item.q}</h4>
                  {openFaqIndex === idx ? <ChevronUp size={20} className="text-red" /> : <ChevronDown size={20} />}
                </div>
                {openFaqIndex === idx && (
                  <div className="faq-answer-row" style={{ marginTop: '12px', fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                    <p style={{ margin: 0 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA COLLABORATION SECTION --- */}
      <section
        ref={ctaRef as React.RefObject<HTMLDivElement>}
        className={`home-cta section reveal reveal-scale-in ${ctaVisible ? 'in-view' : ''}`}
      >
        <div className="glow-orb cta-glow"></div>
        <div className="container cta-container card-glass">
          <h2 className="cta-title">{ctaTitle}</h2>
          <p className="cta-desc">{ctaDesc}</p>
          <a href="/contact.html" className="btn btn-primary btn-lg">
            Hubungi Kami Sekarang <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <style>{`
        /* ===== Editorial Section Header ===== */
        .editorial-section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 36px;
          text-align: left;
        }

        .editorial-mini-tag {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 4px;
          display: inline-block;
        }

        .editorial-section-h2 {
          font-size: 2.2rem;
          font-weight: 900;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .editorial-see-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--primary);
          transition: transform 0.2s ease;
        }

        .editorial-see-all-btn:hover {
          transform: translateX(4px);
        }

        /* ===== Editorial Cards Grid (Pomaii Popular Style) ===== */
        .editorial-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        @media (max-width: 991px) {
          .editorial-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .editorial-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .editorial-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          text-align: left;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
        }

        .editorial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(229, 62, 62, 0.08);
          border-color: rgba(229, 62, 62, 0.25);
        }

        .card-thumb-wrap {
          position: relative;
          height: 200px;
          background-color: #f1f5f9;
          overflow: hidden;
        }

        .card-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .editorial-card:hover .card-thumb-img {
          transform: scale(1.06);
        }

        .card-badge-rating {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .card-price-overlay {
          position: absolute;
          bottom: 12px;
          right: 12px;
        }

        .price-tag-badge {
          background: #ffffff;
          color: var(--primary);
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .card-text-wrap {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-category-label {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
        }

        .card-item-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .card-item-desc {
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
        }

        /* ===== Category Pill Filter Row ===== */
        .editorial-category-pill-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          padding: 10px 0;
        }

        .category-filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid var(--border);
          padding: 8px 18px;
          border-radius: 100px;
          color: #334155;
          font-size: 0.85rem;
          font-weight: 700;
          transition: all 0.25s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
        }

        .category-filter-pill:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: #fff5f5;
          transform: translateY(-2px);
        }

        .pill-icon-circle {
          color: var(--primary);
          display: flex;
          align-items: center;
        }

        /* ===== Guide & Story Banner (Pomaii Style) ===== */
        .guide-story-section {
          background-color: #f8fafc;
        }

        .guide-card-container {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 48px;
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 40px;
          align-items: center;
          text-align: left;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
        }

        @media (max-width: 991px) {
          .guide-card-container {
            grid-template-columns: 1fr;
            padding: 30px;
          }
        }

        .guide-mini-tag {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
          display: inline-block;
        }

        .guide-heading {
          font-size: 2rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.25;
          margin-bottom: 16px;
        }

        .guide-desc {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        .btn-guide-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0f172a;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 700;
          transition: all 0.25s ease;
        }

        .btn-guide-action:hover {
          background: var(--primary);
          transform: translateY(-2px);
        }

        .guide-cards-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .guide-mini-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 16px;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .guide-mini-card:hover {
          transform: translateX(4px);
          border-color: rgba(229, 62, 62, 0.3);
          background: #ffffff;
        }

        .mini-card-thumb {
          width: 90px;
          height: 90px;
          border-radius: 14px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .mini-card-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mini-card-content h4 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px 0;
        }

        .mini-card-content p {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0 0 8px 0;
          line-height: 1.45;
        }

        .mini-card-meta {
          font-size: 0.75rem;
          color: var(--primary);
          font-weight: 700;
        }

        /* ===== Portfolio Preview Styles ===== */
        .portfolio-preview-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        @media (max-width: 768px) {
          .portfolio-preview-grid {
            grid-template-columns: 1fr;
          }
        }

        .portfolio-preview-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          text-align: left;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .portfolio-preview-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
          border-color: rgba(229, 62, 62, 0.3);
        }

        .portfolio-preview-img-box {
          height: 240px;
          overflow: hidden;
        }

        .portfolio-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .portfolio-preview-card:hover .portfolio-preview-img {
          transform: scale(1.05);
        }

        .portfolio-preview-info {
          padding: 24px;
        }

        .portfolio-preview-cat {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          margin-bottom: 6px;
          display: inline-block;
        }

        .portfolio-preview-info h3 {
          font-size: 1.3rem;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .portfolio-preview-info p {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.5;
        }

        /* ===== Promo Curved Banner (Pomaii Style) ===== */
        .promo-banner-section {
          padding: 30px 0;
        }

        .promo-curved-banner {
          background: linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #b91c1c 100%);
          border-radius: 28px;
          padding: 60px 48px;
          color: #ffffff;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(185, 28, 28, 0.28);
        }

        .promo-banner-content {
          max-width: 720px;
          margin: 0 auto;
          position: relative;
          z-index: 5;
        }

        .promo-badge-tag {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          color: #fecaca;
          background: rgba(255, 255, 255, 0.15);
          padding: 4px 14px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 16px;
        }

        .promo-banner-title {
          font-size: 2.5rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .promo-banner-desc {
          font-size: 1.05rem;
          color: #fee2e2;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .btn-promo-action {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          color: var(--primary);
          padding: 14px 32px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          transition: all 0.25s ease;
        }

        .btn-promo-action:hover {
          transform: translateY(-2px);
          background: #fff5f5;
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.2);
        }

        /* ===== Bottom Trust Stats Row (Pomaii Style, NO EMOJIS) ===== */
        .editorial-bottom-stats-bar {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: #ffffff;
          padding: 32px 0;
        }

        .stats-row-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .stats-row-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        .stats-metric-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stats-number {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 900;
          line-height: 1.1;
        }

        .stats-subtext {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 700;
          margin-top: 4px;
        }

        /* ===== Tech Ticker Styles ===== */
        .tech-ticker-container {
          background: #ffffff;
          border-bottom: 1px solid var(--border);
          padding: 20px 0;
          overflow: hidden;
          position: relative;
          z-index: 10;
        }

        .tech-ticker-wrapper {
          display: flex;
          width: 100%;
        }

        @keyframes tickerScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .tech-ticker-track {
          display: flex;
          gap: 50px;
          white-space: nowrap;
          animation: tickerScroll 30s linear infinite;
          will-change: transform;
        }

        .tech-ticker-track span {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
        }

        .tech-ticker-track span::after {
          content: '\u2022';
          color: var(--primary);
          margin-left: 50px;
        }

        /* ===== Pricing Section Styles ===== */
        .pricing-section {
          background: #ffffff;
          border-top: 1px solid var(--border);
        }

        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin: 0 auto 48px auto;
          max-width: 1100px;
        }

        @media (max-width: 991px) {
          .pricing-cards-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
        }

        .pricing-card {
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid var(--border);
          background: #ffffff;
          border-radius: 16px;
          transition: transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s cubic-bezier(.4,0,.2,1);
        }

        .pricing-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
        }

        .pricing-card--popular {
          border: 1.5px solid rgba(229, 62, 62, 0.35);
          background: #fffcfc;
          box-shadow: 0 0 30px rgba(229, 62, 62, 0.08), 0 0 60px rgba(229, 62, 62, 0.04);
          position: relative;
        }

        .pricing-card--popular:hover {
          box-shadow: 0 0 40px rgba(229, 62, 62, 0.12), 0 20px 40px rgba(0,0,0,0.06);
        }

        /* Comparison table */
        .comparison-table-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          overflow-x: auto;
          border-radius: 20px;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
          text-align: left;
        }

        .comparison-table th,
        .comparison-table td {
          padding: 14px 18px;
        }

        .comparison-table thead tr {
          border-bottom: 2px solid var(--border);
          background: #ffffff;
        }

        .comparison-table tbody tr {
          border-bottom: 1px solid var(--border);
          transition: background 0.2s ease;
        }

        .comparison-table tbody tr:hover {
          background: rgba(229, 62, 62, 0.015);
        }

        .comparison-table tbody tr:last-child {
          border-bottom: none;
        }

        /* FAQ accordion elements */
        .faq-item {
          transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
        }
        
        .faq-item:hover {
          border-color: var(--primary);
          box-shadow: 0 10px 25px rgba(229, 62, 62, 0.04);
        }

        .home-cta {
          padding: 80px 0;
          position: relative;
        }

        .cta-glow {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(229, 62, 62, 0.03) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .cta-container {
          padding: 60px 40px;
          text-align: center;
          max-width: 960px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .cta-title {
          font-size: 2.25rem;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .cta-desc {
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 680px;
          margin: 0 auto 32px;
          line-height: 1.7;
        }

        .btn-lg {
          padding: 16px 36px;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
}
