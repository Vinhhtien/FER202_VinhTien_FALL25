// src/services/api.js
import axios from 'axios';

// Tạo instance trỏ tới JSON-Server ở cổng 3001
export const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

/* ========== USERS ========== */
export const getUsers = async () => {
  const res = await API.get('/users');
  return res.data;
};

/* ========== PAYMENTS (CRUD) ========== */
export const getPayments = async (params = {}) => {
  const res = await API.get('/payments', { params });
  return res.data;
};

export const getPaymentById = async (id) => {
  const res = await API.get(`/payments/${id}`);
  return res.data;
};

export const createPayment = async (payload) => {
  const res = await API.post('/payments', payload);
  return res.data;
};

export const updatePayment = async (id, payload) => {
  const res = await API.put(`/payments/${id}`, payload);
  return res.data;
};

export const deletePayment = async (id) => {
  const res = await API.delete(`/payments/${id}`);
  return res.data;
};
