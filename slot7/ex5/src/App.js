import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Topbar from './components/Topbar';
import Hero from './components/Hero';
import Breadcrumbs from './components/Breadcrumbs';
import StudentsGrid from './components/StudentsGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Topbar />
      <Hero />
      <Breadcrumbs />
      <StudentsGrid />
      <Footer />
    </div>
  );
}
export default App;
