import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Play, Lock, Calendar, Building2, Award, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
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
        const res = await fetch(`/api/portfolios/by-slug/${slug}?t=${Date.now()}`);
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

      <div className="container">
        {/* Back Link Header */}
        <div className="detail-navigation-bar">
          <a href="/portfolio.html" className="back-link">
            <ArrowLeft size={18} />
            <span>Kembali ke Portofolio</span>
          </a>
        </div>

        {/* Hero Header Area */}
        <div className="detail-header-card card-glass">
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
          <div className="detail-visual-column">
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

            {/* Testimonial Quote */}
            <div className="detail-testimonial-card card-glass">
              <span className="quote-mark">“</span>
              <p className="testimonial-text">
                {project.testimonialText || 'Proses development yang sangat cepat, profesional, dan transparan sehingga kami dapat dengan mudah menyampaikan apa yang kami inginkan.'}
              </p>
              <div className="testimonial-author-box">
                <div className="avatar-placeholder">💼</div>
                <div>
                  <h4>{project.testimonialAuthor || `${project.client} IT Coordinator`}</h4>
                  <small>Verifikasi Klien Resmi</small>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Case Study Details */}
          <div className="detail-content-column">
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

            {/* Results / Business Impact Showcase */}
            <div className="detail-results-card card-glass">
              <h3>Dampak Bisnis & Hasil Nyata</h3>
              <div className="results-metrics-grid">
                <div className="metric-box">
                  <span className="metric-value">{project.stat1Val || '24/7'}</span>
                  <span className="metric-label">{project.stat1Label || 'Layanan Otomatis'}</span>
                  <p className="metric-desc">{project.stat1Desc || 'Sistem siap sedia diakses tanpa batasan jam kerja.'}</p>
                </div>
                <div className="metric-box">
                  <span className="metric-value">{project.stat2Val || '35+'}</span>
                  <span className="metric-label">{project.stat2Label || 'Modul Terintegrasi'}</span>
                  <p className="metric-desc">{project.stat2Desc || 'Mengintegrasikan data secara luas dan adaptif.'}</p>
                </div>
                <div className="metric-box">
                  <span className="metric-value">{project.stat3Val || '50%'}</span>
                  <span className="metric-label">{project.stat3Label || 'Efisiensi Waktu'}</span>
                  <p className="metric-desc">{project.stat3Desc || 'Mengurangi beban kerja tim operasional secara manual.'}</p>
                </div>
              </div>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="detail-challenge-solution-card card-glass">
              <div className="case-block block-challenge">
                <div className="block-header text-red">
                  <Award size={18} className="block-icon" />
                  <h4>Tantangan Utama (Sebelum Migrasi)</h4>
                </div>
                <p>{project.challengeDetailed || project.challenge}</p>
              </div>

              <div className="case-block block-solution">
                <div className="block-header text-green">
                  <CheckCircle2 size={18} className="block-icon" />
                  <h4>Solusi Cerdas Kami</h4>
                </div>
                <p>{project.solutionDetailed || project.solution}</p>
              </div>
            </div>

            {/* Importance and Client Info Block */}
            <div className="detail-importance-card card-glass">
              <h3>Mengapa Proyek Ini Penting?</h3>
              <p className="importance-text">
                {project.projectImportance || project.shortDesc}
              </p>
              <div className="accent-bar-left"></div>
              <div className="client-info-block">
                <h5>Tentang Klien / Mitra Perusahaan:</h5>
                <p>{project.clientInfo || `Proyek digitalisasi ini dikembangkan secara kustom untuk mendukung operational dan efisiensi jangka panjang dari ${project.client}.`}</p>
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
          background-color: var(--bg-dark);
          position: relative;
          overflow: hidden;
          padding: 40px 0 100px;
          min-height: 100vh;
        }

        .detail-glow-1 {
          top: 5%;
          left: -10%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.03) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .detail-glow-2 {
          bottom: 10%;
          right: -10%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.02) 0%, rgba(255, 255, 255, 0) 70%);
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
          color: var(--text-secondary);
          text-decoration: none;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          transition: color var(--transition-fast), transform var(--transition-fast);
        }

        .back-link:hover {
          color: var(--primary);
          transform: translateX(-4px);
        }

        /* Header Card */
        .detail-header-card {
          margin-bottom: 40px;
          position: relative;
          z-index: 10;
        }

        .detail-category-badge {
          background: linear-gradient(135deg, var(--primary) 0%, #ff6b6b 100%);
          color: white;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.05em;
          display: inline-block;
          margin-bottom: 16px;
          text-transform: uppercase;
        }

        .detail-main-title {
          font-family: var(--font-heading);
          font-size: 2.25rem;
          font-weight: 900;
          line-height: 1.15;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }

        .detail-sub-desc {
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 24px;
          max-width: 800px;
        }

        .detail-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          border-top: 1px solid rgba(229, 62, 62, 0.05);
          padding-top: 20px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .meta-item svg {
          color: var(--primary);
        }

        .meta-label {
          color: var(--text-muted);
          font-weight: 500;
        }

        .meta-value {
          font-weight: 700;
          color: var(--text-primary);
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
            grid-template-columns: 1.1fr 1fr;
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
          height: 380px;
          border-radius: 16px;
          overflow: hidden;
          background: #090d16;
          border: 1px solid rgba(229, 62, 62, 0.06);
          position: relative;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.04);
        }

        .showcase-image, .showcase-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .showcase-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .detail-media-strip {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 4px 0;
          scrollbar-width: thin;
        }

        .detail-media-thumb {
          width: 80px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: all var(--transition-fast);
        }

        .detail-media-thumb:hover {
          transform: translateY(-2px);
        }

        .detail-media-thumb.active {
          border-color: var(--primary);
          box-shadow: 0 0 10px rgba(229, 62, 62, 0.25);
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
          opacity: 0.6;
        }

        .play-icon-mini {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 14px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .detail-tech-card h3, .detail-testimonial-card h3, .detail-action-card h3, 
        .detail-results-card h3, .detail-challenge-solution-card h3, .detail-importance-card h3 {
          font-size: 1.125rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .tech-badge-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .detail-tech-badge {
          background: rgba(229, 62, 62, 0.03);
          border: 1px solid rgba(229, 62, 62, 0.08);
          color: var(--primary);
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .detail-tech-badge:hover {
          background: rgba(229, 62, 62, 0.08);
          border-color: rgba(229, 62, 62, 0.2);
          transform: translateY(-1px);
        }

        .detail-testimonial-card {
          position: relative;
          background: linear-gradient(135deg, rgba(229, 62, 62, 0.01) 0%, rgba(255, 255, 255, 0) 100%);
        }

        .quote-mark {
          position: absolute;
          top: 10px;
          left: 20px;
          font-size: 3.5rem;
          color: rgba(229, 62, 62, 0.05);
          font-family: serif;
          line-height: 1;
        }

        .testimonial-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          font-style: italic;
          position: relative;
          z-index: 2;
          margin-bottom: 20px;
          padding-left: 12px;
        }

        .testimonial-author-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-left: 12px;
        }

        .avatar-placeholder {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(229, 62, 62, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }

        .testimonial-author-box h4 {
          font-size: 0.9rem;
          font-weight: 700;
          margin: 0;
        }

        .testimonial-author-box small {
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        /* Right Column */
        .detail-content-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Action Panel styling */
        .detail-action-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .action-buttons-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @media (min-width: 640px) {
          .action-buttons-wrapper {
            flex-direction: row;
          }
        }

        .action-buttons-wrapper .btn {
          flex: 1;
          padding: 14px 20px;
          font-size: 0.9rem;
        }

        .live-link-btn {
          background-color: var(--white);
          border-color: rgba(15, 23, 42, 0.1);
          color: var(--text-primary);
        }

        .live-link-btn:hover:not(.disabled) {
          border-color: var(--primary);
          color: var(--primary);
        }

        /* Style for disabled / private link */
        .live-link-btn.disabled {
          background-color: #f1f5f9;
          border-color: #e2e8f0;
          color: #94a3b8 !important;
          cursor: not-allowed;
          box-shadow: none !important;
          transform: none !important;
          opacity: 0.8;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
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
          background: var(--white);
          border: 1px solid rgba(229, 62, 62, 0.04);
          border-radius: 12px;
          padding: 20px 12px;
          text-align: center;
          transition: all var(--transition-normal);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.005);
        }

        .metric-box:hover {
          transform: translateY(-4px);
          border-color: rgba(229, 62, 62, 0.12);
          box-shadow: 0 10px 20px rgba(229, 62, 62, 0.04);
        }

        .metric-value {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 8px;
        }

        .metric-label {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .metric-desc {
          font-size: 0.72rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0;
        }

        /* Challenge & Solution */
        .case-block {
          padding: 16px 0;
        }

        .case-block:first-child {
          border-bottom: 1px solid rgba(229, 62, 62, 0.05);
          padding-top: 0;
          padding-bottom: 20px;
        }

        .case-block:last-child {
          padding-bottom: 0;
          padding-top: 20px;
        }

        .block-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .block-header h4 {
          font-size: 0.95rem;
          font-weight: 800;
          margin: 0;
        }

        .block-icon {
          flex-shrink: 0;
        }

        .text-red {
          color: #ef4444;
        }

        .text-green {
          color: #10b981;
        }

        .case-block p {
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Importance Card */
        .detail-importance-card {
          position: relative;
        }

        .importance-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .accent-bar-left {
          width: 4px;
          height: 40px;
          background: linear-gradient(to bottom, var(--primary), #ff6b6b);
          position: absolute;
          left: 0;
          border-radius: 2px;
        }

        .client-info-block {
          border-top: 1px solid rgba(229, 62, 62, 0.05);
          padding-top: 16px;
          margin-top: 16px;
        }

        .client-info-block h5 {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .client-info-block p {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-secondary);
          margin: 0;
        }
      `}</style>
    </section>
  );
}
