import { useState } from 'react';
import { Globe, Smartphone, Palette, Brain, Package, X, Check, ArrowRight, MessageSquare, BookOpen, CreditCard } from 'lucide-react';

export default function Services() {
  const [showDigitalModal, setShowDigitalModal] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'undangan' | 'ebook' | 'langganan'>('undangan');

  const servicesList = [
    {
      id: 'web',
      icon: <Globe size={28} />,
      title: 'Web Development',
      description: 'Pembuatan website premium mulai dari Landing Page, E-Commerce, Dashboard Admin, hingga Web Apps kompleks menggunakan React, Next.js, dan Node.js.',
      link: '/contact.html',
      actionText: 'Konsultasikan Proyek Ini \u2192'
    },
    {
      id: 'mobile',
      icon: <Smartphone size={28} />,
      title: 'Mobile Development',
      description: 'Pengembangan aplikasi mobile kustom untuk iOS dan Android menggunakan Flutter atau React Native dengan kinerja mulus dan user interface modern.',
      link: '/contact.html',
      actionText: 'Konsultasikan Proyek Ini \u2192'
    },
    {
      id: 'uiux',
      icon: <Palette size={28} />,
      title: 'UI/UX Design',
      description: 'Desain pengalaman pengguna (UX) dan antarmuka (UI) yang intuitif, estetis, dan berorientasi pada konversi menggunakan Figma berdasarkan riset pengguna.',
      link: '/contact.html',
      actionText: 'Konsultasikan Proyek Ini \u2192'
    },
    {
      id: 'ai_automation',
      icon: <Brain size={28} />,
      title: 'AI Otomatisasi & Chatbot',
      description: 'Otomatisasi alur kerja bisnis menggunakan kecerdasan buatan, integrasi LLM (OpenAI/Claude), agen pintar mandiri, dan chatbot interaktif.',
      link: '/contact.html',
      actionText: 'Konsultasikan Proyek Ini \u2192'
    },
    {
      id: 'digital_product',
      icon: <Package size={28} />,
      title: 'Produk Digital Siap Pakai',
      description: 'Dapatkan produk digital inovatif siap guna seperti Undangan Digital interaktif, E-Book bisnis eksklusif, dan Layanan Berlangganan Aplikasi.',
      link: '#',
      actionText: 'Pilih & Lihat Produk \u2192'
    }
  ];

  const subProducts = {
    undangan: {
      title: 'Undangan Digital Interaktif',
      icon: <MessageSquare size={20} className="text-red" />,
      desc: 'Solusi undangan online modern yang ramah lingkungan, hemat biaya, dan sangat menarik.',
      features: [
        'Desain Responsive (Mobile & Desktop)',
        'RSVP Otomatis & Buku Tamu Digital',
        'Integrasi Peta Lokasi / Google Maps',
        'Galeri Foto & Video Premium',
        'Musik Latar Kustom (Autoplay)',
        'Hitung Mundur Acara (Countdown Timer)'
      ],
      pricing: 'Mulai Rp 99.000 / undangan',
      waText: 'Halo Berdikari Digital Nusantara, saya tertarik dengan layanan Undangan Digital Interaktif.'
    },
    ebook: {
      title: 'E-Book Premium Bisnis & IT',
      icon: <BookOpen size={20} className="text-red" />,
      desc: 'Buku panduan digital komprehensif yang disusun oleh praktisi industri ahli untuk akselerasi karier dan bisnis Anda.',
      features: [
        'Panduan Praktis Langkah demi Langkah',
        'Template & Checklist Siap Pakai',
        'Akses Selamanya & Update Gratis',
        'Format PDF & ePub untuk Semua Device',
        'Studi Kasus Nyata Industri Lokal',
        'Disertai File Latihan Eksklusif'
      ],
      pricing: 'Mulai Rp 49.000 / e-book',
      waText: 'Halo Berdikari Digital Nusantara, saya tertarik dengan produk E-Book Premium Bisnis & IT.'
    },
    langganan: {
      title: 'Layanan Berlangganan Aplikasi (SaaS)',
      icon: <CreditCard size={20} className="text-red" />,
      desc: 'Gunakan software bisnis siap pakai berkualitas tinggi tanpa biaya pengembangan awal yang mahal.',
      features: [
        'Sistem Kasir (POS) & Inventaris Toko',
        'Sistem HRD & Absensi Karyawan Online',
        'CRM & Manajemen Pelanggan Ringkas',
        'Server Cloud Aman & Backup Harian',
        'Dukungan Teknis Premium 24/7',
        'Update Fitur Berkala Tanpa Biaya Tambahan'
      ],
      pricing: 'Mulai Rp 149.000 / bulan',
      waText: 'Halo Berdikari Digital Nusantara, saya tertarik dengan Layanan Berlangganan Aplikasi (SaaS).'
    }
  };

  const activeProduct = subProducts[activeSubTab];

  const getWhatsAppLink = (text: string) => {
    return `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="services" className="services-section">
      <div className="glow-orb services-glow"></div>
      
      <div className="container">
        <div className="section-title">
          <h2>Layanan Unggulan Kami</h2>
          <p>
            Berdikari Digital Nusantara menyediakan solusi teknologi modern terintegrasi untuk membantu 
            akselerasi digital dan kemandirian bisnis Anda.
          </p>
          <div className="accent-bar"></div>
        </div>

        <div className="services-grid">
          {servicesList.map((service, index) => {
            const isDigital = service.id === 'digital_product';
            return (
              <div 
                key={index} 
                className={`card-glass service-card ${isDigital ? 'glow-glow-card cursor-pointer' : ''}`}
                onClick={isDigital ? () => setShowDigitalModal(true) : undefined}
                style={isDigital ? { border: '1.5px solid rgba(229, 62, 62, 0.25)' } : undefined}
              >
                <div className="service-icon-box">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                
                {isDigital ? (
                  <button 
                    className="service-link-btn" 
                    onClick={(e) => { e.stopPropagation(); setShowDigitalModal(true); }}
                  >
                    {service.actionText}
                  </button>
                ) : (
                  <a href={service.link} className="service-link">
                    {service.actionText}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MOCK/FRONTEND MODAL FOR DIGITAL PRODUCTS --- */}
      {showDigitalModal && (
        <div className="modal-backdrop" onClick={() => setShowDigitalModal(false)}>
          <div className="modal-content card-glass digital-product-modal animate-zoom-in" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setShowDigitalModal(false)}
              aria-label="Tutup Pilihan Produk"
            >
              <X size={20} />
            </button>

            <div className="modal-inner">
              <h2 className="modal-inner-title">Pilih Produk Digital Terbaik Anda</h2>
              <p className="modal-inner-desc">Silakan pilih kategori produk digital siap guna di bawah ini untuk melihat fitur dan paket penawaran kami.</p>

              {/* Sub-tab selection */}
              <div className="modal-tabs">
                <button 
                  className={`tab-btn ${activeSubTab === 'undangan' ? 'active' : ''}`}
                  onClick={() => setActiveSubTab('undangan')}
                >
                  <MessageSquare size={16} />
                  <span>Undangan Digital</span>
                </button>
                <button 
                  className={`tab-btn ${activeSubTab === 'ebook' ? 'active' : ''}`}
                  onClick={() => setActiveSubTab('ebook')}
                >
                  <BookOpen size={16} />
                  <span>E-Book Premium</span>
                </button>
                <button 
                  className={`tab-btn ${activeSubTab === 'langganan' ? 'active' : ''}`}
                  onClick={() => setActiveSubTab('langganan')}
                >
                  <CreditCard size={16} />
                  <span>Langganan Aplikasi</span>
                </button>
              </div>

              {/* Active Product Panel */}
              <div className="product-panel">
                <div className="panel-info">
                  <div className="panel-header">
                    <div className="panel-icon-box">{activeProduct.icon}</div>
                    <h3>{activeProduct.title}</h3>
                  </div>
                  <p className="panel-desc">{activeProduct.desc}</p>
                  
                  <div className="pricing-box">
                    <span className="price-label">Biaya Investasi:</span>
                    <h4 className="price-value">{activeProduct.pricing}</h4>
                  </div>

                  <a 
                    href={getWhatsAppLink(activeProduct.waText)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary w-full panel-cta-btn"
                  >
                    Pesan Produk Ini Sekarang <ArrowRight size={16} style={{ marginLeft: 8 }} />
                  </a>
                </div>

                <div className="panel-features-box">
                  <h5>Fitur & Keunggulan Utama:</h5>
                  <ul className="features-list">
                    {activeProduct.features.map((feat, idx) => (
                      <li key={idx} className="feat-item">
                        <div className="feat-check"><Check size={14} /></div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

        .service-link, .service-link-btn {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: var(--transition-fast);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .service-card:hover .service-link, .service-card:hover .service-link-btn {
          color: var(--primary);
          padding-left: 6px;
        }

        /* Modal Styles */
        .digital-product-modal {
          width: 100%;
          max-width: 800px;
          background: #ffffff;
          padding: 0;
          border-radius: 20px;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: #ffffff;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
          transform: rotate(90deg);
        }

        .modal-inner {
          padding: 40px;
        }

        @media (max-width: 576px) {
          .modal-inner {
            padding: 24px 20px;
          }
        }

        .modal-inner-title {
          font-size: 1.75rem;
          font-weight: 850;
          color: var(--text-primary);
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .modal-inner-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 30px;
        }

        .modal-tabs {
          display: flex;
          gap: 12px;
          border-bottom: 1px solid var(--border-active);
          padding-bottom: 12px;
          margin-bottom: 30px;
          overflow-x: auto;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 8px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-secondary);
          font-weight: 600;
          font-family: var(--font-heading);
          cursor: pointer;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }

        .tab-btn:hover {
          color: var(--primary);
          background: rgba(229, 62, 62, 0.02);
        }

        .tab-btn.active {
          background: rgba(229, 62, 62, 0.05);
          border-color: rgba(229, 62, 62, 0.15);
          color: var(--primary);
        }

        .product-panel {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          text-align: left;
        }

        @media (max-width: 768px) {
          .product-panel {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .panel-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background: rgba(229, 62, 62, 0.05);
          border: 1px solid rgba(229, 62, 62, 0.1);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .panel-header h3 {
          font-size: 1.35rem;
          color: var(--text-primary);
          font-weight: 800;
        }

        .panel-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .pricing-box {
          margin-bottom: 24px;
          padding: 16px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid var(--border);
        }

        .price-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }

        .price-value {
          font-size: 1.25rem;
          color: var(--primary);
          font-weight: 800;
          font-family: var(--font-heading);
        }

        .panel-features-box h5 {
          font-size: 0.95rem;
          font-weight: 750;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feat-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .feat-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .panel-cta-btn {
          padding: 14px 24px;
          font-size: 0.95rem;
        }
      `}</style>
    </section>
  );
}
