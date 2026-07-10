
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        {/* Brand Info Column */}
        <div className="footer-brand-col">
          <a href="/index.html" className="footer-logo">
            <img src="/logo.png" alt="Logo" className="logo-img" style={{ height: '36px', objectFit: 'contain', marginRight: '8px' }} />
            <span>Berdikari<span className="text-red"> Digital Nusantara</span></span>
          </a>
          <p className="footer-about-text">
            Berdikari Digital Nusantara menyediakan layanan rekayasa perangkat lunak, pembuatan website premium, 
            aplikasi mobile berkualitas tinggi, otomasi kecerdasan buatan (AI), serta berbagai produk digital siap guna.
          </p>
          <div className="social-links-grid">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-circle-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-circle-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-circle-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-circle-link" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="footer-nav-col">
          <h4 className="footer-heading">Peta Situs</h4>
          <ul className="footer-links-list">
            <li><a href="/index.html">Beranda</a></li>
            <li><a href="/services.html">Layanan</a></li>
            <li><a href="/portfolio.html">Portofolio</a></li>
            <li><a href="/index.html#activities-section">Berita &amp; Kegiatan</a></li>
            <li><a href="/about.html">Tentang Kami</a></li>
            <li><a href="/contact.html">Kontak</a></li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="footer-nav-col">
          <h4 className="footer-heading">Layanan Kami</h4>
          <ul className="footer-links-list">
            <li><a href="/services.html">Website Development</a></li>
            <li><a href="/services.html">Mobile App Development</a></li>
            <li><a href="/services.html">UI/UX Design Prototipe</a></li>
            <li><a href="/services.html">AI Otomatisasi &amp; Agen Pintar</a></li>
            <li><a href="/services.html">Produk Digital Mandiri</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-container">
          <span className="copyright-text">
            &copy; {currentYear} Berdikari Digital Nusantara. Seluruh Hak Cipta Dilindungi.
          </span>
          <div className="bottom-links">
            <a href="#privacy" className="bottom-link">Kebijakan Privasi</a>
            <span className="divider-dot"></span>
            <a href="#terms" className="bottom-link">Syarat &amp; Ketentuan</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-section {
          background-color: #f8fafc;
          border-top: 1px solid var(--border);
          padding-top: 80px;
          position: relative;
          z-index: 10;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
          text-align: left;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* Brand Column */
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .footer-about-text {
          font-size: 0.925rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
          max-width: 380px;
        }

        .social-links-grid {
          display: flex;
          gap: 12px;
        }

        .social-circle-link {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.02);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-normal);
          text-decoration: none;
        }

        .social-circle-link:hover {
          background-color: var(--primary);
          color: var(--white);
          border-color: var(--primary);
          transform: translateY(-3px);
          box-shadow: 0 0 10px var(--primary-glow);
        }

        /* Nav Columns */
        .footer-heading {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 24px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links-list a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: var(--transition-fast);
        }

        .footer-links-list a:hover {
          color: var(--primary);
          padding-left: 4px;
        }

        /* Bottom Bar */
        .footer-bottom-bar {
          border-top: 1px solid rgba(15, 23, 42, 0.04);
          padding: 24px 0;
          background-color: #f1f5f9;
        }

        .bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        @media (max-width: 480px) {
          .bottom-container {
            flex-direction: column;
            text-align: center;
          }
        }

        .copyright-text {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .bottom-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bottom-link {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.85rem;
          transition: var(--transition-fast);
        }

        .bottom-link:hover {
          color: var(--primary);
        }

        .divider-dot {
          width: 4px;
          height: 4px;
          background-color: var(--text-muted);
          border-radius: 50%;
        }
      `}</style>
    </footer>
  );
}
