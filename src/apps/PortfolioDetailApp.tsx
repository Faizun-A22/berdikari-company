import Navbar from '../components/Navbar';
import PortfolioDetailPage from '../pages/PortfolioDetailPage';
import Footer from '../components/Footer';

export default function PortfolioDetailApp() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <PortfolioDetailPage />
      </main>
      <Footer />
    </div>
  );
}
