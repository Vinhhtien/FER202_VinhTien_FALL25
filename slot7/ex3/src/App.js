import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';


import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Grid from './components/Grid';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Banner />
      <Navbar />
      <Grid />
      <Footer />
    </div>
  );
}

export default App;
