import { useState, useEffect } from 'react';
import { ArrowLeft, Monitor, Smartphone, Maximize2, AlertTriangle, RefreshCw } from 'lucide-react';

export default function DemoApp() {
  const [demoUrl, setDemoUrl] = useState<string>('');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [projectTitle, setProjectTitle] = useState<string>('Demo Simulator');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
      setError('Slug portofolio tidak ditentukan.');
      setIsLoading(false);
      return;
    }

    async function fetchProject() {
      try {
        const res = await fetch(`/api/portfolios/by-slug/${encodeURIComponent(slug || '')}`);
        if (!res.ok) {
          throw new Error('Portofolio tidak ditemukan.');
        }
        const item = await res.json();
        
        if (item.demo_url) {
          setDemoUrl(item.demo_url);
          setProjectTitle(item.title);
        } else {
          setError('Demo tidak tersedia untuk proyek ini.');
        }
      } catch (err) {
        console.error(err);
        setError('Gagal memuat detail demo.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, []);

  if (isLoading) {
    return (
      <div className="demo-loading">
        <RefreshCw className="animate-spin text-primary" size={32} />
        <p>Memuat Demo Simulator...</p>
      </div>
    );
  }

  if (error || !demoUrl) {
    return (
      <div className="demo-error">
        <AlertTriangle size={48} className="text-red-500 mb-4" />
        <h2>{error || 'Demo tidak tersedia'}</h2>
        <button onClick={() => window.close()} className="btn btn-secondary mt-6">
          Tutup Tab
        </button>
      </div>
    );
  }

  return (
    <div className="demo-container">
      {/* Top Control Bar */}
      <div className="demo-header">
        <div className="header-left">
          <button onClick={() => window.close()} className="back-btn" title="Tutup Demo">
            <ArrowLeft size={18} />
          </button>
          <div className="project-info">
            <span className="badge">LIVE DEMO</span>
            <h1>{projectTitle}</h1>
          </div>
        </div>
        
        <div className="device-toggles">
          <button 
            className={`toggle-btn ${device === 'desktop' ? 'active' : ''}`}
            onClick={() => setDevice('desktop')}
            title="Tampilan Desktop"
          >
            <Monitor size={18} />
          </button>
          <button 
            className={`toggle-btn ${device === 'mobile' ? 'active' : ''}`}
            onClick={() => setDevice('mobile')}
            title="Tampilan Mobile"
          >
            <Smartphone size={18} />
          </button>
        </div>

        <div className="header-right">
          <a href={demoUrl} target="_blank" rel="noreferrer" className="open-full-btn" title="Buka di tab terpisah tanpa simulator">
            <Maximize2 size={16} /> Buka Penuh
          </a>
        </div>
      </div>

      {/* iframe Container */}
      <div className="iframe-wrapper">
        <div className={`iframe-frame ${device}`}>
          <iframe 
            src={demoUrl} 
            title={`Demo ${projectTitle}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: #020617; /* zinc-950 */
          color: #f8fafc;
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow: hidden;
        }

        .demo-loading, .demo-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          padding: 20px;
        }

        .demo-error h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .text-primary {
          color: #e53e3e;
        }

        .text-red-500 {
          color: #ef4444;
        }

        .btn {
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .demo-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          background-color: #0f172a;
          background-image: radial-gradient(circle at 50% -20%, rgba(30, 41, 59, 1), #020617 80%);
        }

        .demo-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          background: rgba(2, 6, 23, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          height: 64px;
          flex-shrink: 0;
        }

        .header-left, .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }
        
        .header-right {
          justify-content: flex-end;
        }

        .back-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-btn:hover {
          background: rgba(229, 62, 62, 0.2);
          border-color: rgba(229, 62, 62, 0.5);
          color: #fca5a5;
        }

        .project-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .badge {
          background: linear-gradient(135deg, #e53e3e, #b91c1c);
          color: white;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 4px 8px;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .project-info h1 {
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 300px;
        }

        .device-toggles {
          display: flex;
          background: rgba(0, 0, 0, 0.4);
          padding: 4px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          gap: 4px;
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 32px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.4);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .toggle-btn:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        .toggle-btn.active {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        .open-full-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
        }

        .open-full-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .iframe-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 24px;
          overflow: hidden;
        }

        .iframe-frame {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .iframe-frame iframe {
          width: 100%;
          height: 100%;
          display: block;
        }

        .iframe-frame.desktop {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }

        .iframe-frame.mobile {
          width: 375px;
          height: 812px;
          border-radius: 40px;
          padding: 12px;
          background: #111;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5), inset 0 0 0 4px #333;
        }

        .iframe-frame.mobile iframe {
          border-radius: 32px;
          background: white;
        }

        @media (max-width: 768px) {
          .header-left .project-info {
            display: none;
          }
          .header-right {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
