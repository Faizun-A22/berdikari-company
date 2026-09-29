import { useState, useEffect } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Headphones,
  Tag,
  Layers,
  Search,
  Globe,
  CheckCircle2,
} from 'lucide-react';

export default function Hero() {
  const [heroBadge, setHeroBadge] = useState('TRANSFORMASI DIGITAL NUSANTARA');
  const [heroTitle, setHeroTitle] = useState(
    'Bangun Sistem Unggul. <br/><span class="hero-highlight-curve">Akselerasi Bisnis Anda.</span>'
  );
  const [heroDesc, setHeroDesc] = useState(
    'Solusi rekayasa perangkat lunak modern untuk website premium, aplikasi mobile multiplatform, dan kecerdasan buatan (AI) otomatisasi yang dirancang presisi untuk skala bisnis Anda.'
  );

  // Quick Solution Bar States
  const [selectedService, setSelectedService] = useState('Website & Web App');
  const [selectedScale, setSelectedScale] = useState('UMKM / Starter');

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

  const getQuickConsultUrl = () => {
    const message = `Halo Berdikari Digital Nusantara, saya ingin konsultasi proyek:\n- Layanan: ${selectedService}\n- Skala Kebutuhan: ${selectedScale}\nMohon informasi estimasi & langkah selanjutnya.`;
    return `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
  };

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
              Lihat Karya & Portofolio
            </a>
          </div>
        </div>

        {/* Floating Horizontal Solution Filter Bar (Pomaii Style) */}
        <div className="floating-solution-bar card-glass">
          <div className="solution-bar-col">
            <label className="bar-label">
              <Globe size={14} className="bar-icon text-red" />
              <span>Pilihan Layanan</span>
            </label>
            <select
              className="bar-select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="Website & Web App">Website & Web App</option>
              <option value="Mobile App (Android & iOS)">Mobile App (Android/iOS)</option>
              <option value="AI Otomatisasi & Chatbot">AI Otomatisasi & Chatbot</option>
              <option value="Sistem SaaS / POS Kasir">Sistem SaaS / Kasir Toko</option>
            </select>
          </div>

          <div className="bar-divider"></div>

          <div className="solution-bar-col">
            <label className="bar-label">
              <Layers size={14} className="bar-icon text-red" />
              <span>Skala Kebutuhan</span>
            </label>
            <select
              className="bar-select"
              value={selectedScale}
              onChange={(e) => setSelectedScale(e.target.value)}
            >
              <option value="UMKM / Starter (Rp 499rb)">Starter / UMKM (Hemat)</option>
              <option value="Bisnis Berkembang (Kustom)">Bisnis / Company Profile</option>
              <option value="Enterprise / Sistem Skala Penuh">Enterprise & Kompleks</option>
            </select>
          </div>

          <div className="bar-divider"></div>

          <div className="solution-bar-col">
            <label className="bar-label">
              <CheckCircle2 size={14} className="bar-icon text-red" />
              <span>Model Layanan</span>
            </label>
            <div className="bar-static-text">
              <strong>Managed & Garansi</strong>
              <span className="bar-sub-badge">Free 3 Bulan</span>
            </div>
          </div>

          <div className="solution-bar-action">
            <a
              href={getQuickConsultUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bar-search-btn"
            >
              <Search size={16} />
              <span>Cari Solusi</span>
            </a>
          </div>
        </div>

        {/* 4-Pillar Trust Feature Bar (Pomaii Style) */}
        <div className="editorial-trust-bar">
          <div className="trust-item">
            <div className="trust-icon-box">
              <Layers size={20} className="text-red" />
            </div>
            <div className="trust-text">
              <h4>Teknologi Modern</h4>
              <p>React, Next.js, & Flutter terkini dengan Lighthouse 95+.</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <Tag size={20} className="text-red" />
            </div>
            <div className="trust-text">
              <h4>Harga Rasional</h4>
              <p>Paket awal mulai Rp 499.000 dengan maintenance Rp 50.000/bln.</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <ShieldCheck size={20} className="text-red" />
            </div>
            <div className="trust-text">
              <h4>Aman & Terproteksi</h4>
              <p>Server cloud terisolasi, sertifikat SSL gratis, dan backup rutin.</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">
              <Headphones size={20} className="text-red" />
            </div>
            <div className="trust-text">
              <h4>Dukungan Purnajual</h4>
              <p>Garansi bebas bug 3 bulan dan respons cepat pemeliharaan.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ===== Hero Section Canvas ===== */
        .hero-editorial-section {
          position: relative;
          padding-top: 140px;
          padding-bottom: 70px;
          background-color: #ffffff;
          overflow: hidden;
        }

        .hero-bg-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 68%;
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
            radial-gradient(ellipse at 85% 15%, rgba(229, 62, 62, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 15% 35%, rgba(229, 62, 62, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, #fff9f9 0%, #ffffff 100%);
        }

        .hero-curve-wave {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 80px;
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
          gap: 40px;
        }

        .hero-editorial-content {
          max-width: 900px;
          margin: 0 auto;
        }

        /* ===== Badge Pill ===== */
        .editorial-badge-row {
          display: flex;
          justify-content: center;
          margin-bottom: 22px;
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
          font-size: 3.8rem;
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: -0.035em;
          color: #0f172a;
          margin-bottom: 24px;
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
          bottom: 4px;
          width: 100%;
          height: 10px;
          background: rgba(229, 62, 62, 0.12);
          border-radius: 6px;
          z-index: -1;
          transform: rotate(-1deg);
        }

        .editorial-subtitle {
          font-size: 1.15rem;
          line-height: 1.75;
          color: #475569;
          max-width: 720px;
          margin: 0 auto 36px auto;
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
          box-shadow: 0 8px 24px rgba(229, 62, 62, 0.3);
          transition: all 0.25s ease;
        }

        .btn-pill-primary:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(229, 62, 62, 0.4);
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

        /* ===== Floating Solution Bar (Pomaii Style) ===== */
        .floating-solution-bar {
          width: 100%;
          max-width: 980px;
          background: #ffffff;
          border: 1px solid rgba(229, 62, 62, 0.16);
          box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.08);
          border-radius: 100px;
          padding: 12px 16px 12px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          text-align: left;
          transition: box-shadow 0.3s ease;
        }

        .floating-solution-bar:hover {
          box-shadow: 0 24px 50px -10px rgba(229, 62, 62, 0.12);
        }

        .solution-bar-col {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .bar-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 2px;
        }

        .bar-select {
          border: none;
          background: transparent;
          font-size: 0.925rem;
          font-weight: 800;
          color: #0f172a;
          outline: none;
          cursor: pointer;
          font-family: inherit;
          padding: 2px 0;
        }

        .bar-divider {
          width: 1px;
          height: 38px;
          background: #e2e8f0;
          flex-shrink: 0;
        }

        .bar-static-text {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.925rem;
          color: #0f172a;
        }

        .bar-sub-badge {
          font-size: 0.68rem;
          background: #ecfdf5;
          color: #059669;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 100px;
        }

        .solution-bar-action {
          flex-shrink: 0;
        }

        .bar-search-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0f172a;
          color: #ffffff;
          padding: 14px 26px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.25s ease;
        }

        .bar-search-btn:hover {
          background: var(--primary);
          color: #ffffff;
          transform: scale(1.03);
          box-shadow: 0 8px 20px rgba(229, 62, 62, 0.3);
        }

        /* ===== Editorial Trust Bar (4 Columns) ===== */
        .editorial-trust-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          width: 100%;
          max-width: 1100px;
          padding-top: 15px;
          text-align: left;
        }

        .trust-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .trust-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #fff5f5;
          border: 1px solid rgba(229, 62, 62, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .trust-item:hover .trust-icon-box {
          transform: translateY(-3px);
          background: var(--primary);
          color: #ffffff;
        }

        .trust-item:hover .trust-icon-box .text-red {
          color: #ffffff;
        }

        .trust-text h4 {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 4px 0;
        }

        .trust-text p {
          font-size: 0.8rem;
          color: #64748b;
          line-height: 1.45;
          margin: 0;
        }

        /* ===== Responsive Queries ===== */
        @media (max-width: 991px) {
          .editorial-main-title {
            font-size: 3rem;
          }

          .floating-solution-bar {
            border-radius: 24px;
            flex-direction: column;
            align-items: stretch;
            padding: 20px;
          }

          .bar-divider {
            width: 100%;
            height: 1px;
          }

          .bar-search-btn {
            justify-content: center;
            width: 100%;
          }

          .editorial-trust-bar {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .hero-editorial-section {
            padding-top: 110px;
            padding-bottom: 50px;
          }

          .editorial-main-title {
            font-size: 2.35rem;
          }

          .editorial-subtitle {
            font-size: 1rem;
          }
        }

        @media (max-width: 576px) {
          .editorial-main-title {
            font-size: 1.95rem;
          }

          .editorial-trust-bar {
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }
      `}</style>
    </section>
  );
}
