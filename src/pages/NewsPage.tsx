import NewsSection from '../components/NewsSection';

export default function NewsPage() {
  return (
    <div className="news-page animate-fade-in" style={{ paddingTop: '80px', minHeight: '80vh' }}>
      <NewsSection />
    </div>
  );
}