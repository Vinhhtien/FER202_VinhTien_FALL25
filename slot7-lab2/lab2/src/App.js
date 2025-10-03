import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Booking from './components/Booking';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Menu />
      <Booking />
    </>
  );
}
export default App;
