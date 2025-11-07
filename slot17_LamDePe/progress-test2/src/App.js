
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';

export default function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <AppRoutes />
      </PaymentProvider>
    </AuthProvider>
  );
}