import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Code,
  ShieldCheck,
  Zap,
  Award,
  Star,
  TrendingUp,
  CheckCircle2,
  Globe,
  Smartphone,
  Cpu,
} from 'lucide-react';

function useCountUp(target: number, duration = 2000, decimals = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, decimals]);

  return value;
}

export default function Hero() {
  const [heroBadge, setHeroBadge] = useState('Penyedia Layanan IT & Solusi Digital Premium');
  const [heroTitle, setHeroTitle] = useState(
    'Transformasi Digital Bisnis Anda Bersama <span class="gradient-text-expert font-extra">Berdikari Digital Nusantara</span>'
  );
  const [heroDesc, setHeroDesc] = useState(
    'Kami merancang website premium, aplikasi mobile, sistem AI otomatisasi cerdas, serta produk digital siap pakai untuk mengakselerasi pertumbuhan bisnis Anda secara mandiri.'
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

  const countProyek = useCountUp(150, 2000, 0);
  const countKepuasan = useCountUp(99.2, 2200, 1);
  const countTahun = useCountUp(5, 1800, 0);
  const countAhli = useCountUp(25, 2000, 0);

  const stats = [
    { icon: <Code className="text-red" size={20} />, value: '150+', label: 'Proyek Selesai', display: `${countProyek}+` },
    { icon: <Zap className="text-red" size={20} />, value: '99.2%', label: 'Kepuasan Klien', display: `${countKepuasan}%` },
    { icon: <ShieldCheck className="text-red" size={20} />, value: '5+', label: 'Tahun Pengalaman', display: `${countTahun}+` },
    { icon: <Award className="text-red" size={20} />, value: '25+', label: 'Ahli IT Profesional', display: `${countAhli}+` },
  ];

  return (
    <section id="home" className="hero-section">
      {/* Dynamic Ambient Background Glows */}
      <div className="hero-glow-orb hero-glow-1"></div>
      <div className="hero-glow-orb hero-glow-2"></div>
      <div className="hero-glow-orb hero-glow-3"></div>

      {/* Floating Animated Geometric Chips */}
      <div className="ambient-shape shape-1" aria-hidden="true" />
      <div className="ambient-shape shape-2" aria-hidden="true" />
      <div className="ambient-shape shape-3" aria-hidden="true" />

      <div className="container hero-container">
        {/* Main Header Content */}
        <div className="hero-content">
          {/* Animated Badge */}
          <div className="badge-wrapper hero-stagger hero-stagger-1">
            <span className="hero-badge">
              <span className="badge-dot"></span>
              {heroBadge}
            </span>
          </div>

          {/* Heading */}
          <h1
            className="hero-title hero-stagger hero-stagger-2"
            dangerouslySetInnerHTML={{ __html: heroTitle }}
          ></h1>

          {/* Subtitle */}
          <p className="hero-description hero-stagger hero-stagger-3">
            {heroDesc}
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions hero-stagger hero-stagger-4">
            <a href="/contact.html" className="btn btn-primary hero-btn-cta">
              <span>Konsultasi Gratis</span>
              <ArrowRight size={18} className="btn-arrow" />
            </a>
            <a href="/portfolio.html" className="btn btn-secondary hero-btn-secondary">
              Lihat Portofolio
            </a>
          </div>
        </div>

        {/* Lightweight Floating Feature Showcase (Modern Pinterest/Camplify Style without Phone Frame) */}
        <div className="hero-floating-showcase hero-stagger hero-stagger-5">
          {/* Card 1: Fast Delivery & Performance */}
          <div className="showcase-card showcase-card-left float-card-1">
            <div className="card-icon-pill bg-red-soft">
              <TrendingUp size={18} className="text-red" />
            </div>
            <div className="card-body-text">
              <span className="card-top-tag">Lighthouse 99+</span>
              <h4 className="card-main-title">Performa Ultra Cepat</h4>
              <p className="card-desc">React & Flutter Next-Gen Architecture</p>
            </div>
          </div>

          {/* Card 2: Interactive Rating & Client Trust */}
          <div className="showcase-card showcase-card-center float-card-2">
            <div className="rating-avatar-stack">
              <span className="avatar-chip">👨‍💻</span>
              <span className="avatar-chip">👩‍💼</span>
              <span className="avatar-chip">🚀</span>
            </div>
            <div className="card-body-text">
              <div className="star-row">
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <span className="rating-num">4.9/5.0</span>
              </div>
              <span className="card-sub-info">150+ Klien & Mitra Bisnis Percaya</span>
            </div>
          </div>

          {/* Card 3: Security & 24/7 Monitoring */}
          <div className="showcase-card showcase-card-right float-card-3">
            <div className="card-icon-pill bg-red-soft">
              <ShieldCheck size={18} className="text-red" />
            </div>
            <div className="card-body-text">
              <span className="card-top-tag text-green">
                <span className="live-pulse-dot"></span> 99.9% Uptime
              </span>
              <h4 className="card-main-title">Garansi Bug-Free 3 Bulan</h4>
              <p className="card-desc">Cloud Server & SSL Terproteksi Mandiri</p>
            </div>
          </div>
        </div>

        {/* Live Technology Ticker Pills */}
        <div className="hero-tech-pills hero-stagger hero-stagger-5">
          <span className="tech-pill"><Globe size={14} /> Web Apps</span>
          <span className="tech-pill"><Smartphone size={14} /> Mobile Flutter</span>
          <span className="tech-pill"><Cpu size={14} /> AI Automasi</span>
          <span className="tech-pill"><CheckCircle2 size={14} /> Cloud Scalable</span>
        </div>

        {/* Stats Grid with Counting Animation */}
        <div className="hero-stats-grid hero-stagger hero-stagger-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="card-glass stat-card">
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
              <div className="stat-info">
                <span className="stat-value">{stat.display}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ===== Hardware-Accelerated Animations ===== */
        @keyframes heroFadeInUp {
          0% {
            opacity: 0;
            transform: translate3d(0, 28px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes floatGentle1 {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -10px, 0);
          }
        }

        @keyframes floatGentle2 {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -14px, 0);
          }
        }

        @keyframes floatGentle3 {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -8px, 0);
          }
        }

        @keyframes ambientPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.95;
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 6px var(--primary);
            opacity: 1;
          }
          50% {
            box-shadow: 0 0 16px var(--primary), 0 0 30px rgba(229, 62, 62, 0.35);
            opacity: 0.85;
          }
        }

        @keyframes backgroundShift {
          0% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 50% 100%;
          }
          100% {
            background-position: 50% 0%;
          }
        }

        /* ===== Hero Section Container ===== */
        .hero-section {
          min-height: 94vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 130px;
          padding-bottom: 75px;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse at 50% -10%, rgba(229, 62, 62, 0.07) 0%, transparent 65%),
                      radial-gradient(ellipse at 85% 70%, rgba(229, 62, 62, 0.035) 0%, transparent 50%),
                      var(--bg-dark);
          background-size: 180% 180%;
          animation: backgroundShift 14s ease-in-out infinite;
        }

        /* Ambient Glow Orbs */
        .hero-glow-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(55px);
          z-index: 1;
        }

        .hero-glow-1 {
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.12) 0%, transparent 70%);
          top: -8%;
          left: 15%;
          animation: ambientPulse 8s ease-in-out infinite;
        }

        .hero-glow-2 {
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.08) 0%, transparent 70%);
          bottom: 10%;
          right: 12%;
          animation: ambientPulse 9s ease-in-out infinite 2s;
        }

        .hero-glow-3 {
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.06) 0%, transparent 70%);
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: ambientPulse 10s ease-in-out infinite 4s;
        }

        /* Ambient Decorative Shapes */
        .ambient-shape {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }

        .shape-1 {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: rgba(229, 62, 62, 0.035);
          top: 15%;
          left: 6%;
          animation: floatGentle1 7s ease-in-out infinite;
        }

        .shape-2 {
          width: 100px;
          height: 100px;
          border-radius: 24px;
          background: rgba(229, 62, 62, 0.04);
          top: 25%;
          right: 7%;
          animation: floatGentle2 8s ease-in-out infinite 1s;
        }

        .shape-3 {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(229, 62, 62, 0.04);
          bottom: 22%;
          left: 9%;
          animation: floatGentle3 6.5s ease-in-out infinite 2s;
        }

        /* ===== Hero Content ===== */
        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 10;
          gap: 36px;
          width: 100%;
        }

        .hero-content {
          max-width: 880px;
        }

        /* Staggered Animations */
        .hero-stagger {
          opacity: 0;
          animation: heroFadeInUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        .hero-stagger-1 { animation-delay: 0.08s; }
        .hero-stagger-2 { animation-delay: 0.2s; }
        .hero-stagger-3 { animation-delay: 0.32s; }
        .hero-stagger-4 { animation-delay: 0.44s; }
        .hero-stagger-5 { animation-delay: 0.56s; }
        .hero-stagger-6 { animation-delay: 0.7s; }

        /* Badge */
        .badge-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(229, 62, 62, 0.04);
          border: 1px solid rgba(229, 62, 62, 0.14);
          color: var(--text-primary);
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          backdrop-filter: blur(10px);
          transition: var(--transition-normal);
        }

        .hero-badge:hover {
          border-color: rgba(229, 62, 62, 0.3);
          background: rgba(229, 62, 62, 0.08);
          transform: translateY(-1px);
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

        /* Title */
        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 22px;
          color: var(--text-primary);
        }

        .font-extra {
          font-weight: 900;
        }

        /* Description */
        .hero-description {
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 34px;
          line-height: 1.7;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Action Buttons */
        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-btn-cta {
          padding: 14px 28px;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .hero-btn-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(229, 62, 62, 0.3);
        }

        .hero-btn-cta:hover .btn-arrow {
          transform: translateX(4px);
        }

        .btn-arrow {
          transition: transform 0.2s ease;
        }

        .hero-btn-secondary {
          padding: 14px 26px;
          font-size: 1rem;
          transition: transform 0.25s ease;
        }

        .hero-btn-secondary:hover {
          transform: translateY(-2px);
        }

        /* ===== Lightweight Floating Feature Showcase (Camplify Style) ===== */
        .hero-floating-showcase {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 980px;
          margin: 12px auto 0 auto;
        }

        .showcase-card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(229, 62, 62, 0.12);
          border-radius: 16px;
          padding: 18px 20px;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          will-change: transform;
        }

        .showcase-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 36px rgba(229, 62, 62, 0.1);
          border-color: rgba(229, 62, 62, 0.3);
        }

        .float-card-1 {
          animation: floatGentle1 6s ease-in-out infinite;
        }

        .float-card-2 {
          animation: floatGentle2 7s ease-in-out infinite 0.5s;
        }

        .float-card-3 {
          animation: floatGentle3 6.5s ease-in-out infinite 1s;
        }

        .bg-red-soft {
          background: rgba(229, 62, 62, 0.08);
        }

        .card-icon-pill {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .card-body-text {
          display: flex;
          flex-direction: column;
        }

        .card-top-tag {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .card-top-tag.text-green {
          color: #10b981;
        }

        .live-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
          animation: pulseGlow 1.8s infinite;
        }

        .card-main-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 2px 0;
          line-height: 1.25;
        }

        .card-desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.35;
        }

        .rating-avatar-stack {
          display: flex;
          align-items: center;
        }

        .avatar-chip {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          border: 2px solid #ffffff;
          margin-left: -10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
        }

        .avatar-chip:first-child {
          margin-left: 0;
        }

        .star-row {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .rating-num {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-left: 4px;
        }

        .card-sub-info {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }

        /* Tech Pills */
        .hero-tech-pills {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .tech-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid var(--border);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }

        .tech-pill:hover {
          color: var(--primary);
          border-color: rgba(229, 62, 62, 0.3);
          background: rgba(229, 62, 62, 0.04);
          transform: translateY(-2px);
        }

        /* ===== Stats Grid ===== */
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 1050px;
          margin-top: 6px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 22px;
          text-align: left;
          border-radius: 14px;
          background: #ffffff;
          border: 1px solid var(--border);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          will-change: transform;
        }

        .stat-card:hover {
          transform: scale(1.04) translateY(-4px);
          box-shadow: 0 12px 28px rgba(229, 62, 62, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
          border-color: rgba(229, 62, 62, 0.25);
        }

        .stat-icon-wrapper {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: rgba(229, 62, 62, 0.05);
          border: 1px solid rgba(229, 62, 62, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: var(--transition-normal);
        }

        .stat-card:hover .stat-icon-wrapper {
          background: rgba(229, 62, 62, 0.12);
          border-color: rgba(229, 62, 62, 0.25);
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
          font-variant-numeric: tabular-nums;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        /* ===== Responsive Media Queries ===== */
        @media (max-width: 991px) {
          .hero-title {
            font-size: 2.85rem;
          }

          .hero-floating-showcase {
            grid-template-columns: 1fr;
            max-width: 520px;
          }

          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 110px;
            padding-bottom: 55px;
          }

          .hero-title {
            font-size: 2.25rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .hero-container {
            gap: 28px;
          }

          .ambient-shape {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.95rem;
          }

          .hero-stats-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .hero-tech-pills {
            gap: 8px;
          }

          .tech-pill {
            font-size: 0.75rem;
            padding: 5px 12px;
          }
        }
      `}</style>
    </section>
  );
}
