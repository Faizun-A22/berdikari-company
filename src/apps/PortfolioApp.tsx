import Navbar from '../components/Navbar';
import PortfolioPage from '../pages/PortfolioPage';
import Footer from '../components/Footer';

export default function PortfolioApp() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <PortfolioPage />
      </main>
      <Footer />
    </div>
  );
}
