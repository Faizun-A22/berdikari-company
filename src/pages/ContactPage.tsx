import { useState } from 'react';
import Contact from '../components/Contact';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function ContactPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: 'Berapa lama estimasi waktu pembuatan website atau aplikasi mobile?',
      answer: 'Waktu pengerjaan bervariasi bergantung pada kompleksitas fitur. Landing Page sederhana biasanya selesai dalam 1-2 minggu. Website kustom, sistem e-commerce, atau dashboard admin memerlukan waktu 4-8 minggu. Sedangkan untuk aplikasi mobile kustom berskala besar biasanya membutuhkan waktu 8-12 minggu.',
    },
    {
      question: 'Apakah saya mendapatkan kepemilikan penuh atas kode sumber (source code)?',
      answer: 'Ya, 100% hak milik kode sumber diserahkan sepenuhnya kepada Anda setelah proyek selesai dan pelunasan dilakukan. Kami akan menyerahkan seluruh aset digital mulai dari repositori GitHub, kredensial hosting/server, hingga file desain Figma.',
    },
    {
      question: 'Bagaimana metode pembayaran proyek di Berdikari Digital Nusantara?',
      answer: 'Metode pembayaran kami dibagi menjadi beberapa termin termin termin: Down Payment (DP) awal sebesar 40% untuk memulai tahap riset & desain, 30% setelah tahap prototipe disetujui untuk memulai pengkodean, dan pelunasan 30% setelah aplikasi siap dideploy ke server produksi pasca QA.',
    },
    {
      question: 'Bagaimana dengan layanan pemeliharaan (maintenance) setelah aplikasi dirilis?',
      answer: 'Kami memberikan garansi pemeliharaan dan perbaikan bug secara gratis selama 3 bulan pertama pasca peluncuran. Setelah periode garansi selesai, kami juga menyediakan opsi paket pemeliharaan rutin bulanan/tahunan untuk optimasi server, backup data, pembaruan keamanan, dan penambahan fitur minor.',
    },
    {
      question: 'Apakah Berdikari Digital Nusantara dapat membantu integrasi sistem dengan API pihak ketiga?',
      answer: 'Tentu saja. Kami berpengalaman mengintegrasikan berbagai sistem dengan API pihak ketiga seperti Payment Gateway (Midtrans, Stripe), API Logistik (RajaOngkir), WhatsApp Gateway, SMS Gateway, hingga sinkronisasi data ERP/CRM korporasi Anda.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="contact-page animate-fade-in">
      <Contact />

      {/* FAQ Section */}
      <section className="faq-section section">
        <div className="glow-orb faq-glow"></div>
        <div className="container faq-container">
          <div className="section-title">
            <h2>Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <p>Berikut adalah jawaban atas beberapa pertanyaan umum dari calon mitra kami mengenai proses kerja sama.</p>
            <div className="accent-bar"></div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className={`faq-card card-glass ${isOpen ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
                  <div className="faq-header">
                    <div className="faq-question-box">
                      <HelpCircle size={20} className="faq-icon text-red" />
                      <h4>{faq.question}</h4>
                    </div>
                    <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                  </div>
                  <div className={`faq-body ${isOpen ? 'open' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .faq-section {
          background-color: var(--bg-deep);
          position: relative;
          overflow: hidden;
        }

        .faq-glow {
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(229, 62, 62, 0.02) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .faq-container {
          position: relative;
          z-index: 10;
          max-width: 860px;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-card {
          padding: 24px;
          cursor: pointer;
          text-align: left;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02), 0 1px 3px rgba(0, 0, 0, 0.01);
        }

        .faq-card:hover {
          border-color: rgba(229, 62, 62, 0.15);
        }

        .faq-card.active {
          border-color: var(--border-active);
          box-shadow: 0 5px 20px rgba(229, 62, 62, 0.04), 0 0 15px rgba(229, 62, 62, 0.01);
        }

        .faq-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .faq-question-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .faq-question-box h4 {
          font-size: 1.05rem;
          color: var(--text-primary);
          font-weight: 600;
          line-height: 1.4;
        }

        .faq-icon {
          flex-shrink: 0;
        }

        .faq-chevron {
          color: var(--text-secondary);
          transition: transform var(--transition-normal);
          flex-shrink: 0;
        }

        .faq-chevron.rotate {
          transform: rotate(180deg);
          color: var(--primary);
        }

        /* Accordion transition logic */
        .faq-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height var(--transition-normal) ease-out, padding var(--transition-normal) ease-out;
          padding-left: 32px;
        }

        .faq-body.open {
          max-height: 200px; /* arbitrary height to fit contents */
          padding-top: 16px;
          transition: max-height var(--transition-normal) ease-in, padding var(--transition-normal) ease-in;
        }

        .faq-body p {
          font-size: 0.925rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
