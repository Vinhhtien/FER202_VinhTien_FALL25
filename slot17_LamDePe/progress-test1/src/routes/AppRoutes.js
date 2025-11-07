import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import AddPayment from '../pages/AddPayment';
import PaymentDetails from '../pages/PaymentDetails';
import EditPayment from '../pages/EditPayment';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/home" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/payments" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/payments/add" element={<PrivateRoute><AddPayment /></PrivateRoute>} />
      <Route path="/payments/:id" element={<PrivateRoute><PaymentDetails /></PrivateRoute>} />
      <Route path="/payments/:id/edit" element={<PrivateRoute><EditPayment /></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;
