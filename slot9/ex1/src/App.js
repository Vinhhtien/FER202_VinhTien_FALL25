import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import HomePage from './pages/HomePage';
import FooterPage from './pages/FooterPage';


function App() {
return (
<div>
  <Container className="py-3">
    <HomePage />
  </Container>
  {/* <HomePage /> */}
  <FooterPage />
</div>
);
}


export default App;