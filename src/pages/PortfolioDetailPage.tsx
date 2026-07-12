import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Play, Lock, Calendar, Building2, AlertTriangle, RefreshCw } from 'lucide-react';
import InteractiveDemoViewer from '../components/InteractiveDemoViewer';

interface Project {
  id: string | number;
  slug: string;
  title: string;
  category: 'web' | 'mobile' | 'uiux';
  categoryLabel: string;
  image: string;
  video?: string;
  media?: { type: 'image' | 'video'; url: string }[];
  shortDesc: string;
  client: string;
  year: string;
  tags: string[];
  challenge: string;
  solution: string;
  results: string;
  demoUrl?: string;
  liveUrl?: string;
  projectImportance?: string;
  clientInfo?: string;
  stat1Val?: string;
  stat1Label?: string;
  stat1Desc?: string;
  stat2Val?: string;
  stat2Label?: string;
  stat2Desc?: string;
  stat3Val?: string;
  stat3Label?: string;
  stat3Desc?: string;
  challengeDetailed?: string;
  solutionDetailed?: string;
  testimonialText?: string;
  testimonialAuthor?: string;
}

export default function PortfolioDetailPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [activeMedia, setActiveMedia] = useState<{ type: 'image' | 'video'; url: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isDemoOpen, setIsDemoOpen] = useState<boolean>(false);

  useEffect(() => {
    // Get slug from URL query parameter
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
      setError('Slug portofolio tidak ditentukan.');
      setIsLoading(false);
      return;
    }

    async function fetchProject() {
      try {
        const res = await fetch(`/api/portfolios/by-slug/${encodeURIComponent(slug || '')}?t=${Date.now()}`);
        if (!res.ok) {
          throw new Error('Portofolio tidak ditemukan.');
        }
        const item = await res.json();
        
        // Map fields to CamelCase format expected
        const mapped: Project = {
          id: item.id,
          slug: item.slug,
          title: item.title,
          category: item.category,
          categoryLabel: item.category_label,
          image: item.image_url,
          video: item.video_url || '',
          media: item.media || (item.image_url ? [{ type: 'image', url: item.image_url }] : []),
          shortDesc: item.short_desc,
          client: item.client,
          year: item.year,
          tags: item.tags,
          challenge: item.challenge,
          solution: item.solution,
          results: item.results,
          demoUrl: item.demo_url || '',
          liveUrl: item.live_url || '',
          projectImportance: item.project_importance || '',
          clientInfo: item.client_info || '',
          stat1Val: item.stat_1_val || '',
          stat1Label: item.stat_1_label || '',
          stat1Desc: item.stat_1_desc || '',
          stat2Val: item.stat_2_val || '',
          stat2Label: item.stat_2_label || '',
          stat2Desc: item.stat_2_desc || '',
          stat3Val: item.stat_3_val || '',
          stat3Label: item.stat_3_label || '',
          stat3Desc: item.stat_3_desc || '',
          challengeDetailed: item.challenge_detailed || '',
          solutionDetailed: item.solution_detailed || '',
          testimonialText: item.testimonial_text || '',
          testimonialAuthor: item.testimonial_author || ''
        };
        
        setProject(mapped);
        if (mapped.media && mapped.media.length > 0) {
          setActiveMedia(mapped.media[0]);
        } else {
          setActiveMedia({ type: 'image', url: mapped.image });
        }
      } catch (err: any) {
        console.error(err);
        setError('Gagal memuat detail portofolio.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, []);

  if (isLoading) {
    return (
      <div className="detail-loading-container">
        <RefreshCw className="animate-spin text-primary" size={36} />
        <p>Memuat detail studi kasus...</p>
        <style>{`
          .detail-loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 120px 20px;
            gap: 16px;
            font-family: var(--font-heading);
            color: var(--text-secondary);
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
            color: var(--primary);
          }
        `}</style>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="detail-error-container container">
        <div className="card-glass error-card">
          <AlertTriangle size={48} className="error-icon" />
          <h3>Detail Proyek Tidak Ditemukan</h3>
          <p>{error || 'Terjadi kesalahan sistem saat memuat data.'}</p>
          <a href="/portfolio.html" className="btn btn-primary">
            <ArrowLeft size={16} /> Kembali ke Portofolio
          </a>
        </div>
        <style>{`
          .detail-error-container {
            padding: 80px 24px;
            display: flex;
            justify-content: center;
          }
          .error-card {
            max-width: 500px;
            width: 100%;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .error-icon {
            color: var(--primary);
          }
        `}</style>
      </div>
    );
  }

  return (
    <section className="detail-section">
      <div className="glow-orb detail-glow-1"></div>
      <div className="glow-orb detail-glow-2"></div>
      <div className="detail-bg-layer" style={{ backgroundImage: `url(${project.image})` }}></div>
      <div className="detail-bg-overlay"></div>

      <div className="container relative" style={{ zIndex: 10 }}>
        {/* Back Link Header */}
        <div className="detail-navigation-bar animate-fade-in-down">
          <a href="/portfolio.html" className="back-link">
            <ArrowLeft size={18} />
            <span>Kembali ke Portofolio</span>
          </a>
        </div>

        {/* Hero Header Area */}
        <div className="detail-header-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="detail-category-badge">{project.categoryLabel}</span>
          <h1 className="detail-main-title gradient-text-expert">{project.title}</h1>
          <p className="detail-sub-desc">{project.shortDesc}</p>
          
          <div className="detail-meta-row">
            <div className="meta-item">
              <Building2 size={16} />
              <span className="meta-label">Klien:</span>
              <span className="meta-value">{project.client}</span>
            </div>
            <div className="meta-item">
              <Calendar size={16} />
              <span className="meta-label">Tahun Proyek:</span>
              <span className="meta-value">{project.year}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Split Layout */}
        <div className="detail-grid-layout">
          {/* LEFT COLUMN: Visual & Assets */}
          <div className="detail-visual-column animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Main Media Showcase */}
            <div className="detail-showcase-box">
              {activeMedia?.type === 'video' ? (
                activeMedia.url.includes('youtube.com') || activeMedia.url.includes('youtu.be') ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={activeMedia.url.includes('embed') ? activeMedia.url : activeMedia.url.replace('watch?v=', 'embed/')}
                    title="Video Demo Proyek"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="showcase-iframe"
                  ></iframe>
                ) : (
                  <video
                    src={activeMedia.url}
                    controls
                    autoPlay
                    muted
                    playsInline
                    className="showcase-video"
                  />
                )
              ) : (
                <img 
                  src={activeMedia?.url || project.image} 
                  alt={project.title} 
                  className="showcase-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              )}
            </div>

            {/* Thumbnail Navigation Strip */}
            {project.media && project.media.length > 1 && (
              <div className="detail-media-strip">
                {project.media.map((item, idx) => (
                  <div
                    key={idx}
                    className={`detail-media-thumb ${activeMedia?.url === item.url ? 'active' : ''}`}
                    onClick={() => setActiveMedia(item)}
                  >
                    {item.type === 'image' ? (
                      <img src={item.url} alt={`Thumbnail ${idx + 1}`} />
                    ) : (
                      <div className="video-thumb-overlay">
                        <video src={item.url} muted />
                        <span className="play-icon-mini">▶</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Technology Badge List */}
            <div className="detail-tech-card card-glass">
              <h3>Teknologi yang Digunakan</h3>
              <div className="tech-badge-container">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="detail-tech-badge">{tag}</span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Case Study Details */}
          <div className="detail-content-column animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {/* Action Control Panel */}
            <div className="detail-action-card card-glass">
              <h3>Demo & Akses Sistem</h3>
              <p>Jelajahi simulasi interaktif dari frontend aplikasi ini atau kunjungi tautan aslinya.</p>
              
              <div className="action-buttons-wrapper">
                {/* 1. Link Asli (Live Url) Conditional Rendering */}
                {project.liveUrl ? (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-secondary live-link-btn"
                  >
                    <ExternalLink size={16} />
                    <span>Kunjungi Link Asli</span>
                  </a>
                ) : (
                  <button 
                    disabled 
                    className="btn btn-secondary live-link-btn disabled"
                    title="Tautan bersifat privat dan internal perusahaan."
                  >
                    <Lock size={16} />
                    <span>Link Asli (Bersifat Pribadi)</span>
                  </button>
                )}

                {/* 2. Link Demo Simulator */}
                <button 
                  onClick={() => setIsDemoOpen(true)}
                  className="btn btn-primary demo-simulator-btn"
                >
                  <Play size={16} fill="white" />
                  <span>Coba Demo Simulator</span>
                </button>
              </div>
            </div>

            {/* Deskripsi Proyek */}
            <div className="detail-importance-card card-glass">
              <h3>Tentang Proyek</h3>
              <p className="importance-text">
                {project.shortDesc}
              </p>
              <div className="accent-bar-left"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Demo Simulator Modal */}
      {isDemoOpen && (
        <InteractiveDemoViewer 
          project={project} 
          onClose={() => setIsDemoOpen(false)} 
        />
      )}

      {/* Styled CSS scoped block */}
      <style>{`
        .detail-section {
          background-color: #020617;
          position: relative;
          overflow: hidden;
          padding: 40px 0 100px;
          min-height: 100vh;
        }

        .detail-bg-layer {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-size: cover;
          background-position: center;
          filter: blur(80px) brightness(0.4) saturate(1.5);
          opacity: 0.5;
          z-index: 1;
          transform: scale(1.1);
        }

        .detail-bg-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(180deg, rgba(2,6,23,0.7) 0%, rgba(2,6,23,1) 100%);
          z-index: 2;
        }

        .detail-glow-1 {
          top: 0%;
          left: -10%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.15) 0%, rgba(255, 255, 255, 0) 60%);
          z-index: 3;
        }

        .detail-glow-2 {
          bottom: 10%;
          right: -10%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(255, 255, 255, 0) 60%);
          z-index: 3;
        }

        /* Base Card Glass Premium */
        .card-glass {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
          padding: 24px;
        }

        .detail-navigation-bar {
          margin-bottom: 24px;
          position: relative;
          z-index: 10;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          padding: 8px 16px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .back-link:hover {
          color: white;
          background: rgba(229, 62, 62, 0.2);
          border-color: rgba(229, 62, 62, 0.5);
          transform: translateX(-4px);
        }

        /* Header Card */
        .detail-header-card {
          margin-bottom: 40px;
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 40px 20px;
          background: radial-gradient(circle at top, rgba(30, 41, 59, 0.5) 0%, transparent 100%);
          border-radius: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .detail-category-badge {
          background: linear-gradient(135deg, #e53e3e 0%, #a855f7 100%);
          color: white;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 16px;
          border-radius: 20px;
          letter-spacing: 0.1em;
          display: inline-block;
          margin-bottom: 20px;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(229, 62, 62, 0.3);
        }

        .detail-main-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.1;
          margin: 0 auto 20px;
          letter-spacing: -0.02em;
          background: linear-gradient(to right, #ffffff, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          max-width: 900px;
        }

        .detail-sub-desc {
          font-size: 1.125rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 auto 32px;
          max-width: 700px;
        }

        .detail-meta-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          background: rgba(0, 0, 0, 0.3);
          padding: 8px 20px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .meta-item svg {
          color: #a855f7;
        }

        .meta-label {
          font-weight: 500;
        }

        .meta-value {
          font-weight: 700;
          color: white;
        }

        /* Grid Layout */
        .detail-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 1024px) {
          .detail-grid-layout {
            grid-template-columns: 1.2fr 1fr;
          }
        }

        /* Visual Column */
        .detail-visual-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .detail-showcase-box {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 20px;
          overflow: hidden;
          background: #000;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .showcase-image, .showcase-video, .showcase-iframe {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: none;
        }

        .detail-media-strip {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 8px 4px;
          scrollbar-width: none;
        }
        
        .detail-media-strip::-webkit-scrollbar {
          display: none;
        }

        .detail-media-thumb {
          width: 120px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          flex-shrink: 0;
          opacity: 0.6;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .detail-media-thumb:hover {
          opacity: 1;
          transform: translateY(-4px);
        }

        .detail-media-thumb.active {
          opacity: 1;
          border-color: #a855f7;
          box-shadow: 0 8px 20px rgba(168, 85, 247, 0.3);
          transform: scale(1.05);
        }

        .detail-media-thumb img, .detail-media-thumb video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-thumb-overlay {
          width: 100%;
          height: 100%;
          position: relative;
          background: #000;
        }

        .video-thumb-overlay video {
          opacity: 0.5;
        }

        .play-icon-mini {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 18px;
        }

        .detail-tech-card h3, .detail-action-card h3, 
        .detail-results-card h3, .detail-challenge-solution-card h3, .detail-importance-card h3 {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .detail-tech-card h3::before, .detail-action-card h3::before, 
        .detail-results-card h3::before, .detail-challenge-solution-card h3::before, .detail-importance-card h3::before {
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e53e3e, #a855f7);
        }

        .tech-badge-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .detail-tech-badge {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.9);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .detail-tech-badge:hover {
          background: rgba(168, 85, 247, 0.15);
          border-color: rgba(168, 85, 247, 0.4);
          transform: translateY(-2px);
          color: white;
        }

        /* Right Column */
        .detail-content-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .detail-action-card p, .importance-text {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 24px;
        }

        .action-buttons-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .action-buttons-wrapper {
            flex-direction: row;
          }
        }

        .action-buttons-wrapper .btn {
          flex: 1;
          padding: 16px 20px;
          font-size: 1rem;
          border-radius: 12px;
          justify-content: center;
          font-weight: 700;
        }

        .live-link-btn {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .live-link-btn:hover:not(.disabled) {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .live-link-btn.disabled {
          background: rgba(0, 0, 0, 0.3);
          border-color: transparent;
          color: rgba(255, 255, 255, 0.3) !important;
          cursor: not-allowed;
          box-shadow: none !important;
        }

        .demo-simulator-btn {
          background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
          border: none;
          box-shadow: 0 10px 20px rgba(229, 62, 62, 0.3);
        }

        .demo-simulator-btn:hover {
          background: linear-gradient(135deg, #fc8181 0%, #e53e3e 100%);
          transform: translateY(-2px);
          box-shadow: 0 15px 25px rgba(229, 62, 62, 0.4);
        }

        /* Results Metrics */
        .results-metrics-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .results-metrics-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .metric-box {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 24px 16px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .metric-box:hover {
          background: rgba(168, 85, 247, 0.05);
          border-color: rgba(168, 85, 247, 0.3);
          transform: translateY(-4px);
        }

        .metric-value {
          display: block;
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 12px;
          background: linear-gradient(to right, #e53e3e, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .metric-label {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }

        .metric-desc {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.5;
        }

        /* Animations */
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(-20px);
        }

        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInDown {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
