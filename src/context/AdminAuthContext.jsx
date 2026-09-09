import React, { createContext, useState, useContext } from 'react';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const user = localStorage.getItem('adminUser') || localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  });

  const loginAdmin = (userData, token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('token', token);
    localStorage.setItem('adminUser', JSON.stringify(userData));
    localStorage.setItem('user', JSON.stringify(userData));
    setAdmin(userData);
  };

  const logoutAdmin = () => {
    // Clear all possible tokens and user keys
    localStorage.removeItem('adminToken');
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('user');
    sessionStorage.clear();
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Custom Hook export
export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};