import Services from '../components/Services';
import { ShieldAlert, CheckCircle, Code, Settings, Server, Palette } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ServicesPage() {
  const [techRef, techVisible] = useScrollReveal();
  const [standardsRef, standardsVisible] = useScrollReveal();

  const techStacks = [
    {
      category: 'Frontend & Web',
      icon: <Code size={20} className="text-red" />,
      items: ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS', 'Redux / Zustand'],
    },
    {
      category: 'Backend & Database',
      icon: <Server size={20} className="text-red" />,
      items: ['Node.js', 'NestJS', 'Express', 'PostgreSQL', 'MongoDB', 'Redis'],
    },
    {
      category: 'Mobile Apps',
      icon: <Settings size={20} className="text-red" />,
      items: ['Flutter', 'React Native', 'Kotlin (Native)', 'Swift (Native)'],
    },
    {
      category: 'DevOps & Design',
      icon: <Palette size={20} className="text-red" />,
      items: ['AWS / GCP', 'Docker', 'CI/CD Pipelines', 'Figma', 'Adobe XD'],
    },
  ];

  const packageIncludes = [
    'Source Code 100% Hak Milik Klien',
    'Desain UI/UX Figma Kustom (Bukan Template)',
    'Integrasi Keamanan SSL & Proteksi DDoS',
    'Optimasi SEO On-Page Standard Google',
    'Pemeliharaan & Garansi Bug Free selama 3 Bulan',
    'Dokumentasi Penggunaan Sistem / Manual Guide',
  ];

  return (
    <div className="services-page animate-fade-in">
      <Services />

      {/* Technology Stack Section */}
      <section 
        ref={techRef as React.RefObject<HTMLDivElement>} 
        className={`tech-stack-section section reveal reveal-fade ${techVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="section-title">
            <h2>Teknologi yang Kami Gunakan</h2>
            <p>
              Kami hanya menggunakan ekosistem teknologi modern, andal, dan memiliki performa tinggi 
              untuk memastikan sistem Anda siap menghadapi masa depan.
            </p>
            <div className="accent-bar"></div>
          </div>

          <div className="tech-grid">
            {techStacks.map((stack, idx) => (
              <div 
                key={idx} 
                className={`card-glass tech-card reveal reveal-slide-up delay-${(idx + 1) * 100} ${techVisible ? 'in-view' : ''}`}
              >
                <div className="tech-header">
                  {stack.icon}
                  <h3>{stack.category}</h3>
                </div>
                <ul className="tech-list">
                  {stack.items.map((item, i) => (
                    <li key={i} className="tech-item">
                      <span className="tech-dot-indicator"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Quality Standards */}
      <section 
        ref={standardsRef as React.RefObject<HTMLDivElement>} 
        className={`standards-section section reveal reveal-fade ${standardsVisible ? 'in-view' : ''}`}
      >
        <div className="glow-orb standards-glow"></div>
        <div className="container standards-container">
          <div className="standards-grid">
            <div className="standards-content">
              <h2>Setiap Paket Layanan Sudah Termasuk:</h2>
              <p>
                Kami tidak sekadar menulis kode. Kami memastikan produk digital yang kami buat 
                siap pakai, aman, dan mudah dioperasikan secara mandiri oleh bisnis Anda.
              </p>
              <div className="includes-list">
                {packageIncludes.map((item, idx) => (
                  <div key={idx} className="include-item">
                    <CheckCircle className="include-check" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-glass standards-card reveal reveal-scale-in delay-200">
              <div className="alert-icon-box">
                <ShieldAlert size={32} />
              </div>
              <h3>Garansi Keamanan &amp; Performa</h3>
              <p className="standards-alert-text">
                Semua proyek kami melewati proses pengujian otomatis (*unit testing*) serta audit 
                performa menggunakan Google Lighthouse dengan skor minimal 90+ untuk performa, 
                aksesibilitas, dan SEO.
              </p>
              <div className="score-badge">
                <span className="score-value">90+</span>
                <span className="score-label">Lighthouse Score</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 991px) {
          .tech-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .tech-grid {
            grid-template-columns: 1fr;
          }
        }

        .tech-card {
          text-align: left;
          padding: 28px;
        }

        .tech-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 16px;
        }

        .tech-header h3 {
          font-size: 1.15rem;
          color: var(--text-primary);
        }

        .tech-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tech-item {
          font-size: 0.925rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tech-dot-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--primary);
          display: inline-block;
        }

        /* Standards grid */
        .standards-section {
          background-color: var(--bg-deep);
          position: relative;
          overflow: hidden;
        }

        .standards-glow {
          top: 50%;
          right: 5%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.02) 0%, rgba(255, 255, 255, 0) 65%);
        }

        .standards-container {
          position: relative;
          z-index: 10;
        }

        .standards-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 991px) {
          .standards-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .standards-content {
          text-align: left;
        }

        .standards-content h2 {
          font-size: 2.25rem;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .standards-content p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          margin-bottom: 32px;
          line-height: 1.7;
        }

        .includes-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .include-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.975rem;
          color: var(--text-primary);
        }

        .include-check {
          color: #10b981;
          flex-shrink: 0;
        }

        .standards-card {
          padding: 40px;
          text-align: left;
          border-color: rgba(229, 62, 62, 0.1);
          background: #ffffff;
        }

        .alert-icon-box {
          color: var(--primary);
          margin-bottom: 20px;
        }

        .standards-card h3 {
          font-size: 1.35rem;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .standards-alert-text {
          font-size: 0.925rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .score-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(16, 185, 129, 0.05);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 8px 16px;
          border-radius: 8px;
        }

        .score-value {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: #10b981;
        }

        .score-label {
          font-size: 0.85rem;
          color: #047857;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
