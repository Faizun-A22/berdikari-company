import About from '../components/About';
import { Target, Eye, ShieldCheck, Heart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function AboutPage() {
  const [visionRef, visionVisible] = useScrollReveal();
  const [valuesRef, valuesVisible] = useScrollReveal();
  const [teamRef, teamVisible] = useScrollReveal();

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

  const team = [
    {
      name: 'Rian Wijaya',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Aditya Pratama',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Siti Rahma',
      role: 'Lead UI/UX Designer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Hadi Sentosa',
      role: 'Senior Fullstack Engineer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
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
            <h2>Tentang Berdikari Tech</h2>
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

      {/* Team Section */}
      <section 
        ref={teamRef as React.RefObject<HTMLDivElement>} 
        className={`team-section section reveal reveal-fade ${teamVisible ? 'in-view' : ''}`}
      >
        <div className="glow-orb team-glow"></div>
        <div className="container">
          <div className="section-title">
            <h2>Tim Ahli Kami</h2>
            <p>Kolaborasi para profesional berpengalaman di bidang rekayasa sistem, desain, dan arsitektur server.</p>
            <div className="accent-bar"></div>
          </div>

          <div className="team-grid">
            {team.map((member, idx) => (
              <div 
                key={idx} 
                className={`team-card reveal reveal-slide-up delay-${(idx + 1) * 100} ${teamVisible ? 'in-view' : ''}`}
              >
                <div className="team-img-box">
                  <img src={member.image} alt={member.name} className="team-img" />
                </div>
                <div className="team-info card-glass">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
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

        /* Team styling */
        .team-glow {
          bottom: 10%;
          right: 5%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.02) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 991px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 480px) {
          .team-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .team-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .team-img-box {
          width: 100%;
          height: 280px;
          border-radius: 16px;
          overflow: hidden;
          background-color: #f8fafc;
          border: 1px solid var(--border);
          margin-bottom: -40px;
          z-index: 1;
        }

        .team-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-normal);
          filter: grayscale(40%);
        }

        .team-card:hover .team-img {
          transform: scale(1.03);
          filter: grayscale(0%);
        }

        .team-info {
          width: 90%;
          padding: 20px 16px;
          text-align: center;
          z-index: 2;
          position: relative;
          border-color: var(--border);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
          background: #ffffff;
        }

        .team-info h3 {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .team-role {
          font-size: 0.825rem;
          color: var(--primary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
