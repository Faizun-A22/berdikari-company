import { useState, useEffect } from 'react';
import { Mail, Phone, Clock, Send, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const path = window.location.pathname;
    if (path === '/' || path === '/index.html' || path.endsWith('/') || path.endsWith('index.html')) {
      setActivePath('/index.html');
    } else if (path.includes('services')) {
      setActivePath('/services.html');
    } else if (path.includes('portfolio')) {
      setActivePath('/portfolio.html');
    } else if (path.includes('about')) {
      setActivePath('/about.html');
    } else if (path.includes('news')) {
      setActivePath('/news.html');
    } else if (path.includes('contact')) {
      setActivePath('/contact.html');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', to: '/index.html' },
    { name: 'Layanan', to: '/services.html' },
    { name: 'Portofolio', to: '/portfolio.html' },
    { name: 'Berita', to: '/news.html' },
    { name: 'Tentang Kami', to: '/about.html' },
  ];

  return (
    <header className={`header-wrapper ${isScrolled ? 'is-sticky' : ''}`}>
      {/* Top Announcement & Contact Bar (Just like the reference design) */}
      <div className="top-announcement-bar">
        <div className="container top-bar-container">
          <div className="top-bar-left">
            <a href="mailto:kontak@berdikari.com" className="top-info-item">
              <Mail size={13} className="text-red" />
              <span>kontak@berdikari.com</span>
            </a>
            <span className="top-bar-sep">•</span>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="top-info-item">
              <Phone size={13} className="text-red" />
              <span>+62 812-3456-7890</span>
            </a>
            <span className="top-bar-sep">•</span>
            <div className="top-info-item hide-on-mobile">
              <Clock size={13} className="text-red" />
              <span>Sen - Jum: 09:00 - 18:00 WIB</span>
            </div>
          </div>

          <div className="top-bar-right">
            <div className="status-pill hide-on-tablet">
              <span className="status-dot"></span>
              <span>Status: Menerima Proyek Baru</span>
            </div>
            <div className="top-social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar-main">
        <div className="container nav-container">
          {/* Brand Logo */}
          <a href="/index.html" className="logo" onClick={() => setIsOpen(false)} aria-label="Berdikari Digital Nusantara Home">
            <img src="/logo.png" alt="Logo" className="logo-img" />
            <div className="logo-text-wrap">
              <span className="brand-title">Berdikari<span className="text-red">.</span></span>
              <span className="brand-subtitle">Digital Nusantara</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.to}
                className={`nav-link ${activePath === link.to ? 'active' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="nav-cta-wrapper hide-on-mobile">
            <a href="/contact.html" className="btn-nav-connect">
              <span>Mulai Proyek</span>
              <div className="nav-btn-icon">
                <Send size={13} />
              </div>
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`nav-drawer-mobile ${isOpen ? 'open' : ''}`}>
          <div className="drawer-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.to}
                className={`drawer-link ${activePath === link.to ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="drawer-cta-box">
              <a
                href="/contact.html"
                className="btn-nav-connect w-full"
                onClick={() => setIsOpen(false)}
              >
                <span>Mulai Proyek</span>
                <Send size={14} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        /* ===== Header Wrapper ===== */
        .header-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: #ffffff;
        }

        .header-wrapper.is-sticky {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        /* ===== Top Announcement Bar ===== */
        .top-announcement-bar {
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.78rem;
          color: #64748b;
          padding: 6px 0;
          transition: all 0.25s ease;
        }

        .header-wrapper.is-sticky .top-announcement-bar {
          display: none;
        }

        .top-bar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .top-bar-left, .top-bar-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .top-info-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .top-info-item:hover {
          color: var(--primary);
        }

        .top-bar-sep {
          color: #cbd5e1;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          padding: 2px 10px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: statusPulse 2s infinite;
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .top-social-links {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .top-social-links a {
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .top-social-links a:hover {
          color: var(--primary);
          transform: translateY(-1px);
        }

        /* ===== Main Navbar ===== */
        .navbar-main {
          height: 72px;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(229, 62, 62, 0.08);
          transition: height 0.3s ease;
        }

        .header-wrapper.is-sticky .navbar-main {
          height: 64px;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        /* ===== Logo ===== */
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .logo-img {
          height: 38px;
          object-fit: contain;
          transition: transform 0.25s ease;
        }

        .logo:hover .logo-img {
          transform: scale(1.05);
        }

        .logo-text-wrap {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .brand-title {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.35rem;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .brand-subtitle {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #64748b;
        }

        /* ===== Desktop Nav Links ===== */
        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-link {
          color: #334155;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.925rem;
          position: relative;
          padding: 6px 0;
          transition: color 0.2s ease;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--primary);
          border-radius: 2px;
          transition: all 0.25s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        /* ===== CTA Pill Button ===== */
        .btn-nav-connect {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--primary);
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(229, 62, 62, 0.25);
          transition: all 0.25s ease;
        }

        .btn-nav-connect:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(229, 62, 62, 0.38);
        }

        .nav-btn-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .btn-nav-connect:hover .nav-btn-icon {
          transform: translateX(3px) rotate(-10deg);
        }

        /* ===== Mobile Toggle ===== */
        .mobile-toggle {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #0f172a;
          cursor: pointer;
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        .mobile-toggle:hover {
          background: #fee2e2;
          color: var(--primary);
          border-color: rgba(229, 62, 62, 0.3);
        }

        /* ===== Mobile Navigation Drawer ===== */
        .nav-drawer-mobile {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 24px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-12px);
          transition: all 0.25s ease;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
        }

        .header-wrapper.is-sticky .nav-drawer-mobile {
          top: 64px;
        }

        .nav-drawer-mobile.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .drawer-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .drawer-link {
          color: #334155;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05rem;
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.2s ease;
        }

        .drawer-link:hover, .drawer-link.active {
          color: var(--primary);
          padding-left: 6px;
        }

        .drawer-cta-box {
          margin-top: 10px;
        }

        .w-full {
          width: 100%;
        }

        /* Responsive Breakpoints */
        @media (max-width: 991px) {
          .nav-links-desktop {
            display: none;
          }
          .mobile-toggle {
            display: flex;
          }
          .hide-on-tablet {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .hide-on-mobile {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
