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

          {/* Protected Routes wrapped in AdminGuard & AdminLayout */}
          <Route element={<AdminGuard />}>
            <Route element={<AdminLayout />}>
              {/* Nested Dashboard Base Route */}
              <Route path="/dashboard" element={<DashboardHome />} />
              
              {/* Products Route */}
              <Route path="/dashboard/products" element={<ProductsPage />} />

              {/* Users Routes */}
              <Route path="/dashboard/users" element={<Navigate to="/dashboard/users/list" replace />} />
              <Route path="/dashboard/users/list" element={<UsersList />} />

              {/* Order Routes */}
              <Route path="/dashboard/orders" element={<Navigate to="/dashboard/orders/list" replace />} />
              <Route path="/dashboard/orders/list" element={<OrderList />} />
              <Route path="/dashboard/orders/details" element={<OrderDetails />} />
              <Route path="/dashboard/orders/details/:id" element={<OrderDetails />} />
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