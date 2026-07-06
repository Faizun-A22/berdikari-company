import { useState, useEffect } from 'react';
import { ArrowRight, Code, ShieldCheck, Zap, Award } from 'lucide-react';

export default function Hero() {
  const [heroBadge, setHeroBadge] = useState('Penyedia Layanan IT & Solusi Digital Premium');
  const [heroTitle, setHeroTitle] = useState('Transformasi Digital Bisnis Anda Bersama <span class="gradient-text-expert font-extra">Berdikari Digital Nusantara</span>');
  const [heroDesc, setHeroDesc] = useState(
    'Kami merancang website premium, aplikasi mobile, sistem AI otomatisasi cerdas, serta produk digital siap pakai untuk mengakselerasi pertumbuhan bisnis Anda secara mandiri.'
  );

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.hero_badge) setHeroBadge(data.hero_badge);
        if (data.hero_title) setHeroTitle(data.hero_title);
        if (data.hero_description) setHeroDesc(data.hero_description);
      })
      .catch(err => console.error('Gagal mengambil config untuk Hero:', err));
  }, []);

  const stats = [
    { icon: <Code className="text-red" size={20} />, value: '150+', label: 'Proyek Selesai' },
    { icon: <Zap className="text-red" size={20} />, value: '99.2%', label: 'Kepuasan Klien' },
    { icon: <ShieldCheck className="text-red" size={20} />, value: '5+', label: 'Tahun Pengalaman' },
    { icon: <Award className="text-red" size={20} />, value: '25+', label: 'Ahli IT Profesional' },
  ];

  return (
    <section id="home" className="hero-section">
      <div className="glow-orb hero-glow-1"></div>
      <div className="glow-orb hero-glow-2"></div>

      <div className="container hero-container">
        <div className="hero-content animate-fade-in-up">
          <div className="badge-wrapper">
            <span className="hero-badge">
              <span className="badge-dot"></span>
              {heroBadge}
            </span>
          </div>

          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: heroTitle }}></h1>

          <p className="hero-description">
            {heroDesc}
          </p>

          <div className="hero-actions">
            <a href="/contact.html" className="btn btn-primary">
              Konsultasi Gratis <ArrowRight size={18} />
            </a>
            <a href="/portfolio.html" className="btn btn-secondary">
              Lihat Portofolio
            </a>
          </div>
        </div>

        {/* Floating Stats Section */}
        <div className="hero-stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="card-glass stat-card">
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 120px;
          padding-bottom: 80px;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at 50% 0%, rgba(229, 62, 62, 0.03) 0%, var(--bg-dark) 80%);
        }

        .hero-glow-1 {
          top: -10%;
          left: 10%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.04) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .hero-glow-2 {
          bottom: 10%;
          right: 5%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.03) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 10;
          gap: 60px;
        }

        .hero-content {
          max-width: 860px;
        }

        .badge-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(229, 62, 62, 0.02);
          border: 1px solid rgba(229, 62, 62, 0.08);
          color: var(--text-primary);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background-color: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--primary);
          display: inline-block;
          animation: pulseGlow 2s infinite ease-in-out;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        .font-extra {
          font-weight: 900;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.25rem;
          }
        }

        .hero-description {
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
          line-height: 1.7;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .hero-description {
            font-size: 1rem;
          }
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* Stats Grid */
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          width: 100%;
          max-width: 1100px;
        }

        @media (max-width: 991px) {
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .hero-stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          text-align: left;
          border-radius: 12px;
        }

        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: rgba(229, 62, 62, 0.05);
          border: 1px solid rgba(229, 62, 62, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
}
