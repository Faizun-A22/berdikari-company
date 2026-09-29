import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Code,
  ShieldCheck,
  Zap,
  Award,
  Star,
  Sparkles,
  TrendingUp,
  Wifi,
  Battery,
  CheckCircle2,
  Globe,
  Smartphone,
} from 'lucide-react';

function useCountUp(target: number, duration = 2000, decimals = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
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
      <div className="glow-orb hero-glow-1"></div>
      <div className="glow-orb hero-glow-2"></div>

      {/* Floating decorative ambient shapes */}
      <div className="hero-float-shape hero-float-shape-1" aria-hidden="true" />
      <div className="hero-float-shape hero-float-shape-2" aria-hidden="true" />
      <div className="hero-float-shape hero-float-shape-3" aria-hidden="true" />
      <div className="hero-float-shape hero-float-shape-4" aria-hidden="true" />

      <div className="container hero-container">
        {/* Hero Header Content */}
        <div className="hero-content">
          <div className="badge-wrapper hero-stagger hero-stagger-1">
            <span className="hero-badge">
              <span className="badge-dot"></span>
              {heroBadge}
            </span>
          </div>

          <h1
            className="hero-title hero-stagger hero-stagger-2"
            dangerouslySetInnerHTML={{ __html: heroTitle }}
          ></h1>

          <p className="hero-description hero-stagger hero-stagger-3">
            {heroDesc}
          </p>

          <div className="hero-actions hero-stagger hero-stagger-4">
            <a href="/contact.html" className="btn btn-primary">
              Konsultasi Gratis <ArrowRight size={18} />
            </a>
            <a href="/portfolio.html" className="btn btn-secondary">
              Lihat Portofolio
            </a>
          </div>
        </div>

        {/* Camplify-Inspired Animated Phone Showcase & Floating Cards */}
        <div className="hero-device-showcase hero-stagger hero-stagger-5">
          {/* Ambient Glow behind phone */}
          <div className="phone-ambient-glow" aria-hidden="true" />

          {/* Floating Badge Left (Ratings & Clients) */}
          <div className="camplify-floating-badge badge-left">
            <div className="badge-avatar-group">
              <span className="badge-avatar">👨‍💻</span>
              <span className="badge-avatar">👩‍💼</span>
              <span className="badge-avatar">🚀</span>
            </div>
            <div className="badge-content">
              <div className="badge-stars">
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <span className="badge-score">4.9/5.0</span>
              </div>
              <span className="badge-sub">150+ Mitra Bisnis Percaya</span>
            </div>
          </div>

          {/* Floating Badge Right (Speed & Performance) */}
          <div className="camplify-floating-badge badge-right">
            <div className="badge-icon-box">
              <Sparkles size={18} className="text-red" />
            </div>
            <div className="badge-content">
              <span className="badge-title">Ultra Fast & Secure</span>
              <div className="badge-metric">
                <TrendingUp size={13} color="#10b981" />
                <span className="badge-metric-text">Lighthouse 99+ Speed</span>
              </div>
            </div>
          </div>

          {/* Floating Mini Pill Bottom Right (Warranty) */}
          <div className="camplify-floating-badge badge-bottom-right">
            <ShieldCheck size={16} className="text-red" />
            <span>Garansi Bug-Free 3 Bulan</span>
          </div>

          {/* Realistic Smartphone Mockup Frame */}
          <div className="phone-mockup-frame">
            {/* Dynamic Island / Notch */}
            <div className="phone-notch">
              <div className="camera-lens"></div>
              <div className="speaker-slit"></div>
            </div>

            {/* Screen Display */}
            <div className="phone-screen">
              {/* Status Bar */}
              <div className="phone-status-bar">
                <span className="phone-time">09:41</span>
                <div className="phone-status-icons">
                  <Wifi size={12} />
                  <Battery size={14} />
                </div>
              </div>

              {/* App Bar */}
              <div className="phone-app-header">
                <div className="app-brand">
                  <div className="app-logo-dot"></div>
                  <div>
                    <div className="app-name">Berdikari App</div>
                    <div className="app-tagline">Solusi Digital Nusantara</div>
                  </div>
                </div>
                <div className="app-badge-status">
                  <span className="live-dot"></span> Online
                </div>
              </div>

              {/* App Highlight Card */}
              <div className="phone-app-card">
                <div className="app-card-chip">🚀 Ekosistem Digital</div>
                <h4 className="app-card-title">Wujudkan Sistem & Produk Impian Anda</h4>
                <p className="app-card-p">Website responsif, mobile app kustom, dan sistem AI otomatisasi.</p>
                <div className="app-card-action">
                  <span>Lihat Demo Sistem</span>
                  <ArrowRight size={12} />
                </div>
              </div>

              {/* Mini Stats Inside Phone */}
              <div className="phone-mini-grid">
                <div className="phone-mini-card">
                  <div className="mini-card-val text-red">99.9%</div>
                  <div className="mini-card-lbl">Server Uptime</div>
                </div>
                <div className="phone-mini-card">
                  <div className="mini-card-val text-red">3x</div>
                  <div className="mini-card-lbl">Lebih Cepat</div>
                </div>
              </div>

              {/* Activity Status Row */}
              <div className="phone-activity-row">
                <CheckCircle2 size={16} className="text-red" />
                <div className="activity-info">
                  <span className="activity-title">Automated Cloud Deploy</span>
                  <span className="activity-sub">AWS & Vercel High-Performance</span>
                </div>
              </div>

              {/* Bottom Nav Bar */}
              <div className="phone-nav-bar">
                <div className="nav-item active">
                  <Globe size={14} />
                  <span>Web</span>
                </div>
                <div className="nav-item">
                  <Smartphone size={14} />
                  <span>Mobile</span>
                </div>
                <div className="nav-item">
                  <Zap size={14} />
                  <span>AI Tech</span>
                </div>
              </div>
            </div>

            {/* Glass reflection streak */}
            <div className="phone-gloss-overlay"></div>
          </div>
        </div>

        {/* Floating Stats Section Below Phone (Camplify Style) */}
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
        /* ===== Keyframes ===== */
        @keyframes heroFadeInUp {
          0% {
            opacity: 0;
            transform: translateY(32px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(3deg);
          }
        }

        @keyframes phoneFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(-0.5deg);
          }
        }

        @keyframes floatBadgeLeft {
          0%, 100% {
            transform: translateY(0px) rotate(-1deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        @keyframes floatBadgeRight {
          0%, 100% {
            transform: translateY(0px) rotate(1deg);
          }
          50% {
            transform: translateY(-14px) rotate(-1deg);
          }
        }

        @keyframes floatBadgeBottom {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 6px var(--primary);
            opacity: 1;
          }
          50% {
            box-shadow: 0 0 18px var(--primary), 0 0 40px rgba(229, 62, 62, 0.3);
            opacity: 0.8;
          }
        }

        @keyframes gradientShift {
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

        /* ===== Hero Section ===== */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 130px;
          padding-bottom: 90px;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse at 50% 0%, rgba(229, 62, 62, 0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 60%, rgba(229, 62, 62, 0.03) 0%, transparent 50%),
                      var(--bg-dark);
          background-size: 200% 200%;
          animation: gradientShift 14s ease-in-out infinite;
        }

        /* ===== Glow orbs ===== */
        .hero-glow-1 {
          top: -10%;
          left: 10%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .hero-glow-2 {
          bottom: 10%;
          right: 5%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.04) 0%, rgba(255, 255, 255, 0) 70%);
        }

        /* ===== Floating decorative shapes ===== */
        .hero-float-shape {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          animation: floatSlow 6s ease-in-out infinite;
        }

        .hero-float-shape-1 {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(229, 62, 62, 0.05);
          top: 10%;
          left: 5%;
          animation-delay: 0s;
          animation-duration: 7s;
        }

        .hero-float-shape-2 {
          width: 140px;
          height: 140px;
          border-radius: 28px;
          background: rgba(229, 62, 62, 0.06);
          top: 18%;
          right: 6%;
          animation-delay: 1.5s;
          animation-duration: 8.5s;
        }

        .hero-float-shape-3 {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(229, 62, 62, 0.05);
          bottom: 22%;
          left: 8%;
          animation-delay: 3s;
          animation-duration: 6.5s;
        }

        .hero-float-shape-4 {
          width: 110px;
          height: 110px;
          border-radius: 24px;
          background: rgba(229, 62, 62, 0.04);
          bottom: 28%;
          right: 10%;
          animation-delay: 2s;
          animation-duration: 9s;
          transform: rotate(15deg);
        }

        /* ===== Staggered fade-in ===== */
        .hero-stagger {
          opacity: 0;
          animation: heroFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-stagger-1 { animation-delay: 0.1s; }
        .hero-stagger-2 { animation-delay: 0.25s; }
        .hero-stagger-3 { animation-delay: 0.4s; }
        .hero-stagger-4 { animation-delay: 0.55s; }
        .hero-stagger-5 { animation-delay: 0.7s; }
        .hero-stagger-6 { animation-delay: 0.85s; }

        /* ===== Hero Container ===== */
        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 10;
          gap: 48px;
          width: 100%;
        }

        .hero-content {
          max-width: 860px;
        }

        /* ===== Badge ===== */
        .badge-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(229, 62, 62, 0.04);
          border: 1px solid rgba(229, 62, 62, 0.12);
          color: var(--text-primary);
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          backdrop-filter: blur(8px);
          transition: var(--transition-normal);
        }

        .hero-badge:hover {
          border-color: rgba(229, 62, 62, 0.25);
          background: rgba(229, 62, 62, 0.06);
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

        /* ===== Title ===== */
        .hero-title {
          font-size: 3.4rem;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        .font-extra {
          font-weight: 900;
        }

        /* ===== Description ===== */
        .hero-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 36px;
          line-height: 1.7;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        /* ===== Actions ===== */
        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* ===== Camplify Device Showcase ===== */
        .hero-device-showcase {
          position: relative;
          width: 100%;
          max-width: 580px;
          margin: 10px auto 20px auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .phone-ambient-glow {
          position: absolute;
          width: 380px;
          height: 480px;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.16) 0%, rgba(229, 62, 62, 0.03) 50%, transparent 75%);
          filter: blur(40px);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          pointer-events: none;
        }

        .phone-mockup-frame {
          position: relative;
          z-index: 5;
          width: 310px;
          height: 520px;
          background: #0f172a;
          border-radius: 44px;
          padding: 10px;
          box-shadow: 
            0 25px 60px -12px rgba(0, 0, 0, 0.28),
            0 0 0 1px rgba(255, 255, 255, 0.12) inset,
            0 0 35px rgba(229, 62, 62, 0.15);
          animation: phoneFloat 6s ease-in-out infinite;
          overflow: hidden;
          transition: transform 0.4s ease;
        }

        .phone-mockup-frame:hover {
          transform: translateY(-8px) scale(1.02);
        }

        /* Dynamic Island / Notch */
        .phone-notch {
          position: absolute;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: 96px;
          height: 22px;
          background: #000000;
          border-radius: 14px;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
        }

        .camera-lens {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .speaker-slit {
          width: 38px;
          height: 3px;
          border-radius: 3px;
          background: #1e293b;
        }

        /* Screen */
        .phone-screen {
          width: 100%;
          height: 100%;
          background: #ffffff;
          border-radius: 36px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 12px 14px;
          text-align: left;
          position: relative;
          color: var(--text-primary);
        }

        .phone-status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 6px 12px 6px;
          font-size: 0.725rem;
          font-weight: 700;
          color: #0f172a;
        }

        .phone-status-icons {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #0f172a;
        }

        /* App Header */
        .phone-app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 12px;
        }

        .app-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .app-logo-dot {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--primary) 0%, #b91c1c 100%);
          box-shadow: 0 2px 6px rgba(229, 62, 62, 0.35);
        }

        .app-name {
          font-size: 0.8rem;
          font-weight: 800;
          line-height: 1.1;
        }

        .app-tagline {
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .app-badge-status {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.68rem;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 3px 8px;
          border-radius: 100px;
        }

        .live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
        }

        /* App Highlight Card */
        .phone-app-card {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 14px;
          border-radius: 16px;
          margin-bottom: 12px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.18);
        }

        .phone-app-card::before {
          content: '';
          position: absolute;
          top: -20px;
          right: -20px;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.4) 0%, transparent 70%);
          border-radius: 50%;
        }

        .app-card-chip {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          color: #fca5a5;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .app-card-title {
          font-size: 0.85rem;
          font-weight: 800;
          line-height: 1.25;
          margin-bottom: 4px;
          color: #ffffff;
        }

        .app-card-p {
          font-size: 0.68rem;
          color: #94a3b8;
          line-height: 1.35;
          margin-bottom: 10px;
        }

        .app-card-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--primary);
          background: #ffffff;
          padding: 4px 10px;
          border-radius: 100px;
        }

        /* Mini Grid inside phone */
        .phone-mini-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 12px;
        }

        .phone-mini-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 8px;
          text-align: center;
        }

        .mini-card-val {
          font-size: 0.95rem;
          font-weight: 900;
          line-height: 1.1;
        }

        .mini-card-lbl {
          font-size: 0.65rem;
          color: var(--text-secondary);
        }

        /* Activity Row inside phone */
        .phone-activity-row {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f1f5f9;
          border-radius: 12px;
          padding: 8px 10px;
          margin-bottom: auto;
        }

        .activity-info {
          display: flex;
          flex-direction: column;
        }

        .activity-title {
          font-size: 0.72rem;
          font-weight: 700;
          color: #0f172a;
        }

        .activity-sub {
          font-size: 0.62rem;
          color: #64748b;
        }

        /* Bottom Nav Bar */
        .phone-nav-bar {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding-top: 10px;
          border-top: 1px solid #f1f5f9;
          margin-top: 8px;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          font-size: 0.62rem;
          color: #94a3b8;
          font-weight: 600;
        }

        .nav-item.active {
          color: var(--primary);
          font-weight: 800;
        }

        /* Gloss overlay */
        .phone-gloss-overlay {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 60%);
          pointer-events: none;
          border-radius: 44px;
        }

        /* ===== Floating Badges (Camplify Style) ===== */
        .camplify-floating-badge {
          position: absolute;
          z-index: 10;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(229, 62, 62, 0.15);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
        }

        /* Left Floating Badge */
        .badge-left {
          left: -40px;
          top: 25%;
          animation: floatBadgeLeft 5s ease-in-out infinite;
        }

        .badge-avatar-group {
          display: flex;
          align-items: center;
        }

        .badge-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          border: 2px solid #ffffff;
          margin-left: -8px;
        }

        .badge-avatar:first-child {
          margin-left: 0;
        }

        .badge-content {
          display: flex;
          flex-direction: column;
        }

        .badge-stars {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .badge-score {
          font-size: 0.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-left: 4px;
        }

        .badge-sub {
          font-size: 0.68rem;
          color: var(--text-secondary);
        }

        /* Right Floating Badge */
        .badge-right {
          right: -40px;
          top: 35%;
          animation: floatBadgeRight 6s ease-in-out infinite 0.5s;
        }

        .badge-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: rgba(229, 62, 62, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .badge-title {
          font-size: 0.78rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.1;
        }

        .badge-metric {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
        }

        .badge-metric-text {
          font-size: 0.68rem;
          font-weight: 700;
          color: #10b981;
        }

        /* Bottom Right Pill Badge */
        .badge-bottom-right {
          right: -10px;
          bottom: 12%;
          padding: 8px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
          animation: floatBadgeBottom 4.5s ease-in-out infinite 1s;
        }

        /* ===== Stats Grid ===== */
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          width: 100%;
          max-width: 1100px;
          margin-top: 10px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          text-align: left;
          border-radius: 14px;
          background: #ffffff;
          border: 1px solid var(--border);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
          will-change: transform;
        }

        .stat-card:hover {
          transform: scale(1.045) translateY(-4px);
          box-shadow: 0 12px 32px rgba(229, 62, 62, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06);
          border-color: rgba(229, 62, 62, 0.25);
        }

        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
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
            font-size: 2.8rem;
          }

          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .badge-left {
            left: -10px;
          }

          .badge-right {
            right: -10px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 110px;
            padding-bottom: 60px;
          }

          .hero-title {
            font-size: 2.25rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .hero-container {
            gap: 36px;
          }

          .phone-mockup-frame {
            width: 280px;
            height: 470px;
          }

          .camplify-floating-badge {
            transform: scale(0.9);
          }

          .badge-left {
            left: 0;
            top: 15%;
          }

          .badge-right {
            right: 0;
            top: 25%;
          }

          .badge-bottom-right {
            right: 0;
            bottom: 5%;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.95rem;
          }

          .hero-device-showcase {
            margin: 0 auto;
          }

          .phone-mockup-frame {
            width: 260px;
            height: 440px;
          }

          .camplify-floating-badge {
            display: none; /* Hide floating badges on very narrow screens to prevent overlap */
          }

          .hero-stats-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .hero-float-shape {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
