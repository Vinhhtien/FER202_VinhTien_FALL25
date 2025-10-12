
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Container from 'react-bootstrap/Container';
import Ex8FormPage from './pages/Ex8FormPage';
import Ex8WizardPage from './pages/Ex8WizardPage';

export default function App() {
  return (
    <div className="app">
      <Container className="py-4">
        <Ex8FormPage />
      </Container>
      <Ex8WizardPage/>
    </div>
  );
}
