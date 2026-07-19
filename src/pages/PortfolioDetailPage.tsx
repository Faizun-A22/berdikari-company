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
          <h1 className="detail-main-title">{project.title}</h1>
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
          </div>

          {/* RIGHT COLUMN: Case Study Details */}
          <div className="detail-content-column animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            
            {/* Technology Badge List */}
            <div className="detail-tech-card clean-card">
              <h3>Teknologi yang Digunakan</h3>
              <div className="tech-badge-container">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="detail-tech-badge">{tag}</span>
                ))}
              </div>
            </div>

            {/* Deskripsi Proyek */}
            <div className="detail-importance-card clean-card">
              <h3>Tentang Proyek</h3>
              <p className="importance-text">
                {project.shortDesc}
              </p>
              <div className="accent-bar-left"></div>
            </div>

            {/* Action Control Panel */}
            <div className="detail-action-card clean-card">
              <h3>Akses Proyek</h3>
              <p>Jelajahi simulasi interaktif dari sistem ini atau kunjungi tautan aslinya.</p>
              
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
                    <span>Kunjungi Website</span>
                  </a>
                ) : (
                  <button 
                    disabled 
                    className="btn btn-secondary live-link-btn disabled"
                    title="Tautan bersifat privat dan internal perusahaan."
                  >
                    <Lock size={16} />
                    <span>Sistem Privat (Internal)</span>
                  </button>
                )}

                {/* 2. Link Demo Simulator */}
                <button 
                  onClick={() => setIsDemoOpen(true)}
                  className="btn btn-primary demo-simulator-btn"
                >
                  <Play size={16} fill="white" />
                  <span>Coba Demo Sistem</span>
                </button>
              </div>
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
          background-color: #f8fafc; /* Sangat bersih dan modern */
          position: relative;
          overflow: hidden;
          padding: 80px 0 120px;
          min-height: 100vh;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #1e293b;
        }

        /* Clean Card Corporate */
        .clean-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          padding: 32px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .clean-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 10px 10px -5px rgba(220, 38, 38, 0.04);
          border-color: rgba(220, 38, 38, 0.2);
        }

        .detail-navigation-bar {
          margin-bottom: 40px;
          position: relative;
          z-index: 10;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #64748b;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background: #ffffff;
          padding: 10px 20px;
          border-radius: 40px;
          border: 1px solid #cbd5e1;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .back-link:hover {
          color: #dc2626;
          border-color: #dc2626;
          transform: translateX(-4px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1);
        }

        /* Header Card */
        .detail-header-card {
          margin-bottom: 48px;
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 20px;
        }

        .detail-category-badge {
          background: #fee2e2; /* Red 100 */
          color: #dc2626; /* Red 600 */
          font-size: 0.75rem;
          font-weight: 800;
          padding: 8px 20px;
          border-radius: 30px;
          letter-spacing: 0.1em;
          display: inline-block;
          margin-bottom: 24px;
          text-transform: uppercase;
        }

        .detail-main-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          line-height: 1.2;
          margin: 0 auto 24px;
          letter-spacing: -0.02em;
          color: #0f172a;
          max-width: 900px;
        }

        .detail-sub-desc {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #475569;
          margin: 0 auto 40px;
          max-width: 800px;
        }

        .detail-meta-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #475569;
          font-size: 0.95rem;
          background: #ffffff;
          padding: 12px 24px;
          border-radius: 40px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .meta-item svg {
          color: #dc2626;
        }

        .meta-label {
          font-weight: 500;
        }

        .meta-value {
          font-weight: 700;
          color: #0f172a;
        }

        /* Clean Split Column Layout */
        .detail-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 1024px) {
          .detail-grid-layout {
            grid-template-columns: 1.5fr 1fr;
            align-items: start;
          }
        }

        /* Visual Column */
        .detail-visual-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: sticky;
          top: 100px;
        }

        .detail-showcase-box {
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 16px;
          overflow: hidden;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          position: relative;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          transition: transform 0.4s ease;
        }
        
        .detail-showcase-box:hover {
          transform: scale(1.01);
          box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.15);
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
          width: 140px;
          height: 90px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          flex-shrink: 0;
          opacity: 0.6;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .detail-media-thumb:hover {
          opacity: 1;
          transform: translateY(-4px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }

        .detail-media-thumb.active {
          opacity: 1;
          border-color: #dc2626;
          box-shadow: 0 8px 16px rgba(220, 38, 38, 0.2);
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
          font-size: 20px;
        }

        .detail-content-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .detail-tech-card h3, .detail-action-card h3, 
        .detail-importance-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .detail-tech-card h3::before, .detail-action-card h3::before, 
        .detail-importance-card h3::before {
          content: '';
          display: block;
          width: 6px;
          height: 20px;
          border-radius: 4px;
          background: #dc2626;
        }

        .tech-badge-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .detail-tech-badge {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #475569;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .detail-tech-badge:hover {
          background: #fee2e2;
          border-color: #fca5a5;
          color: #dc2626;
          transform: translateY(-2px);
        }

        /* Content Text */
        .detail-action-card p, .importance-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #475569;
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
          padding: 16px 24px;
          font-size: 1rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          cursor: pointer;
          text-decoration: none;
        }

        .live-link-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #334155;
        }

        .live-link-btn:hover:not(.disabled) {
          background: #f8fafc;
          border-color: #94a3b8;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .live-link-btn.disabled {
          background: #f1f5f9;
          color: #94a3b8 !important;
          cursor: not-allowed;
          border: 1px dashed #cbd5e1;
        }

        .demo-simulator-btn {
          background: #dc2626;
          color: white;
          box-shadow: 0 4px 14px 0 rgba(220, 38, 38, 0.39);
        }

        .demo-simulator-btn:hover {
          background: #b91c1c;
          transform: translateY(-4px);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.3);
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
