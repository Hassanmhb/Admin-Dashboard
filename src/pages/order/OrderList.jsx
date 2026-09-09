import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress, Chip, Button
} from '@mui/material';

const API_BASE = 'http://localhost:8000';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        let res = await fetch(`${API_BASE}/api/orders`, { headers });
        
        // Fallback for Vercel Backend if Localhost fails
        if (!res.ok) {
          res = await fetch('https://shop-ecommerce-backend-pk6z857yf-hassanmhbs-projects.vercel.app/api/orders', { headers });
        }

        const data = await res.json();
        const ordersArray = Array.isArray(data) ? data : data.orders || data.data || [];
        setOrders(ordersArray);
      } catch (err) {
        console.error('Order Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
        All Orders ({orders.length})
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Payment Method</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell sx={{ color: '#6B21A8', fontWeight: 600 }}>{row._id}</TableCell>
                  <TableCell>{row.customerDetails?.name || 'N/A'}</TableCell>
                  <TableCell>Rs. {row.totalAmount || 0}</TableCell>
                  <TableCell>{row.paymentMethod || 'COD'}</TableCell>
                  <TableCell>
                    <Chip label={row.status || 'Pending'} size="small" color="primary" sx={{ backgroundColor: '#6B21A8' }} />
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      variant="contained" 
                      sx={{ backgroundColor: '#6B21A8' }}
                      onClick={() => navigate(`/orders/details/${row._id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No orders found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderList;