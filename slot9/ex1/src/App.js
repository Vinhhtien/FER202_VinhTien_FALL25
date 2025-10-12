// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FooterPage from './pages/FooterPage';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Thêm các route cho các link khác nếu cần */}
          <Route path="/profiles" element={<div>Profiles Page</div>} />
          <Route path="/password" element={<div>Change Password</div>} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/favourites" element={<div>Favourites Page</div>} />
        </Routes>
        <FooterPage />
      </div>
    </Router>
  );
}

export default App;