import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress, Chip
} from '@mui/material';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckoutUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        const primaryUrl = window.location.hostname === 'localhost'
          ? 'http://localhost:8000/api/orders'
          : 'https://shop-ecommerce-backend-pk6z857yf-hassanmhbs-projects.vercel.app/api/orders';

        let res = await fetch(primaryUrl, { headers });
        if (!res.ok && window.location.hostname === 'localhost') {
          res = await fetch('https://shop-ecommerce-backend-pk6z857yf-hassanmhbs-projects.vercel.app/api/orders', { headers });
        }

        const data = await res.json();
        const ordersList = Array.isArray(data) ? data : data.orders || data.data || [];

        const uniqueUsers = [];
        const emailSet = new Set();

        ordersList.forEach((order) => {
          const customer = order.customerDetails || {};
          if (customer.email && !emailSet.has(customer.email)) {
            emailSet.add(customer.email);
            uniqueUsers.push({
              id: order._id,
              name: customer.name || 'N/A',
              email: customer.email,
              phone: customer.phone || 'N/A',
              city: customer.city || 'N/A',
            });
          }
        });

        setUsers(uniqueUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutUsers();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
        Checkout Customers List ({users.length})
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Order ID Ref</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email Address</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ color: '#6B21A8', fontWeight: 600 }}>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell><Chip label={row.city} size="small" variant="outlined" sx={{ borderColor: '#6B21A8', color: '#6B21A8' }} /></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No customers found from Checkout data.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersList;