import { useState, useEffect } from 'react';
import { FolderKanban, RefreshCw } from 'lucide-react';

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

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
                  window.location.href = `/portfolio-detail.html?slug=${encodeURIComponent(project.slug)}`;
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
