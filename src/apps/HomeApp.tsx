import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Footer from '../components/Footer';

export default function HomeApp() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <Home />
      </main>
      <Footer />
    </div>
  );
}
