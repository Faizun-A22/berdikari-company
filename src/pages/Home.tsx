import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { ArrowRight, Globe, Smartphone, FolderKanban, Brain, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Home() {
  const [servicesRef, servicesVisible] = useScrollReveal();
  const [portfolioRef, portfolioVisible] = useScrollReveal();
  const [calcRef, calcVisible] = useScrollReveal();
  const [faqRef, faqVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const [ctaTitle, setCtaTitle] = useState('Siap Memulai Transformasi Digital?');
  const [ctaDesc, setCtaDesc] = useState(
    'Konsultasikan ide produk digital atau sistem Anda bersama tim ahli kami secara gratis. Dapatkan estimasi biaya dan rancangan proyek dalam waktu singkat.'
  );

  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    // Fetch configs
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.cta_title) setCtaTitle(data.cta_title);
        if (data.cta_description) setCtaDesc(data.cta_description);
      })
      .catch(err => console.error('Gagal mengambil config untuk CTA:', err));

    // Fetch portfolios for featured items (take first 2)
    fetch('/api/portfolios?t=' + Date.now())
      .then(res => res.json())
      .then(data => {
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
      .catch(err => console.error('Gagal mengambil data portfolio untuk homepage:', err));
  }, []);

  const featuredServices = [
    {
      icon: <Globe size={24} />,
      title: 'Web Development',
      description: 'Pembuatan website premium, e-commerce, dan web application kompleks menggunakan teknologi modern.',
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Mobile Development',
      description: 'Pengembangan aplikasi mobile kustom untuk iOS dan Android dengan performa mulus.',
    },
    {
      icon: <Brain size={24} />,
      title: 'AI Otomatisasi',
      description: 'Otomatisasi bisnis pintar dengan mengintegrasikan chatbot, agen pintar, dan LLM canggih.',
    },
  ];

  const faqList = [
    {
      q: 'Apa itu Berdikari Digital Nusantara?',
      a: 'Berdikari Digital Nusantara adalah perusahaan rekayasa perangkat lunak premium yang fokus pada pembuatan website kustom, mobile app, sistem kecerdasan buatan (AI) otomatisasi, serta produk digital siap guna berkualitas tinggi.'
    },
    {
      q: 'Bagaimana model pemesanan Produk Digital?',
      a: 'Anda dapat melihat pilihan produk digital melalui menu Layanan, memilih sub-layanan seperti Undangan Online, E-Book Premium, atau Langganan SaaS, lalu memesannya secara langsung melalui integrasi WhatsApp kami untuk tindak lanjut cepat.'
    },
    {
      q: 'Bagaimana metode pengerjaan proyek di Berdikari Digital Nusantara?',
      a: 'Kami menggunakan metode agile interaktif yang meliputi: Konsultasi & Analisis Kebutuhan, Pembuatan Prototipe Desain Figma, Pengodean Sistem, Quality Assurance (Audit Lighthouse 90+), Deployment ke Cloud Server, dan Garansi Bug-Free gratis 3 bulan.'
    },
    {
      q: 'Bagaimana penentuan biaya investasi proyek?',
      a: 'Penentuan biaya investasi kami sangat transparan dan rasional berdasarkan kebutuhan modul, performa sistem, serta skala fitur. Silakan lihat paket penawaran dan perbandingan rasional kami di atas.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => prev === index ? null : index);
  };

  return (
    <div className="home-page animate-fade-in">
      <Hero />

      {/* --- TECH STACK RUNNING TICKER SECTION --- */}
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
            <span>LangChain</span>
            <span>n8n Automasi</span>
            <span>Figma Design</span>
            <span>AWS Server</span>
            <span>Supabase DB</span>
            {/* Duplication for infinite effect */}
            <span>React.js</span>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Flutter</span>
            <span>React Native</span>
            <span>Node.js</span>
            <span>Python</span>
            <span>OpenAI API</span>
            <span>LangChain</span>
            <span>n8n Automasi</span>
            <span>Figma Design</span>
            <span>AWS Server</span>
            <span>Supabase DB</span>
          </div>
        </div>
      </div>

      {/* Services Preview Section */}
      <section 
        ref={servicesRef as React.RefObject<HTMLDivElement>} 
        className={`home-services-teaser section reveal reveal-fade ${servicesVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="section-title">
            <h2>Layanan Utama Kami</h2>
            <p>Solusi teknologi modern yang dirancang khusus untuk mendukung akselerasi bisnis Anda.</p>
            <div className="accent-bar"></div>
          </div>

          <div className="teaser-grid">
            {featuredServices.map((service, index) => (
              <div 
                key={index} 
                className={`card-glass teaser-card reveal reveal-slide-up delay-${(index + 1) * 100} ${servicesVisible ? 'in-view' : ''}`}
              >
                <div className="teaser-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>

          <div className="teaser-action">
            <a href="/services.html" className="btn btn-secondary animate-float">
              Lihat Seluruh Layanan <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section 
        ref={portfolioRef as React.RefObject<HTMLDivElement>} 
        className={`home-portfolio-teaser section reveal reveal-fade ${portfolioVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="section-title">
            <h2>Karya Terbaru</h2>
            <p>Intip beberapa proyek unggulan yang baru saja kami selesaikan dengan hasil memuaskan.</p>
            <div className="accent-bar"></div>
          </div>

          <div className="teaser-portfolio-grid">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`card-glass teaser-project-card reveal reveal-slide-up delay-${(index + 1) * 100} ${portfolioVisible ? 'in-view' : ''}`}
                onClick={() => {
                  window.location.href = `/portfolio-detail.html?slug=${encodeURIComponent(project.slug)}`;
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="teaser-project-img-box">
                  <img src={project.image} alt={project.title} className="teaser-project-img" />
                </div>
                <div className="teaser-project-info">
                  <span className="teaser-project-cat">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.shortDesc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="teaser-action">
            <a href="/portfolio.html" className="btn btn-primary">
              Lihat Semua Portofolio <FolderKanban size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing & Comparison Section */}
      <section 
        ref={calcRef as React.RefObject<HTMLDivElement>}
        className={`pricing-calculator-section section reveal reveal-fade ${calcVisible ? 'in-view' : ''}`}
        style={{ background: '#ffffff', borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <div className="section-title">
            <h2>Penawaran Harga & Nilai Layanan Transparan</h2>
            <p>Perbandingan rasional dan kompetitif investasi teknologi Anda bersama Berdikari Digital Nusantara.</p>
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
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '24px' }}>Perbandingan nyata antara jasa web Rp 500rb lain vs Model Starter Berdikari Digital Nusantara.</p>

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
                  <td style={{ color: '#64748b' }}>Mudah kena hack / judi online</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>SSL & patching selalu diperbarui otomatis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* FAQ Accordion Section */}
      <section 
        ref={faqRef as React.RefObject<HTMLDivElement>}
        className={`faq-section section reveal reveal-fade ${faqVisible ? 'in-view' : ''}`}
        style={{ background: '#f8fafc', borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <div className="section-title">
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

      {/* CTA Collaboration Section */}
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
        .teaser-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 48px;
        }

        @media (max-width: 991px) {
          .teaser-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .teaser-grid {
            grid-template-columns: 1fr;
          }
        }

        .teaser-card {
          text-align: left;
          padding: 32px;
        }

        .teaser-icon {
          width: 48px;
          height: 48px;
          background: rgba(229, 62, 62, 0.04);
          border: 1px solid rgba(229, 62, 62, 0.08);
          border-radius: 10px;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .teaser-card h3 {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .teaser-card p {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .teaser-action {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .home-portfolio-teaser {
          background-color: var(--bg-deep);
        }

        .teaser-portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          margin-bottom: 48px;
        }

        @media (max-width: 768px) {
          .teaser-portfolio-grid {
            grid-template-columns: 1fr;
          }
        }

        .teaser-project-card {
          padding: 0;
          overflow: hidden;
          text-align: left;
          display: flex;
          flex-direction: column;
        }

        .teaser-project-img-box {
          height: 240px;
          background-color: #f8fafc;
          border-bottom: 1px solid var(--border);
        }

        .teaser-project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .teaser-project-info {
          padding: 24px;
        }

        .teaser-project-cat {
          color: var(--primary);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          margin-bottom: 8px;
          display: inline-block;
        }

        .teaser-project-info h3 {
          font-size: 1.35rem;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .teaser-project-info p {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        /* Tech Ticker Styles */
        .tech-ticker-container {
          background: #ffffff;
          border-bottom: 1px solid var(--border);
          padding: 24px 0;
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
          font-size: 1.05rem;
          font-weight: 850;
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

        /* Pricing cards grid */
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
