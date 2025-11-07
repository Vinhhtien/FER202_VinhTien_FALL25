import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

const PaymentContext = createContext();

const initialState = {
  payments: [],
  loading: false,
  error: null,
  searchTerm: '',
  selectedSemester: '',
  selectedCourse: '',
  sortBy: 'course_asc',
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START': return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS': return { ...state, loading: false, payments: action.payload, error: null };
    case 'FETCH_ERROR': return { ...state, loading: false, error: action.payload };

    case 'CREATE_SUCCESS': return { ...state, payments: [...state.payments, action.payload] };
    case 'UPDATE_SUCCESS': return {
      ...state, payments: state.payments.map(p => p.id === action.payload.id ? action.payload : p)
    };
    case 'DELETE_SUCCESS': return { ...state, payments: state.payments.filter(p => p.id !== action.payload) };

    case 'SET_SEARCH': return { ...state, searchTerm: action.payload };
    case 'SET_SEMESTER': return { ...state, selectedSemester: action.payload };
    case 'SET_COURSE': return { ...state, selectedCourse: action.payload };
    case 'SET_SORT': return { ...state, sortBy: action.payload };

    default: return state;
  }
}

export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  const fetchPayments = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      // lọc theo userId hiện tại (chuỗi)
      const data = await api.getPayments(user ? { userId: user.id } : {});
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (e) {
      dispatch({ type: 'FETCH_ERROR', payload: e.message || 'Failed to fetch payments' });
    }
  };

  const addPayment = async (payload) => {
    // amount là số, id user là chuỗi (giữ nguyên)
    const body = { ...payload, amount: Number(payload.amount) };
    const created = await api.createPayment(body);
    dispatch({ type: 'CREATE_SUCCESS', payload: created });
    return created;
  };

  const savePayment = async (id, payload) => {
    const body = { ...payload, amount: Number(payload.amount) };
    const updated = await api.updatePayment(id, body);
    dispatch({ type: 'UPDATE_SUCCESS', payload: updated });
    return updated;
  };

  const removePayment = async (id) => {
    await api.deletePayment(id);
    dispatch({ type: 'DELETE_SUCCESS', payload: id });
  };

  useEffect(() => { fetchPayments(); /* eslint-disable-next-line */ }, [user?.id]);

  const paymentsView = useMemo(() => {
    let list = [...state.payments];
    const kw = state.searchTerm.trim().toLowerCase();
    if (kw) {
      list = list.filter(p =>
        p.semester?.toLowerCase().includes(kw) ||
        p.courseName?.toLowerCase().includes(kw)
      );
    }
    if (state.selectedSemester) list = list.filter(p => p.semester === state.selectedSemester);
    if (state.selectedCourse) list = list.filter(p => p.courseName === state.selectedCourse);

    const cmpStr = (a, b, k, dir='asc') =>
      dir === 'asc' ? String(a[k]).localeCompare(String(b[k])) : String(b[k]).localeCompare(String(a[k]));
    const cmpNum = (a, b, k, dir='asc') =>
      dir === 'asc' ? (Number(a[k]) - Number(b[k])) : (Number(b[k]) - Number(a[k]));

    switch (state.sortBy) {
      case 'course_asc':  list.sort((a,b)=>cmpStr(a,b,'courseName','asc')); break;
      case 'course_desc': list.sort((a,b)=>cmpStr(a,b,'courseName','desc')); break;
      case 'date_asc':    list.sort((a,b)=>new Date(a.date)-new Date(b.date)); break;
      case 'date_desc':   list.sort((a,b)=>new Date(b.date)-new Date(a.date)); break;
      case 'amount_asc':  list.sort((a,b)=>cmpNum(a,b,'amount','asc')); break;
      case 'amount_desc': list.sort((a,b)=>cmpNum(a,b,'amount','desc')); break;
      default: break;
    }
    return list;
  }, [state.payments, state.searchTerm, state.selectedSemester, state.selectedCourse, state.sortBy]);

  return (
    <PaymentContext.Provider value={{
      state, dispatch,
      payments: state.payments,
      paymentsView,
      loading: state.loading,
      error: state.error,
      fetchPayments, addPayment, savePayment, removePayment
    }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => useContext(PaymentContext);
