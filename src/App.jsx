import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminGuard from './routes/AdminGuard';
import AdminLayout from './layouts/AdminLayout';

// View Imports
import DashboardHome from './pages/DashboardHome';
import AdminAuth from './pages/AdminAuth';
import ProductsPage from './pages/ProductsPage';

// Users Pages Imports
import UsersList from './pages/users/UsersList';

// Order Pages Imports
import OrderList from './pages/order/OrderList';
import OrderDetails from './pages/order/OrderDetails';

function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Route */}
          <Route path="/login" element={<AdminAuth />} />

          {/* Root Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected Routes wrapped in AdminLayout */}
          <Route element={<AdminGuard />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashboardHome />} />

              {/* 🟣 Users Route (Only List) */}
              <Route path="/users" element={<Navigate to="/users/list" replace />} />
              <Route path="/users/list" element={<UsersList />} />

              {/* 🟢 Order Routes (Only List & Details) */}
              <Route path="/orders" element={<Navigate to="/orders/list" replace />} />
              <Route path="/orders/list" element={<OrderList />} />
              <Route path="/orders/details" element={<OrderDetails />} />
              <Route path="/orders/details/:id" element={<OrderDetails />} />

              {/* 📦 Products Route */}
              <Route path="/products" element={<ProductsPage />} />
            </Route>
          </Route>

          {/* Catch-all Fallback Route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

export default App;