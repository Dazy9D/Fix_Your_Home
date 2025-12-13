import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const json = localStorage.getItem('auth_user');
    return json ? JSON.parse(json) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));

  const setAuth = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    localStorage.setItem('auth_token', tokenData);
    axios.defaults.headers.common.Authorization = `Bearer ${tokenData}`;
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
    } catch (e) {}
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    delete axios.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider value={{ user, token, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
