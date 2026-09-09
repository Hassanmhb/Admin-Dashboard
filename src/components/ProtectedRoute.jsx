import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check karein ke localStorage mein token maujood hai ya nahi
  const token = localStorage.getItem('token');

  // Agar token nahi hai, toh seedha /login par bhej de aur history clear kar de (replace: true)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar token hai, toh child routes (Admin Layout) render karein
  return <Outlet />;
};

export default ProtectedRoute;