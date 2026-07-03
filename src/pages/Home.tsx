import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { ArrowRight, Globe, Smartphone, Palette, FolderKanban } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import NewsSection from '../components/NewsSection';

export default function Home() {
  const [servicesRef, servicesVisible] = useScrollReveal();
  const [portfolioRef, portfolioVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const [ctaTitle, setCtaTitle] = useState('Siap Memulai Transformasi Digital?');
  const [ctaDesc, setCtaDesc] = useState(
    'Konsultasikan ide aplikasi atau website Anda bersama tim konsultan ahli IT kami secara gratis. Dapatkan estimasi biaya dan rancangan proyek dalam waktu singkat.'
  );

  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);

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
    fetch('/api/portfolios')
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

    // Secret shortcut listener (Ctrl + Shift + A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        window.location.href = '/admin.html';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const featuredServices = [
    {
      icon: <Globe size={24} />,
      title: 'Web Development',
      description: 'Pembuatan website premium, e-commerce, and web application kompleks menggunakan teknologi modern.',
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Mobile Development',
      description: 'Pengembangan aplikasi mobile kustom untuk iOS dan Android dengan performa mulus.',
    },
    {
      icon: <Palette size={24} />,
      title: 'UI/UX Design',
      description: 'Desain pengalaman pengguna (UX) dan antarmuka (UI) yang estetis dan berorientasi pada konversi.',
    },
  ];



  return (
    <div className="home-page animate-fade-in">
      <Hero />

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
            <a href="/services.html" className="btn btn-secondary">
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

      {/* News & Activities Section */}
      <NewsSection />

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

        /* Portfolio Teaser */
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

        /* CTA block */
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
