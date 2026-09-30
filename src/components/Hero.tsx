import { useState, useEffect } from 'react';
import { ArrowRight, Heart, Zap, Sparkles, MessageSquare } from 'lucide-react';

export default function Hero() {
  const [heroBadge, setHeroBadge] = useState('SOFTWARE HOUSE & KONSULTAN IT TERPERCAYA');
  const [heroTitle1, setHeroTitle1] = useState('Membangun Website & Sistem');
  const [heroTitle2, setHeroTitle2] = useState('Yang Menginspirasi & Berdaya');
  const [heroDesc, setHeroDesc] = useState(
    'Kami merancang website ultra-cepat, aplikasi mobile berkinerja tinggi, dan otomatisasi cerdas yang membantu bisnis Anda tampil percaya diri, profesional, dan melipatgandakan konversi penjualan.'
  );

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.hero_badge) setHeroBadge(data.hero_badge);
        if (data.hero_description) setHeroDesc(data.hero_description);
        if (data.hero_title) {
          const cleanTitle = data.hero_title.replace(/<[^>]*>?/gm, ' ').trim();
          const words = cleanTitle.split(/\s+/);
          if (words.length > 3) {
            const half = Math.ceil(words.length / 2);
            setHeroTitle1(words.slice(0, half).join(' '));
            setHeroTitle2(words.slice(half).join(' '));
          } else {
            setHeroTitle1(cleanTitle);
            setHeroTitle2('Yang Menginspirasi & Berdaya');
          }
        }
      })
      .catch((err) => console.error('Gagal mengambil config untuk Hero:', err));
  }, []);

  return (
    <section id="home" className="hero-creative-section">
      <div className="container hero-grid-container">
        {/* Left Column: Text & CTA */}
        <div className="hero-text-col">
          {/* Pill Badge */}
          <div className="hero-badge-wrap">
            <span className="hero-pill-badge">
              <span className="hero-badge-dot"></span>
              {heroBadge}
            </span>
          </div>

          {/* Punchy Headline */}
          <h1 className="hero-headline">
            {heroTitle1} <br />
            <span className="hero-cursive-highlight">
              {heroTitle2}
            </span>
            <span className="hero-sun-doodle" title="Kreatif & Bersinar">
              <Sparkles size={26} className="sun-sparkle-icon" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-description">{heroDesc}</p>

          {/* CTA Buttons */}
          <div className="hero-actions-row">
            <a href="/portfolio.html" className="btn-hero-primary">
              <span>Lihat Portofolio</span>
              <div className="btn-circle-arrow">
                <ArrowRight size={14} />
              </div>
            </a>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Berdikari%20Digital%20Nusantara,%20saya%20ingin%20konsultasi%20pembuatan%20website/sistem."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-secondary"
            >
              <div className="btn-wa-icon">
                <MessageSquare size={15} />
              </div>
              <span>Konsultasi WhatsApp</span>
            </a>
          </div>

          {/* Playful Handwritten Doodle Note with Arrow */}
          <div className="hero-doodle-note">
            <svg className="doodle-curve-arrow" width="38" height="26" viewBox="0 0 50 35" fill="none">
              <path
                d="M5 25C15 32 35 30 42 12M42 12L34 14M42 12L44 22"
                stroke="#e53e3e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="doodle-note-text">
              Mari wujudkan proyek digital impian Anda bersama kami!
            </span>
          </div>
        </div>

        {/* Right Column: Creative Visual with Compact Photo & Floating Badges */}
        <div className="hero-visual-col">
          <div className="hero-visual-stage">
            {/* Organic Soft Crimson/Coral Blob Background */}
            <div className="organic-blob-shape"></div>

            {/* Main Hero Photo: Compact & Proportional */}
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
                alt="Berdikari Digital Specialist"
                className="hero-person-img"
              />
            </div>

            {/* Floating Badge 1: 8+ Years of Experience */}
            <div className="floating-badge badge-experience animate-float">
              <div className="badge-heart-icon">
                <Heart size={14} fill="#e53e3e" color="#e53e3e" />
              </div>
              <div className="badge-text-group">
                <strong className="badge-number">8+ Tahun</strong>
                <span className="badge-label">Pengalaman Industri</span>
              </div>
            </div>

            {/* Floating Badge 2: Lighthouse Speed 95+ */}
            <div className="floating-badge badge-speed animate-float-delay-1">
              <div className="badge-zap-icon">
                <Zap size={14} />
              </div>
              <div className="badge-text-group">
                <strong className="badge-number">Skor 95+</strong>
                <span className="badge-label">Audit Kecepatan Kilat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ===== Hero Section Canvas (Tight & Proportional Spacing) ===== */
        .hero-creative-section {
          position: relative;
          padding-top: 96px !important;
          padding-bottom: 36px;
          background: #ffffff;
          overflow: hidden;
        }

        .hero-grid-container {
          display: grid;
          grid-template-columns: 1.25fr 0.85fr;
          gap: 32px;
          align-items: center;
        }

        /* ===== Left Text Column ===== */
        .hero-text-col {
          text-align: left;
          max-width: 620px;
          z-index: 10;
        }

        .hero-badge-wrap {
          margin-bottom: 10px;
        }

        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #fff1f2;
          border: 1px solid #fecdd3;
          color: var(--primary);
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
        }

        .hero-headline {
          font-size: 2.7rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin-bottom: 14px;
        }

        .hero-cursive-highlight {
          font-family: var(--font-cursive);
          font-size: 1.15em;
          color: var(--primary);
          display: inline-block;
          font-weight: 700;
          position: relative;
          line-height: 1;
        }

        .sun-sparkle-icon {
          color: #f59e0b;
          margin-left: 8px;
          vertical-align: middle;
          animation: sparkleGlow 3s ease-in-out infinite;
        }

        @keyframes sparkleGlow {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.15) rotate(15deg); opacity: 0.85; }
        }

        .hero-description {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.65;
          margin-bottom: 22px;
          max-width: 520px;
        }

        /* ===== Hero Action Buttons ===== */
        .hero-actions-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--primary);
          color: #ffffff;
          padding: 11px 14px 11px 22px;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(229, 62, 62, 0.25);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-hero-primary:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(229, 62, 62, 0.35);
        }

        .btn-circle-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .btn-hero-primary:hover .btn-circle-arrow {
          transform: translateX(3px);
        }

        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          color: #1e293b;
          padding: 11px 20px;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .btn-hero-secondary:hover {
          border-color: #22c55e;
          color: #166534;
          background: #f0fdf4;
          transform: translateY(-2px);
        }

        .btn-wa-icon {
          color: #22c55e;
          display: flex;
          align-items: center;
        }

        /* ===== Doodle Note ===== */
        .hero-doodle-note {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .doodle-curve-arrow {
          flex-shrink: 0;
        }

        .doodle-note-text {
          font-family: var(--font-cursive);
          font-size: 1.15rem;
          font-weight: 700;
          color: #334155;
          line-height: 1.2;
        }

        /* ===== Right Column: Compact Visual Stage ===== */
        .hero-visual-col {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .hero-visual-stage {
          position: relative;
          width: 100%;
          max-width: 360px;
          height: 290px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Organic Soft Crimson/Coral Blob */
        .organic-blob-shape {
          position: absolute;
          width: 310px;
          height: 270px;
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%);
          border-radius: 60% 40% 70% 30% / 40% 50% 60% 50%;
          animation: morphBlob 14s ease-in-out infinite alternate;
          z-index: 1;
          box-shadow: 0 14px 40px rgba(229, 62, 62, 0.1);
        }

        @keyframes morphBlob {
          0% { border-radius: 60% 40% 70% 30% / 40% 50% 60% 50%; }
          50% { border-radius: 40% 60% 35% 65% / 60% 40% 70% 30%; }
          100% { border-radius: 50% 50% 40% 60% / 45% 55% 50% 50%; }
        }

        .hero-image-wrapper {
          position: relative;
          width: 290px;
          height: 250px;
          border-radius: 22px;
          overflow: hidden;
          z-index: 2;
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
          border: 3px solid #ffffff;
        }

        .hero-person-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.5s ease;
        }

        .hero-visual-stage:hover .hero-person-img {
          transform: scale(1.04);
        }

        /* ===== Compact Floating Badges ===== */
        .floating-badge {
          position: absolute;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(229, 62, 62, 0.15);
          border-radius: 14px;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
          z-index: 3;
        }

        /* Badge 1: Experience (Top Right) */
        .badge-experience {
          top: -8px;
          right: -8px;
        }

        .badge-heart-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .badge-text-group {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .badge-number {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
        }

        .badge-label {
          font-size: 0.68rem;
          color: #64748b;
          font-weight: 700;
        }

        /* Badge 2: Speed (Bottom Left) */
        .badge-speed {
          bottom: -10px;
          left: -8px;
        }

        .badge-zap-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #fef08a;
          color: #b45309;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Responsive Breakpoints */
        @media (max-width: 991px) {
          .hero-creative-section {
            padding-top: 90px !important;
            padding-bottom: 30px;
          }

          .hero-grid-container {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-text-col {
            margin: 0 auto;
            text-align: center;
          }

          .hero-badge-wrap {
            display: flex;
            justify-content: center;
          }

          .hero-actions-row {
            justify-content: center;
          }

          .hero-doodle-note {
            justify-content: center;
          }

          .hero-visual-stage {
            max-width: 320px;
            height: 270px;
          }

          .organic-blob-shape {
            width: 280px;
            height: 250px;
          }

          .hero-image-wrapper {
            width: 260px;
            height: 230px;
          }

          .badge-experience {
            right: 0;
            top: -5px;
          }

          .badge-speed {
            left: 0;
            bottom: -5px;
          }
        }

        @media (max-width: 576px) {
          .hero-headline {
            font-size: 2.1rem;
          }

          .hero-visual-stage {
            max-width: 280px;
            height: 240px;
          }

          .organic-blob-shape {
            width: 250px;
            height: 220px;
          }

          .hero-image-wrapper {
            width: 230px;
            height: 200px;
          }

          .floating-badge {
            padding: 6px 10px;
          }

          .badge-number {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </section>
  );
}
