import About from '../components/About';
import { Target, Eye, ShieldCheck, Heart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function AboutPage() {
  const [visionRef, visionVisible] = useScrollReveal();
  const [valuesRef, valuesVisible] = useScrollReveal();

  const values = [
    {
      icon: <Target size={24} />,
      title: 'Inovasi Berkelanjutan',
      desc: 'Kami terus memperbarui keahlian kami dengan teknologi terbaru demi memberikan solusi paling efisien.',
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Keamanan Mutlak',
      desc: 'Setiap baris kode yang ditulis mengutamakan enkripsi data dan perlindungan privasi pengguna.',
    },
    {
      icon: <Heart size={24} />,
      title: 'Kemitraan Jangka Panjang',
      desc: 'Kami memandang klien sebagai mitra strategis, mendukung pertumbuhan aplikasi pasca-peluncuran.',
    },
  ];

  return (
    <div className="about-page animate-fade-in">
      {/* Visi Misi Section */}
      <section 
        ref={visionRef as React.RefObject<HTMLDivElement>} 
        className={`vision-mission-section section reveal reveal-fade ${visionVisible ? 'in-view' : ''}`}
      >
        <div className="glow-orb vision-glow"></div>
        <div className="container">
          <div className="section-title">
            <h2>Tentang Berdikari Digital Nusantara</h2>
            <p>Berkomitmen menghadirkan rekayasa perangkat lunak berkelas dunia untuk bisnis lokal dan global.</p>
            <div className="accent-bar"></div>
          </div>

          <div className="vision-grid">
            <div className={`card-glass vision-card reveal reveal-slide-up delay-100 ${visionVisible ? 'in-view' : ''}`}>
              <div className="vision-header">
                <Target size={28} className="text-red" />
                <h3>Misi Kami</h3>
              </div>
              <p>
                Menjadi partner akselerasi teknologi terdepan bagi perusahaan di Indonesia dengan 
                menyediakan produk digital (web &amp; mobile) yang mengutamakan kualitas visual premium, 
                keamanan data, dan kemudahan operasional.
              </p>
            </div>

            <div className={`card-glass vision-card reveal reveal-slide-up delay-200 ${visionVisible ? 'in-view' : ''}`}>
              <div className="vision-header">
                <Eye size={28} className="text-red" />
                <h3>Visi Kami</h3>
              </div>
              <p>
                Merevolusi ekosistem pengembangan perangkat lunak yang transparan, tepat waktu, 
                dan bernilai guna tinggi, sehingga investasi teknologi setiap klien memberikan dampak 
                pertumbuhan nyata bagi bisnis mereka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={valuesRef as React.RefObject<HTMLDivElement>} 
        className={`values-section section reveal reveal-fade ${valuesVisible ? 'in-view' : ''}`}
      >
        <div className="container">
          <div className="section-title">
            <h2>Nilai-Nilai Utama</h2>
            <p>Prinsip dasar yang kami pegang teguh dalam setiap baris kode dan hubungan kerja sama.</p>
            <div className="accent-bar"></div>
          </div>

          <div className="values-grid">
            {values.map((val, i) => (
              <div 
                key={i} 
                className={`card-glass value-card reveal reveal-slide-up delay-${(i + 1) * 100} ${valuesVisible ? 'in-view' : ''}`}
              >
                <div className="value-icon">{val.icon}</div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Import Timeline Workflow */}
      <About />

      <style>{`
        .vision-mission-section {
          padding-top: 40px !important;
        }

        .vision-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          text-align: left;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .vision-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .vision-glow {
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(229, 62, 62, 0.02) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .vision-card {
          padding: 36px;
        }

        .vision-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .vision-header h3 {
          font-size: 1.4rem;
          color: var(--text-primary);
        }

        .vision-card p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.975rem;
        }

        /* Values section */
        .values-section {
          background-color: var(--bg-deep);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        @media (max-width: 991px) {
          .values-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .value-card {
          text-align: left;
          padding: 32px;
        }

        .value-icon {
          color: var(--primary);
          margin-bottom: 20px;
        }

        .value-card h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .value-card p {
          color: var(--text-secondary);
          font-size: 0.925rem;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
