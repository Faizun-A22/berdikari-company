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
          const cleanTitle = data.hero_title.replace(/<[^>]*>?/gm, ' ');
          setHeroTitle1(cleanTitle.substring(0, 30));
          setHeroTitle2(cleanTitle.substring(30) || 'Yang Menginspirasi & Berdaya');
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
              <Sparkles size={32} className="sun-sparkle-icon" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-description">{heroDesc}</p>

          {/* CTA Buttons */}
          <div className="hero-actions-row">
            <a href="#portfolio" className="btn-hero-primary">
              <span>Lihat Portofolio</span>
              <div className="btn-circle-arrow">
                <ArrowRight size={15} />
              </div>
            </a>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Berdikari%20Digital%20Nusantara,%20saya%20ingin%20konsultasi%20pembuatan%20website/sistem."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-secondary"
            >
              <div className="btn-wa-icon">
                <MessageSquare size={16} />
              </div>
              <span>Konsultasi WhatsApp</span>
            </a>
          </div>

          {/* Playful Handwritten Doodle Note with Arrow */}
          <div className="hero-doodle-note">
            <svg className="doodle-curve-arrow" width="46" height="34" viewBox="0 0 50 35" fill="none">
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

        {/* Right Column: Creative Visual with Organic Blob & Floating Badges */}
        <div className="hero-visual-col">
          <div className="hero-visual-stage">
            {/* Organic Soft Crimson/Coral Blob Background */}
            <div className="organic-blob-shape"></div>

            {/* Main Hero Photo: Smiling Professional Engineer / Specialist */}
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                alt="Berdikari Digital Specialist"
                className="hero-person-img"
              />
            </div>

            {/* Floating Badge 1: 8+ Years of Experience */}
            <div className="floating-badge badge-experience animate-float">
              <div className="badge-heart-icon">
                <Heart size={16} fill="#e53e3e" color="#e53e3e" />
              </div>
              <div className="badge-text-group">
                <strong className="badge-number">8+ Tahun</strong>
                <span className="badge-label">Pengalaman Industri</span>
              </div>
            </div>

            {/* Floating Badge 2: Coffee Mug Sticker */}
            <div className="floating-badge badge-coffee animate-float-delay-1">
              <div className="coffee-icon">☕</div>
              <div className="badge-text-group">
                <span className="badge-coffee-quote">
                  "Ide hebat bermula dari secangkir kopi hangat."
                </span>
              </div>
            </div>

            {/* Floating Badge 3: Lighthouse Speed 95+ */}
            <div className="floating-badge badge-speed animate-float-delay-2">
              <div className="badge-zap-icon">
                <Zap size={16} />
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
        /* ===== Hero Section Canvas ===== */
        .hero-creative-section {
          position: relative;
          padding-top: 140px;
          padding-bottom: 70px;
          background: #ffffff;
          overflow: hidden;
        }

        .hero-grid-container {
          display: grid;
          grid-template-columns: 1.15fr 0.95fr;
          gap: 40px;
          align-items: center;
        }

        /* ===== Left Text Column ===== */
        .hero-text-col {
          text-align: left;
          max-width: 620px;
          z-index: 10;
        }

        .hero-badge-wrap {
          margin-bottom: 20px;
        }

        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff1f2;
          border: 1px solid #fecdd3;
          color: var(--primary);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .hero-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
        }

        .hero-headline {
          font-size: 3.35rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.16;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
        }

        .hero-cursive-highlight {
          font-family: var(--font-cursive);
          font-size: 1.18em;
          color: var(--primary);
          display: inline-block;
          font-weight: 700;
          position: relative;
          line-height: 1;
        }

        .sun-sparkle-icon {
          color: #f59e0b;
          margin-left: 10px;
          vertical-align: middle;
          animation: sparkleGlow 3s ease-in-out infinite;
        }

        @keyframes sparkleGlow {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.15) rotate(15deg); opacity: 0.85; }
        }

        .hero-description {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.68;
          margin-bottom: 32px;
          max-width: 540px;
        }

        /* ===== Hero Action Buttons ===== */
        .hero-actions-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--primary);
          color: #ffffff;
          padding: 13px 16px 13px 26px;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(229, 62, 62, 0.28);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-hero-primary:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(229, 62, 62, 0.38);
        }

        .btn-circle-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .btn-hero-primary:hover .btn-circle-arrow {
          transform: translateX(4px);
        }

        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          color: #1e293b;
          padding: 13px 24px;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
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
          gap: 12px;
        }

        .doodle-curve-arrow {
          flex-shrink: 0;
        }

        .doodle-note-text {
          font-family: var(--font-cursive);
          font-size: 1.25rem;
          font-weight: 700;
          color: #334155;
          line-height: 1.2;
        }

        /* ===== Right Column: Visual Stage ===== */
        .hero-visual-col {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .hero-visual-stage {
          position: relative;
          width: 100%;
          max-width: 480px;
          height: 480px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Organic Smooth Crimson/Coral Blob */
        .organic-blob-shape {
          position: absolute;
          width: 440px;
          height: 440px;
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%);
          border-radius: 60% 40% 70% 30% / 40% 50% 60% 50%;
          animation: morphBlob 14s ease-in-out infinite alternate;
          z-index: 1;
          box-shadow: 0 20px 60px rgba(229, 62, 62, 0.12);
        }

        @keyframes morphBlob {
          0% {
            border-radius: 60% 40% 70% 30% / 40% 50% 60% 50%;
          }
          50% {
            border-radius: 40% 60% 35% 65% / 60% 40% 70% 30%;
          }
          100% {
            border-radius: 50% 50% 40% 60% / 45% 55% 50% 50%;
          }
        }

        .hero-image-wrapper {
          position: relative;
          width: 380px;
          height: 420px;
          border-radius: 36px;
          overflow: hidden;
          z-index: 2;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.1);
          border: 4px solid #ffffff;
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

        /* ===== Floating Badges ===== */
        .floating-badge {
          position: absolute;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(229, 62, 62, 0.15);
          border-radius: 18px;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
          z-index: 3;
        }

        /* Badge 1: Experience (Top Right) */
        .badge-experience {
          top: 20px;
          right: -15px;
        }

        .badge-heart-icon {
          width: 34px;
          height: 34px;
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
          font-size: 1.15rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
        }

        .badge-label {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 700;
        }

        /* Badge 2: Coffee (Bottom Center/Left) */
        .badge-coffee {
          bottom: 25px;
          left: -20px;
          max-width: 230px;
        }

        .coffee-icon {
          font-size: 1.5rem;
        }

        .badge-coffee-quote {
          font-family: var(--font-cursive);
          font-size: 1rem;
          font-weight: 700;
          color: #334155;
          line-height: 1.25;
        }

        /* Badge 3: Speed (Bottom Right) */
        .badge-speed {
          bottom: -15px;
          right: 10px;
        }

        .badge-zap-icon {
          width: 32px;
          height: 32px;
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
            padding-top: 110px;
            padding-bottom: 50px;
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
            max-width: 400px;
            height: 400px;
          }

          .organic-blob-shape {
            width: 360px;
            height: 360px;
          }

          .hero-image-wrapper {
            width: 300px;
            height: 350px;
          }

          .badge-experience {
            right: 0;
            top: 10px;
          }

          .badge-coffee {
            left: 0;
          }
        }

        @media (max-width: 576px) {
          .hero-headline {
            font-size: 2.2rem;
          }

          .hero-visual-stage {
            max-width: 320px;
            height: 320px;
          }

          .organic-blob-shape {
            width: 280px;
            height: 280px;
          }

          .hero-image-wrapper {
            width: 240px;
            height: 280px;
          }

          .floating-badge {
            padding: 8px 12px;
          }

          .badge-number {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
}
