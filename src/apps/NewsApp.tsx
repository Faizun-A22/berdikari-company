import Navbar from '../components/Navbar';
import NewsPage from '../pages/NewsPage';
import Footer from '../components/Footer';

export default function NewsApp() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <NewsPage />
      </main>
      <Footer />
    </div>
  );
}