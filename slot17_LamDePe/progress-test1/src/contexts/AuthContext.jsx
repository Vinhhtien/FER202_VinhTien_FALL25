import React, { createContext, useContext, useEffect, useReducer } from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, isLoading: false, isAuthenticated: true, user: action.payload, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...initialAuthState };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        const u = JSON.parse(raw);
        if (u?.id) dispatch({ type: 'LOGIN_SUCCESS', payload: u });
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  // Login theo username/password (db.json không có email)
  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const users = await api.getUsers();
      const u = users.find(
        (x) => (x.username === usernameOrEmail) && x.password === password
      );
      if (u) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: u });
        return { success: true, user: u };
      } else {
        const msg = 'Invalid username or password!';
        dispatch({ type: 'LOGIN_FAILURE', payload: msg });
        return { success: false, error: msg };
      }
    } catch (e) {
      const msg = e.message || 'Login failed due to a network error.';
      dispatch({ type: 'LOGIN_FAILURE', payload: msg });
      return { success: false, error: msg };
    }
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.isLoading,
        error: state.error,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
