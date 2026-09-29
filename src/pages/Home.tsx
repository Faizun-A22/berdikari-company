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
  Sparkles,
  Calendar,
  CheckCircle2,
  Zap,
  Bot,
  Store,
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Home() {
  const [servicesRef, servicesVisible] = useScrollReveal();
  const [portfolioRef, portfolioVisible] = useScrollReveal();
  const [newsRef, newsVisible] = useScrollReveal();
  const [guideRef, guideVisible] = useScrollReveal();
  const [calcRef, calcVisible] = useScrollReveal();
  const [faqRef, faqVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const [ctaTitle, setCtaTitle] = useState('Siap Memulai Transformasi Digital?');
  const [ctaDesc, setCtaDesc] = useState(
    'Konsultasikan ide produk digital atau sistem Anda bersama kami secara gratis. Dapatkan estimasi biaya dan rancangan proyek dalam waktu singkat.'
  );

  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [recentNews, setRecentNews] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
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

    fetch('/api/activities')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRecentNews(data.slice(0, 3));
        } else {
          // Default fallbacks if empty
          setRecentNews([
            {
              id: '1',
              title: 'Standar Arsitektur Cloud & Keamanan Berdikari Digital Nusantara',
              category: 'Rilis',
              date: '2026-09-15',
              image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
              short_desc: 'Implementasi isolasi server cloud generasi terbaru dengan sertifikasi SSL otomatis dan proteksi DDoS berkala.',
            },
            {
              id: '2',
              title: 'Akselerasi Digital UMKM Melalui Layanan Web Starter Hemat',
              category: 'Berita',
              date: '2026-09-10',
              image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
              short_desc: 'Program dukungan teknologi berkesinambungan bagi pelaku usaha kecil dan menengah untuk go digital tanpa beban biaya tinggi.',
            },
            {
              id: '3',
              title: 'Pemanfaatan Otomatisasi AI & Chatbot LLM untuk Efisiensi Bisnis',
              category: 'Kegiatan',
              date: '2026-09-02',
              image_url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
              short_desc: 'Integrasi sistem AI cerdas 24/7 yang membantu automasi layanan pelanggan dan penyederhanaan alur kerja internal.',
            },
          ]);
        }
      })
      .catch(() => {
        setRecentNews([
          {
            id: '1',
            title: 'Standar Arsitektur Cloud & Keamanan Berdikari Digital Nusantara',
            category: 'Rilis',
            date: '2026-09-15',
            image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
            short_desc: 'Implementasi isolasi server cloud generasi terbaru dengan sertifikasi SSL otomatis dan proteksi DDoS berkala.',
          },
          {
            id: '2',
            title: 'Akselerasi Digital UMKM Melalui Layanan Web Starter Hemat',
            category: 'Berita',
            date: '2026-09-10',
            image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
            short_desc: 'Program dukungan teknologi berkesinambungan bagi pelaku usaha kecil dan menengah untuk go digital tanpa beban biaya tinggi.',
          },
          {
            id: '3',
            title: 'Pemanfaatan Otomatisasi AI & Chatbot LLM untuk Efisiensi Bisnis',
            category: 'Kegiatan',
            date: '2026-09-02',
            image_url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
            short_desc: 'Integrasi sistem AI cerdas 24/7 yang membantu automasi layanan pelanggan dan penyederhanaan alur kerja internal.',
          },
        ]);
      });
  }, []);

  const solutions = [
    {
      id: 'web',
      category: 'Website & Web App',
      tag: 'Paling Populer',
      icon: <Globe size={22} />,
      title: 'Portal Web & Profil Bisnis Modern',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      price: 'Mulai Rp 499rb',
      priceSubtitle: '+ Maint. Rp 50rb/bln',
      desc: 'Website berkecepatan tinggi dengan skor audit Lighthouse 95+, responsif mobile, dan teroptimasi SEO mesin pencari.',
      badges: ['Lighthouse 95+', 'Gratis SSL', 'SEO Ready'],
      features: [
        'Desain UI kustom bernuansa bersih & elegan',
        'Hosting cloud terisolasi aman dari gangguan',
        'Dukungan update konten rutin setiap bulan',
      ],
      whatsappMsg: 'Halo Berdikari Digital Nusantara, saya tertarik dengan layanan Website & Web App.',
    },
    {
      id: 'mobile',
      category: 'Aplikasi Mobile',
      tag: 'Multiplatform',
      icon: <Smartphone size={22} />,
      title: 'Aplikasi Mobile Android & iOS',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
      price: 'Mulai Rp 3.5jt',
      priceSubtitle: 'Single Codebase Teruji',
      desc: 'Aplikasi mobile berperforma native dengan Flutter & React Native untuk pengalaman pengguna yang halus dan responsif.',
      badges: ['Dual OS', 'Fast Performance', 'Offline Cache'],
      features: [
        'Satu codebase efisien untuk Google Play & App Store',
        'Integrasi Push Notification & Payment Gateway',
        'Arsitektur aman dengan proteksi enkripsi data',
      ],
      whatsappMsg: 'Halo Berdikari Digital Nusantara, saya tertarik dengan layanan Aplikasi Mobile.',
    },
    {
      id: 'ai',
      category: 'AI & Otomatisasi',
      tag: 'Inovasi Baru',
      icon: <Bot size={22} />,
      title: 'AI Chatbot & Workflow Otomatis',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
      price: 'Mulai Rp 3.5jt',
      priceSubtitle: 'Integrasi LLM OpenAI',
      desc: 'Asisten virtual cerdas yang memahami konteks bisnis Anda, terhubung ke WhatsApp customer service, dan memangkas tugas repetitif.',
      badges: ['OpenAI LLM', 'WhatsApp Bot', 'n8n Workflow'],
      features: [
        'Customer Service cerdas otomatis aktif 24 jam nonstop',
        'Sinkronisasi otomatisasi alur kerja database internal',
        'Pelatihan model khusus berdasarkan dokumen SOP bisnis',
      ],
      whatsappMsg: 'Halo Berdikari Digital Nusantara, saya tertarik dengan layanan AI Otomatisasi & Chatbot.',
    },
    {
      id: 'saas',
      category: 'Sistem SaaS & Kasir',
      tag: 'Solusi Bisnis',
      icon: <Store size={22} />,
      title: 'Sistem SaaS Kasir & Manajemen Toko',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      price: 'Mulai Rp 99rb/bln',
      priceSubtitle: 'Ready-to-Use',
      desc: 'Software terpadu untuk pencatatan transaksi kasir, inventaris gudang multi-outlet, dan laporan omzet real-time.',
      badges: ['Multi Outlet', 'Real-time Report', 'Cetak Struk'],
      features: [
        'Dashboard analitik penjualan dan keuangan transparan',
        'Peringatan otomatis saat stok barang mulai menipis',
        'Akses multi-pengguna dengan pembagian hak akses aman',
      ],
      whatsappMsg: 'Halo Berdikari Digital Nusantara, saya tertarik dengan Sistem SaaS Kasir & Manajemen.',
    },
  ];

  const filterCategories = ['Semua', 'Website & Web App', 'Aplikasi Mobile', 'AI & Otomatisasi', 'Sistem SaaS & Kasir'];

  const displayedSolutions =
    activeCategory === 'Semua'
      ? solutions
      : solutions.filter((s) => s.category === activeCategory);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Rilis':
        return 'cat-badge-rilis';
      case 'Kegiatan':
        return 'cat-badge-kegiatan';
      case 'Pengumuman':
        return 'cat-badge-pengumuman';
      default:
        return 'cat-badge-berita';
    }
  };

  const faqList = [
    {
      q: 'Apa itu Berdikari Digital Nusantara?',
      a: 'Berdikari Digital Nusantara adalah perusahaan rekayasa perangkat lunak modern yang fokus pada pembuatan website kustom, mobile app, sistem kecerdasan buatan (AI) otomatisasi, serta produk digital siap guna berkualitas tinggi.',
    },
    {
      q: 'Bagaimana model pemesanan Produk Digital?',
      a: 'Anda dapat memilih paket yang sesuai kebutuhan pada katalog layanan kami, lalu berkonsultasi atau memesan secara langsung melalui integrasi WhatsApp untuk respons kilat dari tech lead kami.',
    },
    {
      q: 'Bagaimana metode pengerjaan proyek di Berdikari Digital Nusantara?',
      a: 'Kami menerapkan standar agile: Analisis Kebutuhan, Prototipe Desain Figma, Pengodean Bersih, Quality Assurance (Audit Lighthouse 95+), Deployment ke Cloud Server, serta Garansi Bug-Free 3 bulan.',
    },
    {
      q: 'Bagaimana penentuan biaya investasi proyek?',
      a: 'Biaya investasi kami transparan dan rasional. Kami menyediakan paket Web Starter hemat mulai Rp 499.000 dengan maintenance terkelola Rp 50.000/bln, serta solusi kustom enterprise yang disesuaikan dengan skala modul bisnis Anda.',
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
            {/* Duplicate track for seamless infinite scroll */}
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
          </div>
        </div>
      </div>

      {/* --- CREATIVE PRODUCTS & SERVICES SHOWCASE --- */}
      <section
        ref={servicesRef as React.RefObject<HTMLDivElement>}
        className={`section popular-solutions-section reveal reveal-fade ${
          servicesVisible ? 'in-view' : ''
        }`}
      >
        <div className="container">
          <div className="solutions-header-wrap">
            <div className="solutions-header-text">
              <span className="editorial-mini-tag">KATALOG REKAYASA DIGITAL</span>
              <h2 className="editorial-section-h2">Produk &amp; Layanan Unggulan</h2>
              <p className="solutions-header-desc">
                Dirancang presisi dengan arsitektur cloud berkecepatan tinggi, keamanan mutlak, dan desain antarmuka modern.
              </p>
            </div>
            <a href="/services.html" className="editorial-see-all-btn">
              <span>Jelajahi Semua Layanan</span>
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="solutions-filter-pills-row">
            {filterCategories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                className={`solution-filter-pill-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Creative Interactive Solution Cards Grid */}
          <div className="creative-solutions-grid">
            {displayedSolutions.map((item, idx) => (
              <div
                key={item.id}
                className={`creative-card reveal reveal-slide-up delay-${(idx + 1) * 100} ${
                  servicesVisible ? 'in-view' : ''
                }`}
              >
                {/* Card Image Banner */}
                <div className="creative-card-media">
                  <img src={item.image} alt={item.title} className="creative-card-img" />
                  <div className="media-overlay-gradient"></div>

                  <div className="media-top-badges">
                    <span className="creative-tag-pill">{item.tag}</span>
                    <div className="rating-pill">
                      <Star size={11} fill="#e53e3e" color="#e53e3e" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <div className="media-bottom-price">
                    <span className="media-price-text">{item.price}</span>
                    <span className="media-price-sub">{item.priceSubtitle}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="creative-card-body">
                  <div className="card-identity-row">
                    <div className="creative-icon-circle">{item.icon}</div>
                    <div>
                      <span className="creative-cat-name">{item.category}</span>
                      <h3 className="creative-card-title">{item.title}</h3>
                    </div>
                  </div>

                  <p className="creative-card-desc">{item.desc}</p>

                  {/* Micro Tech Badges */}
                  <div className="micro-badges-row">
                    {item.badges.map((badge, bIdx) => (
                      <span key={bIdx} className="micro-badge">
                        <Zap size={11} className="text-red" />
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Feature Bullet Points */}
                  <div className="creative-features-list">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="creative-feature-item">
                        <CheckCircle2 size={14} className="text-red flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link Button */}
                  <div className="creative-card-action">
                    <a
                      href={`https://wa.me/6281234567890?text=${encodeURIComponent(item.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="creative-cta-btn"
                    >
                      <span>Konsultasikan Solusi Ini</span>
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Assurance Highlights Strip */}
          <div className="creative-assurance-strip">
            <div className="assurance-box">
              <ShieldCheck size={22} className="text-red" />
              <div>
                <strong>Garansi Bebas Bug</strong>
                <p>3 bulan pendampingan purna jual gratis</p>
              </div>
            </div>
            <div className="assurance-divider"></div>
            <div className="assurance-box">
              <Zap size={22} className="text-red" />
              <div>
                <strong>Audit Lighthouse 95+</strong>
                <p>Kecepatan akses kilat dan ramah SEO</p>
              </div>
            </div>
            <div className="assurance-divider"></div>
            <div className="assurance-box">
              <Sparkles size={22} className="text-red" />
              <div>
                <strong>Infrastruktur Cloud SSL</strong>
                <p>Server stabil dan aman dari serangan malware</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RECENT PORTFOLIO SHOWCASE --- */}
      <section
        ref={portfolioRef as React.RefObject<HTMLDivElement>}
        className={`section portfolio-preview-section reveal reveal-fade ${
          portfolioVisible ? 'in-view' : ''
        }`}
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

      {/* --- NEWS & ACTIVITIES SUMMARY SECTION (NEW!) --- */}
      <section
        ref={newsRef as React.RefObject<HTMLDivElement>}
        className={`section home-news-section reveal reveal-fade ${
          newsVisible ? 'in-view' : ''
        }`}
      >
        <div className="container">
          <div className="editorial-section-header">
            <div>
              <span className="editorial-mini-tag">AKTIVITAS &amp; WAWASAN</span>
              <h2 className="editorial-section-h2">Kabar &amp; Artikel Terbaru</h2>
            </div>
            <a href="/news.html" className="editorial-see-all-btn">
              <span>Lihat Semua Berita</span>
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="home-news-grid">
            {recentNews.map((news, idx) => (
              <div
                key={news.id || idx}
                className={`card-glass home-news-card reveal reveal-slide-up delay-${(idx + 1) * 100} ${
                  newsVisible ? 'in-view' : ''
                }`}
                onClick={() => {
                  window.location.href = `/news-detail.html?id=${news.id}`;
                }}
              >
                <div className="home-news-thumb-box">
                  <img src={news.image_url} alt={news.title} className="home-news-img" />
                  <span className={`home-news-category-badge ${getCategoryBadgeClass(news.category)}`}>
                    {news.category || 'Berita'}
                  </span>
                </div>

                <div className="home-news-content">
                  <div className="home-news-meta">
                    <Calendar size={13} className="text-red" />
                    <span>{formatDate(news.date)}</span>
                  </div>

                  <h3 className="home-news-title">{news.title}</h3>
                  <p className="home-news-desc">{news.short_desc}</p>

                  <div className="home-news-read-more">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VALUE & STORY BANNER (Pomaii Guide Style) --- */}
      <section
        ref={guideRef as React.RefObject<HTMLDivElement>}
        className={`section guide-story-section reveal reveal-fade ${
          guideVisible ? 'in-view' : ''
        }`}
      >
        <div className="container">
          <div className="guide-card-container">
            <div className="guide-text-col">
              <span className="guide-mini-tag">STANDAR REKAYASA KAMI</span>
              <h3 className="guide-heading">Mengapa Mitra Bisnis Memilih Berdikari?</h3>
              <p className="guide-desc">
                Kami membangun sistem digital bukan sekadar baris kode, melainkan aset bernilai tinggi dengan kecepatan maksimal, keamanan terproteksi, dan garansi penuh tanpa biaya tersembunyi.
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
                  <h4>Sertifikat SSL &amp; Proteksi Cloud</h4>
                  <p>Infrastruktur terisolasi, enkripsi data, dan backup berkala otomatis.</p>
                  <span className="mini-card-meta">2 menit baca</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING & RATIONAL COMPARISON SECTION --- */}
      <section
        ref={calcRef as React.RefObject<HTMLDivElement>}
        className={`section pricing-section reveal reveal-fade ${
          calcVisible ? 'in-view' : ''
        }`}
      >
        <div className="container">
          <div className="section-title">
            <span className="editorial-mini-tag">INVESTASI TRANSPARAN</span>
            <h2>Penawaran Harga &amp; Nilai Layanan Rasional</h2>
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
                    <span style={{ fontSize: '0.7rem', background: '#e2e8f0', color: '#334155', padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase', fontWeight: 'bold' }}>Hemat &amp; Praktis</span>
                    <h3 style={{ fontSize: '1.2rem', margin: '2px 0 0 0', fontWeight: 700 }}>Web Starter (UMKM)</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Cocok untuk UMKM, Landing Page Promosi, &amp; Profil Bisnis Online.</p>

                <div style={{ margin: '20px 0', padding: '16px', background: 'rgba(248, 250, 252, 0.8)', borderRadius: '10px', borderLeft: '3px solid var(--primary)' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Biaya Awal</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>Rp 499.000</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>+ Maintenance: Mulai Rp 50.000/bln</div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Gratis Hosting Cloud &amp; SSL Terkelola</li>
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
                    <h3 style={{ fontSize: '1.2rem', margin: '2px 0 0 0', fontWeight: 700 }}>Web Kustom &amp; System</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Company Profile, E-Commerce, &amp; Dashboard Manajemen Data Kustom.</p>

                <div style={{ margin: '20px 0', padding: '16px', background: '#ffffff', borderRadius: '10px', borderLeft: '3px solid var(--primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Biaya Awal</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>Rp 1.500.000</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>Opsional Maintenance: Rp 100.000/bln</div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Gratis Domain (.com/.id) &amp; SSL 1 Tahun</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Speed Ultra Kencang (Lighthouse 90+)</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Garansi Bug-Free &amp; Support Eksklusif</li>
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
                    <h3 style={{ fontSize: '1.2rem', margin: '2px 0 0 0', fontWeight: 700 }}>Mobile App &amp; AI</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Aplikasi Android/iOS Kustom &amp; Chatbot AI Cerdas Bisnis.</p>

                <div style={{ margin: '20px 0', padding: '16px', background: 'rgba(248, 250, 252, 0.8)', borderRadius: '10px', borderLeft: '3px solid var(--primary)' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Biaya Awal</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>Rp 3.500.000</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>Opsional Maintenance: SLA</div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Single Codebase Flutter / React Native</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Integrasi AI Chatbot &amp; Agent n8n</li>
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
                  <td style={{ fontWeight: 600 }}>Perawatan &amp; Server Down</td>
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
                  <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>SSL &amp; patching selalu diperbarui otomatis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- SPECIAL OFFER BANNER (Curved Red Banner) --- */}
      <section className="section promo-banner-section">
        <div className="container">
          <div className="promo-curved-banner">
            <div className="promo-banner-content">
              <span className="promo-badge-tag">PENAWARAN SPESIAL</span>
              <h2 className="promo-banner-title">Wujudkan Transformasi Digital Anda Hari Ini</h2>
              <p className="promo-banner-desc">
                Konsultasikan ide bisnis Anda bersama kami. Dapatkan arsitektur sistem awal, estimasi biaya transparan, dan jaminan purna jual tanpa komitmen rumit.
              </p>
              <a href="/contact.html" className="btn-promo-action">
                <span>Mulai Konsultasi Gratis</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST STATS ROW (NO EMOJIS) --- */}
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
              <span className="stats-number text-red">99.2%</span>
              <span className="stats-subtext">Tingkat Kepuasan</span>
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
        /* ===== Section Headers ===== */
        .editorial-section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 36px;
          text-align: left;
        }

        .solutions-header-wrap {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 28px;
          text-align: left;
        }

        .solutions-header-text {
          max-width: 650px;
        }

        .solutions-header-desc {
          color: #64748b;
          font-size: 0.95rem;
          margin-top: 8px;
          line-height: 1.6;
        }

        .editorial-mini-tag {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 6px;
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
          flex-shrink: 0;
        }

        .editorial-see-all-btn:hover {
          transform: translateX(4px);
        }

        /* ===== Solutions Filter Pills ===== */
        .solutions-filter-pills-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }

        .solution-filter-pill-btn {
          border: 1px solid var(--border);
          background: #ffffff;
          color: #475569;
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .solution-filter-pill-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: #fff5f5;
        }

        .solution-filter-pill-btn.active {
          background: var(--primary);
          border-color: var(--primary);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(229, 62, 62, 0.28);
        }

        /* ===== Creative Solutions Grid ===== */
        .creative-solutions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-bottom: 36px;
        }

        @media (max-width: 900px) {
          .creative-solutions-grid {
            grid-template-columns: 1fr;
          }
        }

        .creative-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          text-align: left;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .creative-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(229, 62, 62, 0.08);
          border-color: rgba(229, 62, 62, 0.3);
        }

        .creative-card-media {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #f1f5f9;
        }

        .creative-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .creative-card:hover .creative-card-img {
          transform: scale(1.05);
        }

        .media-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.3) 0%, rgba(15, 23, 42, 0.75) 100%);
        }

        .media-top-badges {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
        }

        .creative-tag-pill {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(6px);
          color: var(--primary);
          font-size: 0.72rem;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .rating-pill {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(6px);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .media-bottom-price {
          position: absolute;
          bottom: 14px;
          left: 16px;
          z-index: 2;
          display: flex;
          flex-direction: column;
        }

        .media-price-text {
          font-size: 1.35rem;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        .media-price-sub {
          font-size: 0.75rem;
          color: #cbd5e1;
          font-weight: 600;
        }

        .creative-card-body {
          padding: 26px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-identity-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 12px;
        }

        .creative-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: #fff5f5;
          border: 1px solid rgba(229, 62, 62, 0.16);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .creative-card:hover .creative-icon-circle {
          transform: scale(1.08) rotate(3deg);
          background: var(--primary);
          color: #ffffff;
        }

        .creative-cat-name {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
        }

        .creative-card-title {
          font-size: 1.22rem;
          font-weight: 800;
          color: #0f172a;
          margin: 2px 0 0 0;
          line-height: 1.3;
        }

        .creative-card-desc {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.55;
          margin: 0 0 16px 0;
        }

        .micro-badges-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }

        .micro-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #334155;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .creative-features-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
          padding: 14px 0;
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
        }

        .creative-feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #475569;
        }

        .creative-card-action {
          margin-top: auto;
        }

        .creative-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: #0f172a;
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
          transition: all 0.25s ease;
        }

        .creative-cta-btn:hover {
          background: var(--primary);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(229, 62, 62, 0.25);
        }

        /* ===== Assurance Strip ===== */
        .creative-assurance-strip {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 20px 32px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
        }

        @media (max-width: 768px) {
          .creative-assurance-strip {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
            padding: 20px;
          }
          .assurance-divider {
            display: none;
          }
        }

        .assurance-box {
          display: flex;
          align-items: center;
          gap: 14px;
          text-align: left;
        }

        .assurance-box strong {
          font-size: 0.9rem;
          color: #0f172a;
          display: block;
        }

        .assurance-box p {
          font-size: 0.78rem;
          color: #64748b;
          margin: 0;
        }

        .assurance-divider {
          width: 1px;
          height: 32px;
          background: #e2e8f0;
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

        /* ===== Home News Summary Styles ===== */
        .home-news-section {
          background: #f8fafc;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .home-news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
        }

        @media (max-width: 991px) {
          .home-news-grid {
            grid-template-columns: 1fr;
          }
        }

        .home-news-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .home-news-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
          border-color: rgba(229, 62, 62, 0.3);
        }

        .home-news-thumb-box {
          position: relative;
          height: 190px;
          overflow: hidden;
          background: #f1f5f9;
        }

        .home-news-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .home-news-card:hover .home-news-img {
          transform: scale(1.06);
        }

        .home-news-category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .cat-badge-rilis {
          background: #10b850;
        }

        .cat-badge-kegiatan {
          background: var(--primary);
        }

        .cat-badge-pengumuman {
          background: #f59e0b;
        }

        .cat-badge-berita {
          background: #3b82f6;
        }

        .home-news-content {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .home-news-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .home-news-title {
          font-size: 1.12rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.35;
          margin: 0 0 10px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .home-news-desc {
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.5;
          margin: 0 0 18px 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .home-news-read-more {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--primary);
          transition: transform 0.2s ease;
        }

        .home-news-card:hover .home-news-read-more {
          transform: translateX(4px);
        }

        /* ===== Guide & Story Banner ===== */
        .guide-story-section {
          background-color: #ffffff;
        }

        .guide-card-container {
          background: #f8fafc;
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
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 16px;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .guide-mini-card:hover {
          transform: translateX(4px);
          border-color: rgba(229, 62, 62, 0.3);
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

        /* ===== Promo Curved Banner ===== */
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

        /* ===== Bottom Trust Stats Row (NO EMOJIS) ===== */
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
