import Navbar from '../components/Navbar';
import AboutPage from '../pages/AboutPage';
import Footer from '../components/Footer';

export default function AboutApp() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <AboutPage />
      </main>
      <Footer />
    </div>
  );
}
