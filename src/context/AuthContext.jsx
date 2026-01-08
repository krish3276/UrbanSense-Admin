import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock admin user
const MOCK_ADMIN = {
  id: 1,
  name: 'Admin User',
  email: 'admin@urbansense.gov',
  role: 'admin',
  avatar: 'A',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (mock check)
    const savedUser = localStorage.getItem('urbansense_admin');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in production, this would call an API
    if (email === 'admin@urbansense.gov' && password === 'admin123') {
      setUser(MOCK_ADMIN);
      localStorage.setItem('urbansense_admin', JSON.stringify(MOCK_ADMIN));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('urbansense_admin');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
