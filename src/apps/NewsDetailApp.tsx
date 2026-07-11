import Navbar from '../components/Navbar';
import NewsDetailPage from '../pages/NewsDetailPage';
import Footer from '../components/Footer';

export default function NewsDetailApp() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <NewsDetailPage />
      </main>
      <Footer />
    </div>
  );
}
