import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { ArrowRight, Globe, Smartphone, FolderKanban, Brain, Calculator, ShieldCheck, Heart, ChevronDown, ChevronUp } from 'lucide-react';
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

  // Kalkulator Estimasi Proyek States
  const [calcService, setCalcService] = useState<'web' | 'mobile' | 'ai' | 'undangan' | 'ebook'>('web');
  const [calcPages, setCalcPages] = useState<number>(3);
  const [calcComplexity, setCalcComplexity] = useState<'standard' | 'medium' | 'premium'>('standard');
  const [calcResult, setCalcResult] = useState<number>(0);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    // Calculate Project Estimate
    let base = 0;
    if (calcService === 'web') {
      base = 1500000;
      base += calcPages * 300000;
      if (calcComplexity === 'medium') base += 1200000;
      if (calcComplexity === 'premium') base += 3500000;
    } else if (calcService === 'mobile') {
      base = 4500000;
      base += calcPages * 500000;
      if (calcComplexity === 'medium') base += 2500000;
      if (calcComplexity === 'premium') base += 6500000;
    } else if (calcService === 'ai') {
      base = 3500000;
      if (calcComplexity === 'medium') base += 2500000;
      if (calcComplexity === 'premium') base += 7500000;
    } else if (calcService === 'undangan') {
      base = 99000;
      if (calcComplexity === 'medium') base += 50000;
      if (calcComplexity === 'premium') base += 150000;
    } else if (calcService === 'ebook') {
      base = 49000;
      if (calcComplexity === 'medium') base += 20000;
      if (calcComplexity === 'premium') base += 50000;
    }
    setCalcResult(base);
  }, [calcService, calcPages, calcComplexity]);

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
      q: 'Apakah harga di kalkulator estimasi di atas bersifat mutlak?',
      a: 'Harga di kalkulator estimasi bersifat perkiraan awal berdasarkan benchmark industri standar. Harga final bisa lebih rendah atau menyesuaikan kebutuhan modul spesifik Anda setelah sesi diskusi bersama tim analis kami.'
    }
  ];

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const getCalcWhatsAppLink = () => {
    const serviceName = 
      calcService === 'web' ? 'Website Development' :
      calcService === 'mobile' ? 'Mobile App Development' :
      calcService === 'ai' ? 'AI Otomatisasi & Chatbot' :
      calcService === 'undangan' ? 'Undangan Digital' : 'E-Book Premium';

    const complexityText = calcComplexity === 'standard' ? 'Sederhana / Standar' : calcComplexity === 'medium' ? 'Menengah' : 'Kompleks / Premium';
    const detailText = calcService === 'web' || calcService === 'mobile' ? ` dengan estimasi halaman: ${calcPages}` : '';
    const text = `Halo Berdikari Digital Nusantara, saya ingin bertanya tentang perkiraan biaya layanan:\n- Layanan: ${serviceName}\n- Kompleksitas: ${complexityText}${detailText}\n- Estimasi Harga: ${formatRupiah(calcResult)}\n\nMohon informasi tindak lanjutnya, terima kasih.`;
    
    return `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
  };

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

      {/* Pricing Calculator Section */}
      <section 
        ref={calcRef as React.RefObject<HTMLDivElement>}
        className={`pricing-calculator-section section reveal reveal-fade ${calcVisible ? 'in-view' : ''}`}
        style={{ background: '#ffffff', borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <div className="section-title">
            <h2>Kalkulator Estimasi Proyek</h2>
            <p>Dapatkan gambaran kasar nilai investasi produk digital Anda secara instan dan interaktif.</p>
            <div className="accent-bar"></div>
          </div>

          <div className="calculator-container card-glass custom-widget-card glow-glow-card animate-float-delay-1">
            <div className="calculator-grid">
              <div className="calculator-inputs">
                {/* Service Selector */}
                <div className="calc-group">
                  <label className="calc-label">Pilih Jenis Layanan / Produk:</label>
                  <div className="calc-select-grid">
                    <button 
                      className={`calc-select-btn ${calcService === 'web' ? 'active' : ''}`}
                      onClick={() => { setCalcService('web'); setCalcPages(3); }}
                    >
                      <Globe size={16} />
                      <span>Website / Web App</span>
                    </button>
                    <button 
                      className={`calc-select-btn ${calcService === 'mobile' ? 'active' : ''}`}
                      onClick={() => { setCalcService('mobile'); setCalcPages(5); }}
                    >
                      <Smartphone size={16} />
                      <span>Mobile App</span>
                    </button>
                    <button 
                      className={`calc-select-btn ${calcService === 'ai' ? 'active' : ''}`}
                      onClick={() => setCalcService('ai')}
                    >
                      <Brain size={16} />
                      <span>AI Otomatisasi</span>
                    </button>
                    <button 
                      className={`calc-select-btn ${calcService === 'undangan' ? 'active' : ''}`}
                      onClick={() => setCalcService('undangan')}
                    >
                      <Heart size={16} />
                      <span>Undangan Digital</span>
                    </button>
                    <button 
                      className={`calc-select-btn ${calcService === 'ebook' ? 'active' : ''}`}
                      onClick={() => setCalcService('ebook')}
                    >
                      <FolderKanban size={16} />
                      <span>E-Book Premium</span>
                    </button>
                  </div>
                </div>

                {/* Page Slider */}
                {(calcService === 'web' || calcService === 'mobile') && (
                  <div className="calc-group">
                    <div className="calc-label-row">
                      <label className="calc-label">Jumlah Halaman / Modul:</label>
                      <span className="calc-value-badge">{calcPages} Halaman</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="15" 
                      value={calcPages}
                      onChange={(e) => setCalcPages(parseInt(e.target.value))}
                      className="calc-slider"
                    />
                    <div className="slider-limits">
                      <span>1 Halaman</span>
                      <span>15 Halaman</span>
                    </div>
                  </div>
                )}

                {/* Complexity Options */}
                <div className="calc-group">
                  <label className="calc-label">Tingkat Kompleksitas Fitur:</label>
                  <div className="complexity-grid">
                    <button 
                      className={`complexity-btn ${calcComplexity === 'standard' ? 'active' : ''}`}
                      onClick={() => setCalcComplexity('standard')}
                    >
                      <strong>Standar</strong>
                      <span>Fitur dasar, desain informatif & modern</span>
                    </button>
                    <button 
                      className={`complexity-btn ${calcComplexity === 'medium' ? 'active' : ''}`}
                      onClick={() => setCalcComplexity('medium')}
                    >
                      <strong>Menengah</strong>
                      <span>Ada integrasi database, manajemen data, responsif ekstra</span>
                    </button>
                    <button 
                      className={`complexity-btn ${calcComplexity === 'premium' ? 'active' : ''}`}
                      onClick={() => setCalcComplexity('premium')}
                    >
                      <strong>Premium / Custom</strong>
                      <span>Desain kustom Figma, integrasi API, performa skala besar</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Calculator Output */}
              <div className="calculator-output card-glass" style={{ border: '1.5px dashed var(--primary-glow-intense)', background: '#fff9f9' }}>
                <div className="output-header">
                  <Calculator className="text-red animate-float-delay-2" size={28} />
                  <h3>Perkiraan Investasi</h3>
                </div>
                <div className="output-body">
                  <p className="price-desc-small">Biaya pengembangan diestimasi sebesar:</p>
                  <h2 className="price-large-display">{formatRupiah(calcResult)}</h2>
                  
                  <ul className="output-details-list">
                    <li><ShieldCheck size={16} className="text-red" /> <span>Desain UI/UX eksklusif kustom</span></li>
                    <li><ShieldCheck size={16} className="text-red" /> <span>Gratis domain & SSL selama 1 tahun</span></li>
                    <li><ShieldCheck size={16} className="text-red" /> <span>Garansi bug-free pemeliharaan 3 bulan</span></li>
                  </ul>
                </div>
                
                <a 
                  href={getCalcWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                  style={{ gap: '10px', padding: '16px 20px', borderRadius: '10px' }}
                >
                  Konsultasikan Hasil Estimasi Ini <ArrowRight size={18} />
                </a>
              </div>
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
