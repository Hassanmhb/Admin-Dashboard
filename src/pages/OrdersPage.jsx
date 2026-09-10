import React, { useState, useEffect } from 'react';
import {
  Box, Card, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Select, MenuItem,
  CircularProgress, Alert, Paper
} from '@mui/material';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getToken = () => localStorage.getItem('adminToken') || localStorage.getItem('token') || '';

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/orders`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch orders');
      setOrders(data.orders || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Status update failed');
      }

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert(`Error updating order: ${err.message}`);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#0F172A' }}>
        Manage Orders
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Card elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '16px' }}>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Items</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Order Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={30} />
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order._id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>#{order._id?.slice(-6)}</TableCell>
                    <TableCell>{order.user?.name || order.customerName || 'N/A'}</TableCell>
                    <TableCell>{order.items?.length || 1} Items</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>PKR {order.totalAmount}</TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={order.status || 'Placed'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        sx={{
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          minWidth: 130,
                        }}
                      >
                        <MenuItem value="Placed">Placed</MenuItem>
                        <MenuItem value="Processing">Processing</MenuItem>
                        <MenuItem value="Shipped">Shipped</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default OrdersPage;