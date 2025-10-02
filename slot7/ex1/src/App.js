import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Banner from './components/Banner';
import Grid from './components/Grid';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Banner />
      <Grid />
      <Footer />
    </div>
  );
}

export default App;
