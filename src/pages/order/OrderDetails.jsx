import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Card, Typography, Grid, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, CircularProgress, Alert, Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://shop-ecommerce-backend.vercel.app';
const API_BASE = `${BASE_URL.replace(/\/$/, '')}/api`;

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        };

        let targetId = id;

        if (!targetId) {
          const resAll = await fetch(`${API_BASE}/orders`, { headers });
          const dataAll = await resAll.json();
          const ordersList = Array.isArray(dataAll) ? dataAll : dataAll.orders || [];

          if (ordersList.length > 0) {
            targetId = ordersList[0]._id;
          } else {
            throw new Error('No orders found in database.');
          }
        }

        const res = await fetch(`${API_BASE}/orders/${targetId}`, { headers });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message || 'Details fetch nahi ho sakin.');

        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ p: 3 }}><Alert severity="error">{error}</Alert></Box>;
  if (!order) return <Box sx={{ p: 3 }}><Alert severity="info">No Order Data Found</Alert></Box>;

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 900, mx: 'auto' }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/orders/list')} 
        sx={{ mb: 2, color: '#6B21A8', fontWeight: 700, textTransform: 'none' }}
      >
        Back to List
      </Button>

      <Card elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '16px', p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '18px', sm: '24px' } }}>
              Order #{order._id?.slice(-6).toUpperCase()}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Placed on: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
            </Typography>
          </Box>
          <Chip label={order.status || 'Pending'} color="primary" sx={{ fontWeight: 700, backgroundColor: '#6B21A8' }} />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Customer Information */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ color: '#64748B', fontWeight: 700 }}>CUSTOMER DETAILS</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>{order.customerDetails?.name || 'N/A'}</Typography>
            <Typography variant="body2" sx={{ color: '#334155', wordBreak: 'break-all' }}>{order.customerDetails?.email || 'N/A'}</Typography>
            <Typography variant="body2" sx={{ color: '#334155' }}>{order.customerDetails?.phone || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ color: '#64748B', fontWeight: 700 }}>SHIPPING ADDRESS</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: '#334155' }}>{order.customerDetails?.address || 'N/A'}</Typography>
            <Typography variant="body2" sx={{ color: '#334155' }}>{order.customerDetails?.city || 'N/A'}</Typography>
          </Grid>
        </Grid>

        {/* Items Table */}
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', mb: 3, borderRadius: '12px', overflowX: 'auto' }}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Item</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Qty</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orderItems?.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={item.image} variant="rounded" sx={{ width: 40, height: 40 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                  </TableCell>
                  <TableCell>Rs. {item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Rs. {item.price * item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#6B21A8', fontSize: { xs: '18px', sm: '20px' } }}>
            Grand Total: Rs. {order.totalAmount}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default OrderDetails;