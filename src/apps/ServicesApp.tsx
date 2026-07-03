import Navbar from '../components/Navbar';
import ServicesPage from '../pages/ServicesPage';
import Footer from '../components/Footer';

export default function ServicesApp() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <ServicesPage />
      </main>
      <Footer />
    </div>
  );
}
