import { useState, useEffect } from 'react';
import { ExternalLink, X, FolderKanban, RefreshCw, Play } from 'lucide-react';
import InteractiveDemoViewer from './InteractiveDemoViewer';

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

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'uiux'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMedia, setActiveMedia] = useState<{ type: 'image' | 'video'; url: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [activeDemoProject, setActiveDemoProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/portfolios?t=' + Date.now());
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
          <div className="modal-content card-glass" onClick={(e) => e.stopPropagation()} style={{ background: '#ffffff', color: '#0f172a' }}>
            <button className="modal-close-btn" onClick={() => { setSelectedProject(null); setActiveMedia(null); }} style={{ color: '#0f172a' }}>
              <X size={24} />
            </button>
            
            <div className="modal-grid">
              <div className="modal-visual" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', background: '#f8fafc', borderRight: '1px solid var(--border)' }}>
                <div className="main-media-container" style={{ width: '100%', height: '280px', borderRadius: '12px', overflow: 'hidden', background: '#090d16', border: '1px solid rgba(0,0,0,0.08)', position: 'relative' }}>
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
                          width: '60px',
                          height: '45px',
                          borderRadius: '6px',
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
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ color: 'white' }}><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack under media */}
                <div style={{ marginTop: '8px' }}>
                  <h5 style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                    Teknologi Yang Digunakan
                  </h5>
                  <div className="project-tags-full" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {selectedProject.tags.map((tag, idx) => (
                      <span key={idx} className="tag-badge-lg" style={{ background: 'rgba(229, 62, 62, 0.05)', border: '1px solid rgba(229, 62, 62, 0.12)', color: 'var(--primary)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial card under media */}
                <div style={{ marginTop: '8px' }}>
                  <div className="testimonial-quote-card" style={{ background: 'linear-gradient(135deg, rgba(229, 62, 62, 0.03) 0%, rgba(255, 255, 255, 0) 100%)', border: '1px solid var(--border)', padding: '16px', borderRadius: '10px', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '2px', left: '10px', fontSize: '2.5rem', color: 'rgba(229,62,62,0.08)', fontFamily: 'serif', lineHeight: 1 }}>“</span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', position: 'relative', zIndex: 2, paddingLeft: '8px', lineHeight: '1.5', margin: 0 }}>
                      {selectedProject.testimonialText || 'Proses development yang sangat cepat, profesional, dan transparan sehingga kami dapat dengan mudah menyampaikan apa yang kami inginkan.'}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', paddingLeft: '8px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(229, 62, 62, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>💼</div>
                      <div>
                        <h6 style={{ fontSize: '0.75rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
                          {selectedProject.testimonialAuthor || `${selectedProject.client} IT Leader`}
                        </h6>
                        <small style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>Verifikasi Klien Resmi</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-details" style={{ padding: '24px 32px' }}>
                <div className="modal-header" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                  <span className="project-category" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                    {selectedProject.categoryLabel}
                  </span>
                  <h3 className="modal-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px' }}>
                    {selectedProject.title}
                  </h3>
                  
                  <div className="meta-info-bar" style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
                    <div>
                      <span className="meta-label" style={{ color: 'var(--text-muted)', marginRight: '6px' }}>Klien:</span>
                      <span className="meta-value" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedProject.client}</span>
                    </div>
                    <div>
                      <span className="meta-label" style={{ color: 'var(--text-muted)', marginRight: '6px' }}>Tahun:</span>
                      <span className="meta-value" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedProject.year}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}>
                  {/* Action Buttons */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <button 
                      onClick={() => setActiveDemoProject(selectedProject)}
                      className="btn"
                      style={{ background: 'linear-gradient(135deg, #e53e3e 0%, #ff6b6b 100%)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', boxShadow: '0 4px 15px rgba(229, 62, 62, 0.2)' }}
                    >
                      <Play size={14} fill="white" /> Coba Demo (Frontend)
                    </button>
                    
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn"
                        style={{ border: '1px solid rgba(0,0,0,0.15)', color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', background: 'white' }}
                      >
                        Kunjungi Link Asli <ExternalLink size={14} />
                      </a>
                    )}

                    <a 
                      href={`/contact.html?ref=${selectedProject.slug}`} 
                      className="btn"
                      style={{ border: '1px solid rgba(0,0,0,0.15)', color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', background: 'white' }}
                    >
                      Konsultasikan Solusi Serupa
                    </a>
                  </div>

                  {/* Sekilas Tentang Proyek */}
                  <div className="modal-section-block">
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '10px', fontWeight: 700 }}>
                      Sekilas Tentang Proyek
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div style={{ background: 'rgba(15, 23, 42, 0.015)', border: '1px solid rgba(0,0,0,0.05)', padding: '12px', borderRadius: '8px' }}>
                        <h5 style={{ color: 'var(--primary)', marginBottom: '4px', fontSize: '0.8rem', fontWeight: 700 }}>Kenapa Proyek Ini Penting?</h5>
                        <p style={{ fontSize: '0.8rem', lineHeight: '1.45', color: 'var(--text-secondary)', margin: 0 }}>
                          {selectedProject.projectImportance || selectedProject.shortDesc}
                        </p>
                      </div>
                      <div style={{ background: 'rgba(15, 23, 42, 0.015)', border: '1px solid rgba(0,0,0,0.05)', padding: '12px', borderRadius: '8px' }}>
                        <h5 style={{ color: 'var(--primary)', marginBottom: '4px', fontSize: '0.8rem', fontWeight: 700 }}>Tentang Perusahaan</h5>
                        <p style={{ fontSize: '0.8rem', lineHeight: '1.45', color: 'var(--text-secondary)', margin: 0 }}>
                          {selectedProject.clientInfo || `Proyek ini dikembangkan khusus untuk ${selectedProject.client} untuk merespons kebutuhan digitalisasi di segmen ${selectedProject.categoryLabel}.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hasil Nyata Setelah Sistem Aktif (Stats) */}
                  <div className="modal-section-block">
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '10px', fontWeight: 700 }}>
                      Hasil Nyata Setelah Sistem Aktif
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', padding: '12px 8px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                        <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                          {selectedProject.stat1Val || '24/7'}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0 2px' }}>
                          {selectedProject.stat1Label || 'Layanan Otomatis'}
                        </span>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.25 }}>
                          {selectedProject.stat1Desc || 'Sistem siap sedia diakses tanpa batasan jam kerja.'}
                        </p>
                      </div>
                      
                      <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', padding: '12px 8px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                        <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                          {selectedProject.stat2Val || '35+'}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0 2px' }}>
                          {selectedProject.stat2Label || 'Modul Dinamis'}
                        </span>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.25 }}>
                          {selectedProject.stat2Desc || 'Mengintegrasikan data secara luas dan adaptif.'}
                        </p>
                      </div>

                      <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', padding: '12px 8px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                        <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                          {selectedProject.stat3Val || '50%'}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0 2px' }}>
                          {selectedProject.stat3Label || 'Efisiensi Waktu'}
                        </span>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.25 }}>
                          {selectedProject.stat3Desc || 'Mengurangi beban kerja tim operasional secara manual.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tantangan & Solusi Mendalam */}
                  <div className="modal-section-block">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ borderLeft: '3px solid #ef4444', paddingLeft: '10px' }}>
                        <h5 style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px' }}>
                          Tantangan Utama (Sebelum Sistem Aktif)
                        </h5>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.45' }}>
                          {selectedProject.challengeDetailed || selectedProject.challenge}
                        </p>
                      </div>
                      <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '10px' }}>
                        <h5 style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px' }}>
                          Solusi Kami (Solusi Kodeflow)
                        </h5>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.45' }}>
                          {selectedProject.solutionDetailed || selectedProject.solution}
                        </p>
                      </div>
                    </div>
                  </div>
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

      {activeDemoProject && (
        <InteractiveDemoViewer 
          project={activeDemoProject} 
          onClose={() => setActiveDemoProject(null)} 
        />
      )}
    </section>
  );
}
