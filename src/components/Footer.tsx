import { Mail, Phone, MapPin, Clock, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-creative-section">
      <div className="container footer-content-grid">
        {/* Brand & Mission Column */}
        <div className="footer-brand-col">
          <a href="/index.html" className="footer-brand-logo">
            <img src="/logo.png" alt="Berdikari Logo" className="footer-logo-img" />
            <div className="footer-logo-text">
              <span className="brand-name">Berdikari<span className="text-red">.</span></span>
              <span className="brand-tag">Digital Nusantara</span>
            </div>
          </a>

          <p className="footer-mission-text">
            Software house andal yang berdedikasi membangun kemandirian teknologi bangsa. Kami merancang website kilat, aplikasi mobile tangguh, dan otomatisasi cerdas berstandar industri.
          </p>

          <div className="footer-social-row">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-pill-btn" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-pill-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-pill-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="social-pill-btn" aria-label="WhatsApp">
              <Phone size={16} />
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Jelajahi</h4>
          <ul className="footer-nav-list">
            <li><a href="/index.html">Beranda</a></li>
            <li><a href="/services.html">Layanan &amp; Solusi</a></li>
            <li><a href="/portfolio.html">Koleksi Portofolio</a></li>
            <li><a href="/index.html#pricing">Paket Investasi</a></li>
            <li><a href="/news.html">Kabar &amp; Wawasan</a></li>
            <li><a href="/about.html">Tentang Berdikari</a></li>
          </ul>
        </div>

        {/* Services Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Layanan Kami</h4>
          <ul className="footer-nav-list">
            <li><a href="/services.html">Jasa Pembuatan Website</a></li>
            <li><a href="/services.html">Aplikasi Mobile iOS &amp; Android</a></li>
            <li><a href="/services.html">UI/UX Design Prototipe</a></li>
            <li><a href="/services.html">AI Chatbot &amp; Otomasi n8n</a></li>
            <li><a href="/services.html">Cloud Server &amp; Pemeliharaan</a></li>
            <li><a href="/contact.html">Konsultasi Khusus Proyek</a></li>
          </ul>
        </div>

        {/* Contact Info & Circular Seal Badge */}
        <div className="footer-contact-col">
          <h4 className="footer-col-title">Hubungi Kami</h4>
          <div className="footer-contact-list">
            <a href="mailto:kontak@berdikari.com" className="footer-contact-item">
              <Mail size={16} className="contact-icon text-red" />
              <span>kontak@berdikari.com</span>
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
              <Phone size={16} className="contact-icon text-red" />
              <span>+62 812-3456-7890</span>
            </a>
            <div className="footer-contact-item">
              <MapPin size={16} className="contact-icon text-red" />
              <span>Jakarta Selatan, DKI Jakarta, ID</span>
            </div>
            <div className="footer-contact-item">
              <Clock size={16} className="contact-icon text-red" />
              <span>Sen - Jum: 09:00 - 18:00 WIB</span>
            </div>
          </div>

          {/* Circular Seal Badge (Like the reference image) */}
          <div className="footer-seal-card">
            <div className="seal-circle">
              <Heart size={20} className="seal-heart-icon" />
              <span className="seal-text-top">BERDIKARI</span>
              <span className="seal-text-sub">Merah Putih Membangun Negeri</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-bar-container">
          <div className="copyright-notice">
            &copy; {currentYear} Berdikari Digital Nusantara. Seluruh Hak Cipta Dilindungi.
          </div>
          <div className="legal-links">
            <a href="/about.html">Kebijakan Privasi</a>
            <span className="sep">•</span>
            <a href="/contact.html">Syarat &amp; Ketentuan</a>
            <span className="sep">•</span>
            <a href="/about.html">Standar Mutu ISO Ready</a>
          </div>
        </div>
      </div>

      <style>{`
        /* ===== Creative Footer Container ===== */
        .footer-creative-section {
          background-color: #0b1120;
          color: #94a3b8;
          padding-top: 80px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          z-index: 10;
        }

        .footer-content-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.9fr 1.1fr 1.2fr;
          gap: 48px;
          margin-bottom: 60px;
          text-align: left;
        }

        /* ===== Brand Column ===== */
        .footer-brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 18px;
        }

        .footer-logo-img {
          height: 38px;
          object-fit: contain;
        }

        .footer-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 900;
          color: #ffffff;
        }

        .brand-tag {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #64748b;
        }

        .footer-mission-text {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.65;
          margin-bottom: 24px;
          max-width: 360px;
        }

        .footer-social-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .social-pill-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .social-pill-btn:hover {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
          transform: translateY(-3px);
          box-shadow: 0 4px 14px rgba(229, 62, 62, 0.35);
        }

        /* ===== Column Titles & Nav ===== */
        .footer-col-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 22px;
          letter-spacing: -0.01em;
        }

        .footer-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-nav-list a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          display: inline-block;
        }

        .footer-nav-list a:hover {
          color: #ffffff;
          transform: translateX(4px);
        }

        /* ===== Contact Column ===== */
        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 24px;
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.88rem;
          transition: color 0.2s ease;
        }

        .footer-contact-item:hover {
          color: #ffffff;
        }

        .contact-icon {
          flex-shrink: 0;
        }

        /* ===== Circular Seal Badge ===== */
        .footer-seal-card {
          margin-top: 10px;
        }

        .seal-circle {
          background: rgba(229, 62, 62, 0.12);
          border: 1.5px dashed rgba(229, 62, 62, 0.4);
          border-radius: 20px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 4px;
          max-width: 240px;
        }

        .seal-heart-icon {
          color: var(--primary);
          animation: heartBeat 2s infinite ease-in-out;
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .seal-text-top {
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: #ffffff;
          text-transform: uppercase;
        }

        .seal-text-sub {
          font-family: var(--font-cursive);
          font-size: 0.95rem;
          color: #fca5a5;
        }

        /* ===== Bottom Bar ===== */
        .footer-bottom-bar {
          background: #070c18;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 24px 0;
          font-size: 0.82rem;
          color: #64748b;
        }

        .bottom-bar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .legal-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .legal-links a {
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .legal-links a:hover {
          color: #ffffff;
        }

        .sep {
          color: #334155;
        }

        /* Responsive Breakpoints */
        @media (max-width: 991px) {
          .footer-content-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 600px) {
          .footer-content-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .bottom-bar-container {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
