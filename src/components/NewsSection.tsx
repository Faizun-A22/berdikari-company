import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, X, BookOpen, RefreshCw } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function NewsSection() {
  const [activities, setActivities] = useState<any[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const [sectionRef, sectionVisible] = useScrollReveal();

  const categories = ['Semua', 'Kegiatan', 'Rilis', 'Pengumuman', 'Berita'];

  useEffect(() => {
    async function getActivities() {
      try {
        const res = await fetch('/api/activities');
        if (!res.ok) throw new Error('Gagal mengambil data kegiatan');
        const data = await res.json();
        setActivities(data);
        setFilteredActivities(data);
      } catch (err: any) {
        console.error(err);
        setError('Gagal memuat portal berita/kegiatan.');
      } finally {
        setIsLoading(false);
      }
    }
    getActivities();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Semua') {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(activities.filter(act => act.category === selectedCategory));
    }
  }, [selectedCategory, activities]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedActivity) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedActivity]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const getBadgeColor = (cat: string) => {
    switch (cat) {
      case 'Kegiatan': return 'var(--primary)';
      case 'Rilis': return '#10b850';
      case 'Pengumuman': return '#f59e0b';
      case 'Berita': return '#3b82f6';
      default: return 'var(--primary)';
    }
  };

  return (
    <section 
      ref={sectionRef as React.RefObject<HTMLDivElement>} 
      id="activities-section"
      className={`news-section section reveal reveal-fade ${sectionVisible ? 'in-view' : ''}`}
    >
      <div className="container">
        <div className="section-title">
          <h2>Portal Kegiatan &amp; Berita</h2>
          <p>Ikuti perkembangan terbaru, rilis teknologi, dan berbagai aktivitas positif dari Berdikari Tech.</p>
          <div className="accent-bar"></div>
        </div>

        {/* Categories filter bar */}
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="news-loading">
            <RefreshCw className="animate-spin text-red" size={32} />
            <p>Memuat artikel terbaru...</p>
          </div>
        )}

        {error && (
          <div className="news-error">
            <p>{error}</p>
          </div>
        )}

        {/* Grid display */}
        {!isLoading && !error && (
          filteredActivities.length === 0 ? (
            <div className="news-empty">
              <BookOpen size={48} className="text-muted" />
              <p>Belum ada artikel dalam kategori {selectedCategory}.</p>
            </div>
          ) : (
            <div className="news-grid">
              {filteredActivities.map((act, index) => (
                <div 
                  key={act.id} 
                  className={`card-glass news-card reveal reveal-slide-up delay-${(index + 1) * 100} ${sectionVisible ? 'in-view' : ''}`}
                >
                  <div className="news-img-box">
                    <img src={act.image_url} alt={act.title} className="news-img" />
                    <span 
                      className="news-category-badge"
                      style={{ backgroundColor: getBadgeColor(act.category) }}
                    >
                      {act.category}
                    </span>
                  </div>
                  <div className="news-info">
                    <div className="news-meta">
                      <Calendar size={14} />
                      <span>{formatDate(act.date)}</span>
                    </div>
                    <h3 className="news-card-title">{act.title}</h3>
                    <p className="news-short-desc">{act.short_desc}</p>
                    <button 
                      onClick={() => setSelectedActivity(act)}
                      className="read-more-btn"
                    >
                      Baca Selengkapnya <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* --- DETAIL MODAL --- */}
      {selectedActivity && (
        <div className="news-modal-overlay" onClick={() => setSelectedActivity(null)}>
          <div className="news-modal-card card-glass animate-zoom-in" onClick={(e) => e.stopPropagation()}>
            <button 
              className="news-modal-close-btn"
              onClick={() => setSelectedActivity(null)}
              aria-label="Tutup berita"
            >
              <X size={20} />
            </button>

            <div className="news-modal-img-box">
              <img src={selectedActivity.image_url} alt={selectedActivity.title} />
              <span 
                className="news-modal-badge"
                style={{ backgroundColor: getBadgeColor(selectedActivity.category) }}
              >
                {selectedActivity.category}
              </span>
            </div>

            <div className="news-modal-content">
              <div className="news-modal-meta">
                <Calendar size={16} />
                <span>{formatDate(selectedActivity.date)}</span>
              </div>
              
              <h2 className="news-modal-title">{selectedActivity.title}</h2>
              
              <div className="news-modal-body">
                {selectedActivity.content.split('\n\n').map((para: string, idx: number) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .news-section {
          background-color: var(--bg-dark);
        }

        .filter-bar {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 20px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.7);
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: rgba(229, 62, 62, 0.02);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, var(--primary) 0%, #ff5252 100%);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(229, 62, 62, 0.2);
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        @media (max-width: 991px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .news-grid {
            grid-template-columns: 1fr;
          }
        }

        .news-card {
          padding: 0;
          overflow: hidden;
          text-align: left;
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #ffffff;
        }

        .news-img-box {
          height: 200px;
          position: relative;
          overflow: hidden;
          background-color: #f1f5f9;
        }

        .news-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-normal);
        }

        .news-card:hover .news-img {
          transform: scale(1.05);
        }

        .news-category-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .news-info {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .news-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .news-card-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.35;
          margin-bottom: 12px;
          transition: color var(--transition-fast);
        }

        .news-card:hover .news-card-title {
          color: var(--primary);
        }

        .news-short-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 24px;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .read-more-btn {
          align-self: flex-start;
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: var(--primary);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          padding: 0;
          transition: gap var(--transition-fast);
        }

        .read-more-btn:hover {
          gap: 10px;
        }

        .news-loading, .news-empty, .news-error {
          padding: 80px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .news-loading p, .news-empty p, .news-error p {
          font-size: 1rem;
          color: var(--text-secondary);
        }

        .news-loading .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Modal styling */
        .news-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1100;
        }

        .news-modal-card {
          width: 100%;
          max-width: 760px;
          max-height: 90vh;
          overflow-y: auto;
          background: #ffffff;
          padding: 0;
          border-radius: 20px;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border);
        }

        .news-modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: #ffffff;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all var(--transition-fast);
        }

        .news-modal-close-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
          transform: rotate(90deg);
        }

        .news-modal-img-box {
          height: 340px;
          width: 100%;
          position: relative;
          background-color: #f1f5f9;
        }

        @media (max-width: 576px) {
          .news-modal-img-box {
            height: 200px;
          }
        }

        .news-modal-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .news-modal-badge {
          position: absolute;
          bottom: 20px;
          left: 30px;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 16px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        .news-modal-content {
          padding: 40px 30px;
        }

        @media (max-width: 576px) {
          .news-modal-content {
            padding: 24px 20px;
          }
        }

        .news-modal-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .news-modal-title {
          font-size: 2rem;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        @media (max-width: 576px) {
          .news-modal-title {
            font-size: 1.5rem;
          }
        }

        .news-modal-body {
          color: var(--text-secondary);
          font-size: 1.025rem;
          line-height: 1.75;
        }

        .news-modal-body p {
          margin-bottom: 20px;
        }

        .animate-zoom-in {
          animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes zoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
