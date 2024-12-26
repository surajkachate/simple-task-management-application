import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a token exists in local storage and verify its validity
    const token = localStorage.getItem('authToken');
    if (token) {
      // Optionally, verify token expiration here (if using JWT)
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT to read expiration
      const currentTime = Date.now() / 1000; // Current timestamp in seconds

      if (decodedToken.exp > currentTime) {
        setIsAuthenticated(true);  // Token is valid
      } else {
        logout();  // Token expired
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token); // Store token in local storage
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
