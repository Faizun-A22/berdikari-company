import { Search, PenTool, Code2, ShieldCheck, Rocket } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const [timelineRef, timelineVisible] = useScrollReveal();

  const steps = [
    {
      number: '01',
      icon: <Search size={24} />,
      title: 'Discovery & Konsultasi',
      description: 'Kami menganalisis model bisnis Anda, mendefinisikan masalah, mengumpulkan spesifikasi kebutuhan sistem, dan merekomendasikan arsitektur teknologi terbaik.',
    },
    {
      number: '02',
      icon: <PenTool size={24} />,
      title: 'Desain UI/UX & Prototipe',
      description: 'Mendesain wireframe dan membuat mockup *high-fidelity* yang interaktif di Figma. Klien dapat mencoba simulasi klik aplikasi sebelum proses coding dimulai.',
    },
    {
      number: '03',
      icon: <Code2 size={24} />,
      title: 'Pengembangan Agile',
      description: 'Proses penulisan kode bersih (*clean code*) berbasis metode Agile. Kami merilis progres pengerjaan secara berkala setiap 2 minggu agar Anda dapat memantau langsung.',
    },
    {
      number: '04',
      icon: <ShieldCheck size={24} />,
      title: 'QA & Pengujian Ketat',
      description: 'Melakukan pengujian fungsionalitas (QA), uji beban performa (*load testing*), audit celah keamanan, dan perbaikan bug untuk memastikan keandalan mutlak.',
    },
    {
      number: '05',
      icon: <Rocket size={24} />,
      title: 'Peluncuran & Pemeliharaan',
      description: 'Mendeploy produk ke server produksi cloud, mengonfigurasi domain/SSL, mendaftarkan ke Google Play/App Store, serta memberikan garansi pemeliharaan berkala.',
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="glow-orb about-glow"></div>
      
      <div className="container">
        <div className="section-title">
          <h2>Metodologi &amp; Alur Kerja</h2>
          <p>
            Bagaimana kami merealisasikan ide Anda dari konsep mentah hingga menjadi 
            produk digital siap pakai dengan kualitas standar industri.
          </p>
          <div className="accent-bar"></div>
        </div>

        <div 
          ref={timelineRef as React.RefObject<HTMLDivElement>} 
          className={`timeline-container reveal reveal-fade ${timelineVisible ? 'in-view' : ''}`}
        >
          <div className="timeline-line"></div>
          
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index} 
                className={`timeline-item ${isEven ? 'left' : 'right'} reveal reveal-slide-up delay-${(index + 1) * 100} ${timelineVisible ? 'in-view' : ''}`}
              >
                <div className="timeline-badge-circle">
                  <div className="badge-icon-inner">
                    {step.icon}
                  </div>
                </div>
                
                <div className="card-glass timeline-card">
                  <div className="step-number-badge">{step.number}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-deep);
          position: relative;
          overflow: hidden;
          padding: 100px 0;
        }

        .about-glow {
          top: 50%;
          left: 10%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.02) 0%, rgba(255, 255, 255, 0) 60%);
        }

        /* Timeline Layout */
        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 60px auto 0;
          padding: 20px 0;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, 
            rgba(15, 23, 42, 0.02) 0%, 
            var(--primary) 20%, 
            var(--primary) 80%, 
            rgba(15, 23, 42, 0.02) 100%
          );
          transform: translateX(-50%);
          z-index: 1;
        }

        @media (max-width: 768px) {
          .timeline-line {
            left: 24px;
          }
        }

        .timeline-item {
          display: flex;
          justify-content: flex-end;
          width: 50%;
          padding: 0 40px;
          margin-bottom: 50px;
          position: relative;
          z-index: 2;
        }

        .timeline-item.left {
          justify-content: flex-start;
          align-self: flex-start;
          margin-left: 0;
        }

        .timeline-item.right {
          align-self: flex-end;
          margin-left: 50%;
        }

        @media (max-width: 768px) {
          .timeline-item {
            width: 100%;
            margin-left: 0 !important;
            padding-left: 60px;
            padding-right: 0;
            justify-content: flex-start !important;
          }
        }

        /* Timeline Badge Circle */
        .timeline-badge-circle {
          position: absolute;
          right: -24px;
          top: 20px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bg-dark);
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-normal);
          z-index: 5;
        }

        .timeline-item.left .timeline-badge-circle {
          right: -24px;
        }

        .timeline-item.right .timeline-badge-circle {
          left: -24px;
        }

        @media (max-width: 768px) {
          .timeline-badge-circle {
            left: 0px !important;
            right: auto !important;
          }
        }

        .badge-icon-inner {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-normal);
        }

        .timeline-item:hover .timeline-badge-circle {
          border-color: var(--primary);
          box-shadow: 0 0 15px var(--primary-glow-intense);
          background: var(--primary);
        }

        .timeline-item:hover .badge-icon-inner {
          color: var(--white);
          transform: scale(1.1);
        }

        /* Timeline Card styling */
        .timeline-card {
          width: 100%;
          position: relative;
          text-align: left;
          padding: 28px;
        }

        .step-number-badge {
          position: absolute;
          top: -15px;
          right: 28px;
          background: rgba(229, 62, 62, 0.05);
          border: 1px solid rgba(229, 62, 62, 0.12);
          color: var(--primary);
          padding: 4px 12px;
          border-radius: 30px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }

        .step-title {
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .step-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
