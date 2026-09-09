import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, Typography, TextField, Button, Grid,
  Alert, CircularProgress, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  const [status, setStatus] = useState('Pending');
  const [customer, setCustomer] = useState({
    name: '', email: '', phone: '', address: '', city: ''
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`http://localhost:8000/api/orders/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Order nahi mila');

        setStatus(data.status || 'Pending');
        setCustomer(data.customerDetails || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:8000/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, customerDetails: customer })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update fail ho gaya');

      navigate('/orders/list');
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
        Edit Order #{id.slice(-6).toUpperCase()}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleUpdate}>
        <Card elevation={0} sx={{ border: '1px solid #E3E8EF', borderRadius: '16px', mb: 3, p: 2 }}>
          <CardContent>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Order Status</InputLabel>
              <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Order Status">
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Customer Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Address" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Button type="submit" variant="contained" disabled={updating} fullWidth sx={{ backgroundColor: '#5E35B1', py: 1.5, borderRadius: '12px' }}>
          {updating ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
        </Button>
      </form>
    </Box>
  );
};

export default OrderEdit;