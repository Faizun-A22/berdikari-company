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

      {/* Pricing & Competitor Comparison Section */}
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

          <div className="pricing-comparison-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', margin: '0 auto 40px auto', maxWidth: '1100px' }}>
            
            {/* Card 1: Paket Starter & Langganan */}
            <div className="card-glass" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border)', background: '#ffffff' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(229, 62, 62, 0.08)', color: 'var(--primary)' }}>
                    <Globe size={24} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', background: '#e2e8f0', color: '#334155', padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase', fontWeight: 'bold' }}>Hemat & Praktis</span>
                    <h3 style={{ fontSize: '1.25rem', margin: '2px 0 0 0', fontWeight: '700' }}>Web Starter & Langganan</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Cocok untuk UMKM, Landing Page Promosi, & Web Instan hemat tanpa pusing maintenance.</p>
                
                <div style={{ margin: '20px 0', padding: '16px', background: 'rgba(248, 250, 252, 0.8)', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Biaya Pembuatan Awal</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>Rp 499.000</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: '600', marginTop: '4px' }}>+ Maintenance & Server: Mulai Rp 50.000 / bulan</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Operator 500rb Lain: Tanpa garansi, lepas tangan saat server mati / kena hack.</div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Gratis Hosting Cloud & SSL Terkelola</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Bebas Pusing Mati Server / Maintenance</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} className="text-red" /> Gratis Update Konten Ringan Setiap Bulan</li>
                </ul>
              </div>

              <a 
                href="https://wa.me/6281234567890?text=Halo%20Berdikari%20Digital%20Nusantara,%20saya%20tertarik%20dengan%20paket%20Web%20Starter%20Rp%20499rb%20%2B%20Langganan." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary w-full"
                style={{ textAlign: 'center', marginTop: '16px' }}
              >
                Pilih Paket Starter <ArrowRight size={16} />
              </a>
            </div>

            {/* Card 2: Custom Web & Professional */}
            <div className="card-glass glow-glow-card" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1.5px solid rgba(229, 62, 62, 0.3)', background: '#fffcfc' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', background: 'var(--primary)', color: '#ffffff' }}>
                    <Globe size={24} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', background: 'var(--primary)', color: '#fff', padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase', fontWeight: 'bold' }}>Paling Populer</span>
                    <h3 style={{ fontSize: '1.25rem', margin: '2px 0 0 0', fontWeight: '700' }}>Web Kustom & System</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Website Perusahaan, E-Commerce, & Sistem Manajemen Data Kustom Full Hak Milik.</p>
                
                <div style={{ margin: '20px 0', padding: '16px', background: '#ffffff', borderRadius: '8px', borderLeft: '3px solid var(--primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Investasi Jual Putus</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)', margin: '4px 0' }}>Rp 1.500.000</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Full Source Code & Sistem Milik Anda Sepenuhnya (Opsional Maintenance Rp 150rb/bln)</div>
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
            <div className="card-glass" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border)', background: '#ffffff' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(229, 62, 62, 0.08)', color: 'var(--primary)' }}>
                    <Smartphone size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: '700' }}>Mobile App & AI</h3>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Aplikasi Android/iOS Kustom & AI Automation Chatbot Cerdas Bisnis.</p>
                
                <div style={{ margin: '20px 0', padding: '16px', background: 'rgba(248, 250, 252, 0.8)', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>Investasi Mulai</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)', margin: '4px 0' }}>Rp 3.500.000</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Termasuk Integrasi API & Pendampingan Deployment</div>
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

          {/* Tabel Perbandingan Nilai Tambah / Operator Lain */}
          <div className="card-glass" style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto', background: '#fafbfc' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>Mengapa Model Langganan / Maintenance Kami Lebih Menguntungkan?</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '24px' }}>Perbandingan nyata antara Website Rp 500 Ribu Lepas Tangan vs Model Langganan Berdikari Digital Nusantara.</p>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', background: '#ffffff' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--text-primary)' }}>Faktor Penentu</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>Jasa Web 500 Ribu (Lepas Tangan)</th>
                    <th style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: 800 }}>Model Starter / Langganan BDN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '600' }}>Biaya Awal (Upfront)</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>Rp 500.000 (Bayar Lunas)</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: '600' }}>Hemat & Ringan (Rp 499.000 + Rp 50.000/bln)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '600' }}>Perawatan & Server Down</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>Bila error/mati, lepas tangan atau minta biaya baru lagi</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: '600' }}>Server selalu dipantau 24/7, gratis perbaikan & garansi aktif</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '600' }}>Update Konten & Tampilan</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>Harus edit sendiri / bayar joki lagi tiap kali ganti foto/teks</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: '600' }}>Gratis bantuan edit konten ringan tiap bulan</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', fontWeight: '600' }}>Keamanan & Malware</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>Mudah kena hacking / judi online karena tanpa update security</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: '600' }}>SSL & patching keamanan selalu diperbarui secara otomatis</td>
                  </tr>
                </tbody>
              </table>
            </div>
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

        .calculator-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px;
          text-align: left;
        }

        @media (max-width: 576px) {
          .calculator-container {
            padding: 20px;
          }
        }

        .calculator-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 40px;
        }

        @media (max-width: 991px) {
          .calculator-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .calc-group {
          margin-bottom: 28px;
        }

        .calc-label {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 12px;
          display: block;
        }

        .calc-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .calc-value-badge {
          background: rgba(229, 62, 62, 0.08);
          color: var(--primary);
          font-weight: 700;
          font-size: 0.85rem;
          padding: 4px 12px;
          border-radius: 100px;
        }

        .calc-select-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        @media (max-width: 576px) {
          .calc-select-grid {
            grid-template-columns: 1fr;
          }
        }

        .calc-select-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: #ffffff;
          cursor: pointer;
          color: var(--text-secondary);
          font-weight: 600;
          font-family: var(--font-heading);
          transition: all var(--transition-fast);
        }

        .calc-select-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: rgba(229, 62, 62, 0.01);
        }

        .calc-select-btn.active {
          border-color: var(--primary);
          background: rgba(229, 62, 62, 0.05);
          color: var(--primary);
          box-shadow: 0 4px 12px rgba(229, 62, 62, 0.06);
        }

        .calc-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #e2e8f0;
          outline: none;
          margin: 16px 0 8px;
        }

        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
          transition: transform 0.1s ease;
          box-shadow: 0 0 10px rgba(229, 62, 62, 0.3);
        }

        .calc-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .slider-limits {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .complexity-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .complexity-btn {
          padding: 16px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: #ffffff;
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .complexity-btn:hover {
          border-color: var(--primary);
        }

        .complexity-btn.active {
          border-color: var(--primary);
          background: rgba(229, 62, 62, 0.03);
          box-shadow: 0 4px 12px rgba(229, 62, 62, 0.04);
        }

        .complexity-btn strong {
          color: var(--text-primary);
          font-size: 0.95rem;
          font-weight: 700;
        }

        .complexity-btn.active strong {
          color: var(--primary);
        }

        .complexity-btn span {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .calculator-output {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px;
        }

        .output-header {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(229, 62, 62, 0.1);
          padding-bottom: 16px;
          margin-bottom: 24px;
        }

        .output-header h3 {
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .price-desc-small {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }

        .price-large-display {
          font-size: 2rem;
          color: var(--primary);
          font-weight: 900;
          font-family: var(--font-heading);
          margin-bottom: 30px;
          letter-spacing: -0.02em;
        }

        @media (max-width: 480px) {
          .price-large-display {
            font-size: 1.6rem;
          }
        }

        .output-details-list {
          list-style: none;
          margin-bottom: 36px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .output-details-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.875rem;
          color: var(--text-secondary);
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
