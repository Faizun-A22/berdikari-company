import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Play, Lock, Building2, AlertTriangle, RefreshCw } from 'lucide-react';
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
    <section className="creative-detail-section">
      <div className="creative-bg-accent"></div>

      <div className="container relative z-10">
        {/* Minimal Navigation */}
        <div className="creative-nav animate-reveal-down">
          <a href="/portfolio.html" className="creative-back-btn group">
            <div className="icon-circle">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span>Kembali ke Portofolio</span>
          </a>
        </div>

        {/* Editorial Hero Area */}
        <div className="creative-hero-area">
          <div className="hero-content animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            <div className="hero-badge-wrap">
              <span className="creative-badge">{project.categoryLabel}</span>
              <span className="hero-year">{project.year}</span>
            </div>
            <h1 className="creative-title">{project.title}</h1>
            <p className="creative-desc">{project.shortDesc}</p>
          </div>
        </div>

        {/* Asymmetric Split Layout */}
        <div className="creative-split-layout">
          {/* Left Column: Visual Showcase (Sticky) */}
          <div className="creative-visual-col animate-reveal-up" style={{ animationDelay: '0.2s' }}>
            <div className="creative-showcase float-hover">
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

            {/* Thumbnail Navigation */}
            {project.media && project.media.length > 1 && (
              <div className="creative-media-strip">
                {project.media.map((item, idx) => (
                  <div
                    key={idx}
                    className={`creative-thumb ${activeMedia?.url === item.url ? 'active' : ''}`}
                    onClick={() => setActiveMedia(item)}
                  >
                    {item.type === 'image' ? (
                      <img src={item.url} alt={`Thumbnail ${idx + 1}`} />
                    ) : (
                      <div className="video-thumb-overlay">
                        <video src={item.url} muted />
                        <span className="play-icon-mini">
                          <Play size={14} fill="white" />
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information Flow */}
          <div className="creative-info-col animate-reveal-up" style={{ animationDelay: '0.3s' }}>
            
            <div className="info-block glass-card">
              <h3 className="block-title">Klien & Tantangan</h3>
              <div className="client-info mb-6">
                <Building2 size={18} className="text-red-600" />
                <span className="font-semibold text-slate-800">{project.client}</span>
              </div>
              <p className="block-text">
                Proyek ini ditujukan untuk memberikan solusi inovatif dan modern bagi kebutuhan bisnis klien. 
                Tantangan utamanya adalah menciptakan antarmuka yang sangat menarik namun tetap mempertahankan 
                performa yang cepat dan ringan di semua perangkat.
              </p>
            </div>

            <div className="info-block glass-card">
              <h3 className="block-title">Teknologi Utama</h3>
              <div className="creative-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="creative-tag" style={{ animationDelay: `${0.4 + idx * 0.05}s` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-block glass-card action-block">
              <h3 className="block-title">Jelajahi Karya Ini</h3>
              <p className="block-text mb-6">
                Rasakan langsung bagaimana aplikasi ini berinteraksi. Anda bisa membuka tautan aslinya atau mencoba demo interaktif yang telah kami siapkan.
              </p>
              
              <div className="creative-btn-group">
                <button 
                  onClick={() => setIsDemoOpen(true)}
                  className="creative-btn btn-primary-pill"
                >
                  <Play size={16} fill="white" />
                  <span>Coba Demo Sistem</span>
                </button>

                {project.liveUrl ? (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="creative-btn btn-outline-pill"
                  >
                    <ExternalLink size={16} />
                    <span>Kunjungi Website Asli</span>
                  </a>
                ) : (
                  <button 
                    disabled 
                    className="creative-btn btn-outline-pill disabled"
                    title="Tautan bersifat privat dan internal perusahaan."
                  >
                    <Lock size={16} />
                    <span>Sistem Privat</span>
                  </button>
                )}
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
        .creative-detail-section {
          background-color: #fcfcfd;
          position: relative;
          overflow-x: hidden;
          padding: 80px 0 160px;
          min-height: 100vh;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #1e293b;
        }

        .creative-bg-accent {
          position: absolute;
          top: -20vh;
          right: -10vw;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(220,38,38,0.05) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }

        /* Nav */
        .creative-nav {
          margin-bottom: 60px;
        }

        .creative-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          color: #64748b;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .creative-back-btn:hover {
          color: #dc2626;
        }

        .icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        }

        .creative-back-btn:hover .icon-circle {
          border-color: #fca5a5;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1);
        }

        /* Editorial Hero */
        .creative-hero-area {
          margin-bottom: 80px;
          max-width: 1000px;
        }

        .hero-badge-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .creative-badge {
          background: #dc2626;
          color: white;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 8px 16px;
          border-radius: 30px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          box-shadow: 0 4px 12px rgba(220,38,38,0.2);
        }

        .hero-year {
          color: #94a3b8;
          font-weight: 600;
          font-size: 1rem;
        }

        .creative-title {
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #0f172a;
          margin-bottom: 32px;
        }

        .creative-desc {
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          line-height: 1.6;
          color: #475569;
          max-width: 800px;
        }

        /* Split Layout */
        .creative-split-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }

        @media (min-width: 1024px) {
          .creative-split-layout {
            grid-template-columns: 1.4fr 1fr;
            gap: 64px;
            align-items: start;
          }
        }

        /* Left Visual Column */
        .creative-visual-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: sticky;
          top: 40px;
        }

        .creative-showcase {
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 24px;
          overflow: hidden;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
        }

        .showcase-image, .showcase-video, .showcase-iframe {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .creative-media-strip {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 8px 4px;
          scrollbar-width: none;
        }
        
        .creative-media-strip::-webkit-scrollbar {
          display: none;
        }

        .creative-thumb {
          width: 120px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.5;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .creative-thumb:hover {
          opacity: 0.8;
          transform: translateY(-2px);
        }

        .creative-thumb.active {
          opacity: 1;
          border-color: #dc2626;
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(220,38,38,0.2);
        }

        .creative-thumb img, .creative-thumb video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-thumb-overlay {
          position: relative;
          width: 100%;
          height: 100%;
          background: #000;
        }

        .video-thumb-overlay video {
          opacity: 0.6;
        }

        .play-icon-mini {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 32px;
          height: 32px;
          background: rgba(220,38,38,0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Right Info Column */
        .creative-info-col {
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-top: 20px; /* Offset to feel asymmetric */
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.04), 0 0 0 1px rgba(220,38,38,0.05);
        }

        .block-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .block-title::before {
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #dc2626;
        }

        .client-info {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.1rem;
        }

        .block-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #475569;
        }

        /* Tags */
        .creative-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .creative-tag {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          color: #334155;
          padding: 10px 20px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 2px 5px rgba(0,0,0,0.02);
          transition: all 0.3s ease;
          animation: reveal-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .creative-tag:hover {
          background: #fee2e2;
          color: #dc2626;
          border-color: #fca5a5;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(220,38,38,0.1);
        }

        /* Buttons */
        .creative-btn-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .creative-btn-group {
            flex-direction: row;
          }
        }

        .creative-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 18px 28px;
          border-radius: 40px;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .btn-primary-pill {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          border: none;
          box-shadow: 0 10px 25px -5px rgba(220,38,38,0.4);
        }

        .btn-primary-pill:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 35px -5px rgba(220,38,38,0.5);
        }

        .btn-outline-pill {
          background: white;
          color: #1e293b;
          border: 1px solid #cbd5e1;
          box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        }

        .btn-outline-pill:hover:not(.disabled) {
          border-color: #94a3b8;
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(0,0,0,0.05);
        }

        .btn-outline-pill.disabled {
          background: #f8fafc;
          color: #94a3b8;
          border-color: #e2e8f0;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* CSS Animations (Hardware Accelerated, Very Lightweight) */
        .animate-reveal-up {
          animation: reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-reveal-down {
          animation: reveal-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes reveal-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes reveal-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Float Hover */
        .float-hover {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .float-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
}
