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
          background-color: #020617; /* zinc-950 */
          position: relative;
          overflow: hidden;
          padding: 100px 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .portfolio-section .section-title h2 {
          color: #f8fafc; /* zinc-50 */
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .portfolio-section .section-title p {
          color: #94a3b8; /* zinc-400 */
        }

        .portfolio-glow {
          bottom: 10%;
          right: 10%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.08) 0%, transparent 60%);
          filter: blur(60px);
          width: 600px;
          height: 600px;
          position: absolute;
          z-index: 1;
        }

        .container {
          position: relative;
          z-index: 10;
        }

        /* Filter Tabs */
        .filter-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 56px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          padding: 12px 28px;
          border-radius: 40px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
        }

        .filter-btn:hover {
          color: #f8fafc;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .filter-btn.active {
          background-color: rgba(229, 62, 62, 0.1);
          color: #ef4444; /* red-500 */
          border-color: rgba(229, 62, 62, 0.4);
          box-shadow: 0 0 20px rgba(229, 62, 62, 0.15);
        }

        /* Portfolio Grid */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 32px;
        }

        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
        }

        .portfolio-card {
          background: rgba(15, 23, 42, 0.4); /* slate-900 with opacity */
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(16px);
        }

        .portfolio-card:hover {
          transform: translateY(-8px);
          border-color: rgba(229, 62, 62, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(229, 62, 62, 0.1);
        }

        .portfolio-img-box {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
          background-color: #0f172a;
        }

        .portfolio-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0.9;
        }

        .portfolio-card:hover .portfolio-img {
          transform: scale(1.08);
          opacity: 1;
        }

        .portfolio-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 50%, transparent 100%);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 30px;
          opacity: 0;
          transition: all 0.4s ease;
        }

        .portfolio-card:hover .portfolio-overlay {
          opacity: 1;
        }

        .view-detail-btn {
          background: #ef4444; /* red-500 */
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 10px 25px rgba(229, 62, 62, 0.4);
          transform: translateY(20px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .portfolio-card:hover .view-detail-btn {
          transform: translateY(0);
        }

        .portfolio-info {
          padding: 32px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          position: relative;
        }

        .portfolio-info::before {
          content: '';
          position: absolute;
          top: 0;
          left: 32px;
          right: 32px;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 100%);
        }

        .project-category {
          color: #ef4444;
          font-weight: 800;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }

        .project-title {
          font-size: 1.5rem;
          margin-bottom: 16px;
          color: #f8fafc;
          font-weight: 700;
          line-height: 1.3;
        }

        .project-desc {
          font-size: 0.95rem;
          color: #94a3b8;
          margin-bottom: 24px;
          line-height: 1.6;
          flex-grow: 1;
        }

        .project-tags {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .tag-badge {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #cbd5e1; /* slate-300 */
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .portfolio-card:hover .tag-badge {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>

    </section>
  );
}
