import Navbar from '../components/Navbar';
import ContactPage from '../pages/ContactPage';
import Footer from '../components/Footer';

export default function ContactApp() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <ContactPage />
      </main>
      <Footer />
    </div>
  );
}
