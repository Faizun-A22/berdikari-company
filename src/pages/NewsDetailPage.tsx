import { useState, useEffect } from 'react';
import { Calendar, ArrowLeft, RefreshCw, AlertTriangle, BookOpen } from 'lucide-react';

interface Activity {
  id: string | number;
  title: string;
  category: string;
  date: string;
  short_desc: string;
  content: string;
  image_url: string;
}

export default function NewsDetailPage() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
      setError('ID berita tidak ditentukan.');
      setIsLoading(false);
      return;
    }

    async function fetchActivity() {
      try {
        const res = await fetch(`/api/activities/${id}?t=${Date.now()}`);
        if (!res.ok) {
          throw new Error('Artikel tidak ditemukan.');
        }
        const data = await res.json();
        setActivity(data);
      } catch (err: any) {
        console.error(err);
        setError('Gagal memuat artikel berita.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivity();
  }, []);

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

  if (isLoading) {
    return (
      <div className="news-detail-loading">
        <RefreshCw className="animate-spin" size={36} />
        <p>Memuat artikel berita...</p>
        <style>{`
          .news-detail-loading {
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

  if (error || !activity) {
    return (
      <div className="news-detail-error container">
        <div className="card-glass error-card">
          <AlertTriangle size={48} className="error-icon" />
          <h3>Artikel Tidak Ditemukan</h3>
          <p>{error || 'Terjadi kesalahan sistem saat memuat data.'}</p>
          <a href="/news.html" className="btn btn-primary">
            <ArrowLeft size={16} /> Kembali ke Berita
          </a>
        </div>
        <style>{`
          .news-detail-error {
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
    <section className="news-detail-section">
      <div className="glow-orb news-glow-1"></div>
      <div className="glow-orb news-glow-2"></div>

      <div className="container">
        {/* Navigation Bar */}
        <div className="news-navigation-bar">
          <a href="/news.html" className="back-link">
            <ArrowLeft size={18} />
            <span>Kembali ke Berita &amp; Kegiatan</span>
          </a>
        </div>

        {/* Article Layout */}
        <article className="news-article-container">
          {/* Hero Meta Header */}
          <header className="news-article-header">
            <span 
              className="news-badge"
              style={{ backgroundColor: getBadgeColor(activity.category) }}
            >
              {activity.category}
            </span>
            <h1 className="news-title gradient-text-expert">{activity.title}</h1>
            
            <div className="news-meta-info">
              <div className="meta-date">
                <Calendar size={16} />
                <span>{formatDate(activity.date)}</span>
              </div>
              <div className="meta-reading">
                <BookOpen size={16} />
                <span>{Math.max(1, Math.round(activity.content.split(' ').length / 200))} Menit Bacaan</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="news-image-wrapper">
            <img 
              src={activity.image_url} 
              alt={activity.title} 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </div>

          {/* Article Text Content */}
          <div className="news-body-content card-glass">
            <p className="news-lead-desc">
              {activity.short_desc}
            </p>
            
            <div className="news-paragraphs">
              {activity.content.split('\n\n').map((paragraph: string, idx: number) => {
                if (!paragraph.trim()) return null;
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>
          </div>
        </article>
      </div>

      <style>{`
        .news-detail-section {
          background-color: var(--bg-dark);
          position: relative;
          overflow: hidden;
          padding: 40px 0 100px;
          min-height: 100vh;
        }

        .news-glow-1 {
          top: 10%;
          left: -10%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.02) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .news-glow-2 {
          bottom: 20%;
          right: -10%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.02) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .news-navigation-bar {
          margin-bottom: 32px;
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

        /* Article Wrapper */
        .news-article-container {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .news-article-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .news-badge {
          color: white;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 14px;
          border-radius: 20px;
          letter-spacing: 0.05em;
          display: inline-block;
          margin-bottom: 16px;
          text-transform: uppercase;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .news-title {
          font-family: var(--font-heading);
          font-size: 2.25rem;
          font-weight: 900;
          line-height: 1.25;
          margin: 0 0 20px;
          letter-spacing: -0.02em;
        }

        @media (min-width: 768px) {
          .news-title {
            font-size: 2.75rem;
          }
        }

        .news-meta-info {
          display: flex;
          justify-content: center;
          gap: 24px;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .meta-date, .meta-reading {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Featured Image Area */
        .news-image-wrapper {
          width: 100%;
          height: 320px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
          margin-bottom: 40px;
          border: 1px solid rgba(0,0,0,0.04);
        }

        @media (min-width: 768px) {
          .news-image-wrapper {
            height: 480px;
          }
        }

        .news-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Body text content card */
        .news-body-content {
          padding: 40px !important;
        }

        .news-lead-desc {
          font-size: 1.15rem;
          font-weight: 600;
          line-height: 1.6;
          color: var(--text-primary);
          border-left: 3px solid var(--primary);
          padding-left: 18px;
          margin-bottom: 30px;
        }

        .news-paragraphs {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .news-paragraphs p {
          margin: 0;
          text-align: justify;
        }
      `}</style>
    </section>
  );
}
