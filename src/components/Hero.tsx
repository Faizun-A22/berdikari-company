import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [heroBadge, setHeroBadge] = useState('TRANSFORMASI DIGITAL NUSANTARA');
  const [heroTitle, setHeroTitle] = useState(
    'Bangun Sistem Unggul. <br/><span class="hero-highlight-curve">Akselerasi Bisnis Anda.</span>'
  );
  const [heroDesc, setHeroDesc] = useState(
    'Solusi rekayasa perangkat lunak modern untuk website premium, aplikasi mobile multiplatform, dan kecerdasan buatan (AI) otomatisasi yang dirancang presisi untuk skala bisnis Anda.'
  );

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.hero_badge) setHeroBadge(data.hero_badge);
        if (data.hero_title) setHeroTitle(data.hero_title);
        if (data.hero_description) setHeroDesc(data.hero_description);
      })
      .catch((err) => console.error('Gagal mengambil config untuk Hero:', err));
  }, []);

  return (
    <section id="home" className="hero-editorial-section">
      {/* Background Graphic Wave Mask */}
      <div className="hero-bg-container">
        <div className="hero-gradient-canvas"></div>
        <div className="hero-curve-wave"></div>
      </div>

      <div className="container hero-editorial-container">
        {/* Top Text Content */}
        <div className="hero-editorial-content">
          <div className="editorial-badge-row">
            <span className="editorial-pill-badge">
              <span className="pill-dot"></span>
              {heroBadge}
            </span>
          </div>

          <h1
            className="editorial-main-title"
            dangerouslySetInnerHTML={{ __html: heroTitle }}
          ></h1>

          <p className="editorial-subtitle">{heroDesc}</p>

          <div className="editorial-cta-row">
            <a href="/contact.html" className="btn-pill-primary">
              <span>Konsultasi Sekarang</span>
              <div className="btn-icon-circle">
                <ArrowRight size={15} />
              </div>
            </a>
            <a href="/portfolio.html" className="btn-pill-outline">
              Lihat Karya &amp; Portofolio
            </a>
          </div>
        </div>
      </div>

      <style>{`
        /* ===== Hero Section Canvas (Clean & Spaced under Navbar) ===== */
        .hero-editorial-section {
          position: relative;
          padding-top: 36px;
          padding-bottom: 56px;
          background-color: #ffffff;
          overflow: hidden;
        }

        .hero-bg-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }

        .hero-gradient-canvas {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 85% 10%, rgba(229, 62, 62, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 15% 30%, rgba(229, 62, 62, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, #fffafa 0%, #ffffff 100%);
        }

        .hero-curve-wave {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 60px;
          background: #ffffff;
          border-top-left-radius: 50% 100%;
          border-top-right-radius: 50% 100%;
          transform: scaleX(1.3);
        }

        .hero-editorial-container {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-editorial-content {
          max-width: 900px;
          margin: 0 auto;
        }

        /* ===== Badge Pill ===== */
        .editorial-badge-row {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        .editorial-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(229, 62, 62, 0.06);
          border: 1px solid rgba(229, 62, 62, 0.18);
          color: var(--primary);
          padding: 6px 18px;
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .pill-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 8px var(--primary);
        }

        /* ===== Main Title ===== */
        .editorial-main-title {
          font-size: 3.4rem;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #0f172a;
          margin-bottom: 18px;
        }

        .hero-highlight-curve {
          position: relative;
          color: var(--primary);
          display: inline-block;
        }

        .hero-highlight-curve::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 3px;
          width: 100%;
          height: 8px;
          background: rgba(229, 62, 62, 0.12);
          border-radius: 6px;
          z-index: -1;
          transform: rotate(-1deg);
        }

        .editorial-subtitle {
          font-size: 1.05rem;
          line-height: 1.65;
          color: #475569;
          max-width: 720px;
          margin: 0 auto 32px auto;
        }

        /* ===== Buttons ===== */
        .editorial-cta-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-pill-primary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--primary);
          color: #ffffff;
          padding: 12px 14px 12px 28px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.95rem;
          box-shadow: 0 8px 24px rgba(229, 62, 62, 0.25);
          transition: all 0.25s ease;
        }

        .btn-pill-primary:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(229, 62, 62, 0.35);
        }

        .btn-icon-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .btn-pill-primary:hover .btn-icon-circle {
          transform: translateX(3px);
        }

        .btn-pill-outline {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          border-radius: 100px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          font-weight: 700;
          font-size: 0.95rem;
          transition: all 0.25s ease;
        }

        .btn-pill-outline:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: #fff5f5;
          transform: translateY(-2px);
        }

        /* ===== Responsive Queries ===== */
        @media (max-width: 991px) {
          .editorial-main-title {
            font-size: 2.85rem;
          }
        }

        @media (max-width: 768px) {
          .hero-editorial-section {
            padding-top: 24px;
            padding-bottom: 40px;
          }

          .editorial-main-title {
            font-size: 2.2rem;
          }

          .editorial-subtitle {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 576px) {
          .editorial-main-title {
            font-size: 1.9rem;
          }
        }
      `}</style>
    </section>
  );
}
