import { Globe, Smartphone, Palette, Cloud, Database, BarChart } from 'lucide-react';

export default function Services() {
  const servicesList = [
    {
      icon: <Globe size={28} />,
      title: 'Web Development',
      description: 'Pembuatan website premium mulai dari Landing Page, E-Commerce, Dashboard Admin, hingga Web Apps kompleks menggunakan React, Next.js, dan Node.js.',
    },
    {
      icon: <Smartphone size={28} />,
      title: 'Mobile Development',
      description: 'Pengembangan aplikasi mobile kustom untuk iOS dan Android menggunakan Flutter atau React Native dengan kinerja mulus dan user interface modern.',
    },
    {
      icon: <Palette size={28} />,
      title: 'UI/UX Design',
      description: 'Desain pengalaman pengguna (UX) dan antarmuka (UI) yang intuitif, estetis, dan berorientasi pada konversi menggunakan Figma berdasarkan riset pengguna.',
    },
    {
      icon: <Cloud size={28} />,
      title: 'Cloud & DevOps Solutions',
      description: 'Migrasi cloud, manajemen server AWS/GCP, otomatisasi CI/CD, dan optimalisasi arsitektur server untuk memastikan skalabilitas & performa maksimal.',
    },
    {
      icon: <Database size={28} />,
      title: 'Sistem Custom & API',
      description: 'Integrasi sistem ERP/CRM kustom, pembuatan API RESTful/GraphQL yang aman, serta sinkronisasi database skala besar untuk bisnis Anda.',
    },
    {
      icon: <BarChart size={28} />,
      title: 'Konsultasi & Audit IT',
      description: 'Konsultasi arsitektur teknologi, audit keamanan kode, dan perencanaan strategi digital agar investasi IT perusahaan Anda tepat sasaran.',
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="glow-orb services-glow"></div>
      
      <div className="container">
        <div className="section-title">
          <h2>Layanan Unggulan Kami</h2>
          <p>
            Berdikari Tech menyediakan solusi IT end-to-end yang disesuaikan secara khusus dengan 
            kebutuhan dan tujuan bisnis perusahaan Anda.
          </p>
          <div className="accent-bar"></div>
        </div>

        <div className="services-grid">
          {servicesList.map((service, index) => (
            <div key={index} className="card-glass service-card">
              <div className="service-icon-box">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              
              <a href="/contact.html" className="service-link">
                Konsultasikan Proyek Ini &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-section {
          background-color: var(--bg-deep);
          position: relative;
          overflow: hidden;
        }

        .services-glow {
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(229, 62, 62, 0.02) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 991px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .service-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          height: 100%;
        }

        .service-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(229, 62, 62, 0.04);
          border: 1px solid rgba(229, 62, 62, 0.08);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: var(--transition-normal);
        }

        .service-card:hover .service-icon-box {
          background: var(--primary);
          color: var(--white);
          transform: rotate(5deg) scale(1.1);
          box-shadow: 0 0 15px rgba(229, 62, 62, 0.3);
        }

        .service-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .service-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
          flex-grow: 1;
          line-height: 1.6;
        }

        .service-link {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: var(--transition-fast);
        }

        .service-card:hover .service-link {
          color: var(--primary);
          padding-left: 6px;
        }
      `}</style>
    </section>
  );
}
