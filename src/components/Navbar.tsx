import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    // Scroll tracker
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Pathname tracker for active styles
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html' || path.endsWith('/') || path.endsWith('index.html')) {
      setActivePath('/index.html');
    } else if (path.includes('services')) {
      setActivePath('/services.html');
    } else if (path.includes('portfolio')) {
      setActivePath('/portfolio.html');
    } else if (path.includes('about')) {
      setActivePath('/about.html');
    } else if (path.includes('contact')) {
      setActivePath('/contact.html');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', to: '/index.html' },
    { name: 'Layanan', to: '/services.html' },
    { name: 'Portofolio', to: '/portfolio.html' },
    { name: 'Berita', to: '/index.html#activities-section' },
    { name: 'Tentang Kami', to: '/about.html' },
    { name: 'Kontak', to: '/contact.html' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="/index.html" className="logo" onClick={() => setIsOpen(false)} aria-label="Berdikari Digital Nusantara Home">
          <img src="/logo.png" alt="Logo" className="logo-img" style={{ height: '36px', objectFit: 'contain', marginRight: '8px' }} />
          <span>Berdikari<span className="text-red"> Digital Nusantara</span></span>
        </a>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className={`nav-link ${activePath === link.to ? 'active' : ''}`}
            >
              {link.name}
            </a>
          ))}
          <a href="/contact.html" className="btn btn-primary btn-sm-nav">
            Mulai Proyek
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`nav-drawer-mobile ${isOpen ? 'open' : ''}`}>
        <div className="drawer-links">
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className={`drawer-link ${activePath === link.to ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="/contact.html"
            className="btn btn-primary w-full"
            onClick={() => setIsOpen(false)}
          >
            Mulai Proyek
          </a>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: var(--transition-normal);
          border-bottom: 1px solid transparent;
          background: transparent;
        }

        .navbar.scrolled {
          height: 70px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }

        @media (max-width: 480px) {
          .logo {
            font-size: 1.05rem;
          }
        }

        .logo-icon {
          color: var(--primary);
          flex-shrink: 0;
        }

        .text-red {
          color: var(--primary);
        }

        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        @media (max-width: 991px) {
          .nav-links-desktop {
            display: none;
          }
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: var(--transition-fast);
          position: relative;
          padding: 8px 0;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary);
          transition: var(--transition-normal);
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .btn-sm-nav {
          padding: 8px 20px;
          font-size: 0.9rem;
        }

        .mobile-toggle {
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          display: none;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 6px;
          transition: var(--transition-fast);
        }

        .mobile-toggle:hover {
          background: rgba(15, 23, 42, 0.05);
        }

        @media (max-width: 991px) {
          .mobile-toggle {
            display: flex;
          }
        }

        /* Mobile Drawer */
        .nav-drawer-mobile {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: var(--bg-dark);
          border-bottom: 1px solid var(--border);
          padding: 24px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: var(--transition-normal);
          z-index: 999;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .navbar.scrolled + .nav-drawer-mobile {
          top: 70px;
        }

        .nav-drawer-mobile.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .drawer-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .drawer-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
          transition: var(--transition-fast);
          text-align: left;
        }

        .drawer-link:hover, .drawer-link.active {
          color: var(--primary);
          border-color: var(--primary);
          padding-left: 8px;
        }

        .w-full {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}
