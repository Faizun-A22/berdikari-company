import { useState, useEffect } from 'react';
import { ExternalLink, X, FolderKanban, RefreshCw } from 'lucide-react';

interface Project {
  id: number;
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
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'uiux'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMedia, setActiveMedia] = useState<{ type: 'image' | 'video'; url: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/portfolios');
        if (!res.ok) throw new Error('Gagal mengambil data portofolio.');
        const data = await res.json();
        
        // Map database fields to CamelCase format expected by layout
        const mapped = data.map((item: any) => ({
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
          results: item.results
        }));
        setProjects(mapped);
      } catch (err: any) {
        console.error(err);
        setError('Gagal memuat daftar portofolio.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="glow-orb portfolio-glow"></div>
      
      <div className="container">
        <div className="section-title">
          <h2>Portofolio Proyek Kami</h2>
          <p>
            Jelajahi hasil karya terbaik kami yang menggabungkan keindahan desain visual (UI) 
            dengan pengalaman pengguna (UX) yang solutif.
          </p>
          <div className="accent-bar"></div>
        </div>

        {/* Filter Buttons */}
        <div className="filter-container">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Semua
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
            onClick={() => setActiveFilter('web')}
          >
            Website &amp; Web App
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mobile')}
          >
            Mobile Apps
          </button>
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', gap: '16px' }}>
            <RefreshCw className="animate-spin" style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }} size={32} />
            <p>Memuat portofolio proyek...</p>
          </div>
        )}

        {error && (
          <div style={{ padding: '80px 20px', textAlign: 'center', color: '#ef4444' }}>
            <p>{error}</p>
          </div>
        )}

        {/* Portfolio Grid */}
        {!isLoading && !error && (
          <div className="portfolio-grid">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="portfolio-card"
                onClick={() => {
                  setSelectedProject(project);
                  const mediaList = project.media || (project.image ? [{ type: 'image', url: project.image }] : []);
                  setActiveMedia(mediaList[0] || null);
                }}
              >
                <div className="portfolio-img-box">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="portfolio-img" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="portfolio-overlay">
                    <span className="view-detail-btn">
                      <FolderKanban size={18} /> Detail Proyek
                    </span>
                  </div>
                </div>
                <div className="portfolio-info">
                  <span className="project-category">{project.categoryLabel}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.shortDesc}</p>
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="tag-badge">{tag}</span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="tag-badge">+{project.tags.length - 3} lagi</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => { setSelectedProject(null); setActiveMedia(null); }}>
          <div className="modal-content card-glass" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => { setSelectedProject(null); setActiveMedia(null); }}>
              <X size={24} />
            </button>
            
            <div className="modal-grid">
              <div className="modal-visual" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="main-media-container" style={{ width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden', background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                  {activeMedia?.type === 'video' ? (
                    activeMedia.url.includes('youtube.com') || activeMedia.url.includes('youtu.be') ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={activeMedia.url.includes('embed') ? activeMedia.url : activeMedia.url.replace('watch?v=', 'embed/')}
                        title="Demo Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ width: '100%', height: '100%', border: 'none' }}
                      ></iframe>
                    ) : (
                      <video
                        src={activeMedia.url}
                        controls
                        autoPlay
                        muted
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )
                  ) : (
                    <img 
                      src={activeMedia?.url || selectedProject.image} 
                      alt={selectedProject.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  )}
                </div>
                
                {/* Thumbnails strip */}
                {selectedProject.media && selectedProject.media.length > 1 && (
                  <div className="media-thumbnails-strip" style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '4px 0', scrollbarWidth: 'thin' }}>
                    {selectedProject.media.map((item, idx) => (
                      <div
                        key={idx}
                        className={`media-thumb-card ${activeMedia?.url === item.url ? 'active' : ''}`}
                        onClick={() => setActiveMedia(item)}
                        style={{
                          width: '70px',
                          height: '50px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: activeMedia?.url === item.url ? '2px solid var(--primary)' : '2px solid transparent',
                          boxShadow: activeMedia?.url === item.url ? '0 0 10px rgba(229, 62, 62, 0.4)' : '0 2px 6px rgba(0,0,0,0.15)',
                          background: 'rgba(30, 41, 59, 0.5)',
                          position: 'relative',
                          flexShrink: 0,
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      >
                        {item.type === 'image' ? (
                          <img src={item.url} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', position: 'relative' }}>
                            <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                          </div>
                        )}
                        {item.type === 'video' && (
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: 'white' }}><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="modal-details">
                <div className="modal-header">
                  <span className="project-category">{selectedProject.categoryLabel}</span>
                  <h3 className="modal-title">{selectedProject.title}</h3>
                  
                  <div className="meta-info-bar">
                    <div>
                      <span className="meta-label">Klien:</span>
                      <span className="meta-value">{selectedProject.client}</span>
                    </div>
                    <div>
                      <span className="meta-label">Tahun:</span>
                      <span className="meta-value">{selectedProject.year}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-body">
                  <div className="modal-section-block">
                    <h4><span className="bullet-indicator red-dot"></span>Tantangan Proyek</h4>
                    <p>{selectedProject.challenge}</p>
                  </div>
                  
                  <div className="modal-section-block">
                    <h4><span className="bullet-indicator green-dot"></span>Solusi Kami</h4>
                    <p>{selectedProject.solution}</p>
                  </div>

                  <div className="modal-section-block">
                    <h4><span className="bullet-indicator blue-dot"></span>Dampak Bisnis &amp; Hasil Nyata</h4>
                    <p className="results-highlight-text">{selectedProject.results}</p>
                  </div>
                  
                  <div className="modal-section-block">
                    <h4>Teknologi Yang Digunakan</h4>
                    <div className="project-tags-full">
                      {selectedProject.tags.map((tag, idx) => (
                        <span key={idx} className="tag-badge-lg">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <a href={`/contact.html?ref=${selectedProject.slug}`} className="btn btn-primary btn-sm btn-consult">
                    Konsultasikan Solusi Serupa <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .portfolio-section {
          background-color: var(--bg-dark);
          position: relative;
          overflow: hidden;
        }

        .portfolio-glow {
          bottom: 10%;
          right: 10%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.02) 0%, rgba(255, 255, 255, 0) 70%);
        }

        /* Filter Tabs */
        .filter-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 48px;
          flex-wrap: wrap;
          position: relative;
          z-index: 10;
        }

        .filter-btn {
          background: rgba(15, 23, 42, 0.02);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          padding: 10px 24px;
          border-radius: 30px;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .filter-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
        }

        .filter-btn.active {
          background-color: var(--primary);
          color: var(--white);
          border-color: var(--primary);
          box-shadow: 0 4px 15px rgba(229, 62, 62, 0.2);
        }

        /* Portfolio Grid */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .portfolio-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: var(--transition-normal);
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02), 0 1px 3px rgba(0, 0, 0, 0.01);
        }

        .portfolio-card:hover {
          transform: translateY(-8px);
          border-color: var(--border-active);
          box-shadow: 0 15px 35px rgba(229, 62, 62, 0.06), 0 0 25px rgba(229, 62, 62, 0.02);
        }

        .portfolio-img-box {
          position: relative;
          width: 100%;
          height: 260px;
          overflow: hidden;
          background-color: #f1f5f9;
          border-bottom: 1px solid var(--border);
        }

        .portfolio-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-slow);
        }

        .portfolio-card:hover .portfolio-img {
          transform: scale(1.05);
        }

        .portfolio-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-normal);
        }

        .portfolio-card:hover .portfolio-overlay {
          opacity: 1;
        }

        .view-detail-btn {
          background: var(--text-primary);
          color: var(--white);
          padding: 12px 24px;
          border-radius: 8px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
          transform: translateY(10px);
          transition: var(--transition-normal);
        }

        .portfolio-card:hover .view-detail-btn {
          transform: translateY(0);
        }

        .portfolio-info {
          padding: 24px;
          text-align: left;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-category {
          color: var(--primary);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .project-title {
          font-size: 1.35rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .project-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          line-height: 1.5;
          flex-grow: 1;
        }

        .project-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag-badge {
          background: rgba(15, 23, 42, 0.03);
          border: 1px solid rgba(15, 23, 42, 0.05);
          color: var(--text-secondary);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        /* Modal Details */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
          padding: 24px;
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .modal-content {
          width: 100%;
          max-width: 1000px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 0;
          border-radius: 20px;
          border-color: var(--border);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(15, 23, 42, 0.05);
          border: 1px solid rgba(15, 23, 42, 0.08);
          color: var(--text-primary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
          z-index: 10;
        }

        .modal-close-btn:hover {
          background: var(--primary);
          border-color: var(--primary);
          color: var(--white);
          transform: rotate(90deg);
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          min-height: 500px;
        }

        @media (max-width: 991px) {
          .modal-grid {
            grid-template-columns: 1fr;
          }
        }

        .modal-visual {
          width: 100%;
          height: 100%;
          min-height: 350px;
          background-color: #f8fafc;
          border-right: 1px solid var(--border);
        }

        @media (max-width: 991px) {
          .modal-visual {
            height: 300px;
            min-height: auto;
            border-right: none;
            border-bottom: 1px solid var(--border);
          }
        }

        .modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-details {
          padding: 40px;
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        @media (max-width: 768px) {
          .modal-details {
            padding: 24px;
          }
        }

        .modal-header {
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 20px;
        }

        .modal-title {
          font-size: 1.75rem;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .meta-info-bar {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .meta-label {
          color: var(--text-muted);
          font-size: 0.85rem;
          margin-right: 6px;
        }

        .meta-value {
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.875rem;
        }

        .modal-body {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 32px;
        }

        .modal-section-block h4 {
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .bullet-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .red-dot {
          background-color: var(--primary);
          box-shadow: 0 0 6px var(--primary);
        }

        .green-dot {
          background-color: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        .blue-dot {
          background-color: #3b82f6;
          box-shadow: 0 0 6px #3b82f6;
        }

        .modal-section-block p {
          font-size: 0.925rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .results-highlight-text {
          font-weight: 600;
          color: #10b981 !important;
          background: rgba(16, 185, 129, 0.05);
          padding: 12px;
          border-radius: 8px;
          border: 1px dashed rgba(16, 185, 129, 0.2);
        }

        .project-tags-full {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag-badge-lg {
          background: rgba(229, 62, 62, 0.05);
          border: 1px solid rgba(229, 62, 62, 0.12);
          color: var(--primary);
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .modal-footer {
          margin-top: auto;
        }
        
        .btn-sm {
          padding: 10px 20px;
          font-size: 0.95rem;
        }

        .btn-consult {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
        }
      `}</style>
    </section>
  );
}
