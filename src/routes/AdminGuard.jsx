import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuthContext';

const AdminGuard = () => {
  const context = useContext(AdminAuthContext) || {};
  const { admin } = context;

  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');

  // Context load hone mein delay ho to LocalStorage fallback parsing:
  let storedUser = null;
  const rawUser = localStorage.getItem('adminUser') || localStorage.getItem('user');
  
  if (rawUser) {
    try {
      storedUser = JSON.parse(rawUser);
    } catch (e) {
      storedUser = null;
    }
  }

  const activeUser = admin || storedUser;
  const isAdmin = activeUser?.role?.toLowerCase() === 'admin';

  // Token missing ya role admin na ho to Admin Login Screen (/login) par bhejega (replace History entry clears back button state)
  if (!token || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminGuard;