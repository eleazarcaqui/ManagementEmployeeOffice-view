import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginService, logout as logoutService, validateToken } from '../../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Agrega estado para controlar si se ha inicializado la app
  const [initialized, setInitialized] = useState(false);

  // Efecto para inicializar la autenticación al cargar la app
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        setInitialized(true);
        return;
      }

      try {
        const isValid = await validateToken(token);
        if (isValid) {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
          }
        } else {
          // Token inválido, limpiar storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (err) {
        console.error('Error validando token:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    // Iniciar el proceso de autenticación
    initAuth();
  }, []);

  // Listener para eventos de storage (para sincronización entre pestañas)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' && !e.newValue) {
        // Token removido en otra pestaña
        setCurrentUser(null);
      } else if (e.key === 'user' && e.newValue) {
        // Usuario actualizado en otra pestaña
        try {
          setCurrentUser(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error parsing user from storage', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { token, user } = await loginService(email, password);

      // Guardar en localStorage y estado
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      
      return user;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutService();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Siempre limpiar datos locales
      setCurrentUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!currentUser,
    initialized
  };

  // No renderices nada hasta que la autenticación se haya inicializado
  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);