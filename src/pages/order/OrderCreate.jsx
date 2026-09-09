import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, Typography, TextField, Button, Grid,
  Alert, CircularProgress, MenuItem, Select, FormControl, InputLabel,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const OrderCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  // Customer Details Form
  const [customer, setCustomer] = useState({
    name: '', email: '', phone: '', address: '', city: ''
  });

  // Selected Items for Order
  const [orderItems, setOrderItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Fetch Products List for Dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/products');
        const data = await res.json();
        if (res.ok) setProducts(data);
      } catch (err) {
        setError('Products load nahi ho sake');
      }
    };
    fetchProducts();
  }, []);

  // Add Item to Order List
  const handleAddItem = () => {
    if (!selectedProduct) return;
    const prod = products.find((p) => p._id === selectedProduct);
    if (!prod) return;

    const newItem = {
      product: prod._id,
      title: prod.title || prod.name,
      price: prod.price,
      quantity: Number(quantity),
      image: prod.image
    };

    setOrderItems([...orderItems, newItem]);
    setSelectedProduct('');
    setQuantity(1);
  };

  // Remove Item
  const handleRemoveItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  // Calculate Total Amount
  const totalAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Submit Order
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      setError('At least ek product add karein');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:8000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          customerDetails: customer,
          orderItems,
          totalAmount,
          paymentMethod: 'COD'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Order create nahi ho saka');

      navigate('/orders/list');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
        Create New Order
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Card elevation={0} sx={{ border: '1px solid #E3E8EF', borderRadius: '16px', mb: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Customer Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Full Name" required value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" type="email" required value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone" required value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="City" required value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Address" multiline rows={2} required value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Add Products Section */}
        <Card elevation={0} sx={{ border: '1px solid #E3E8EF', borderRadius: '16px', mb: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Select Products
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Choose Product</InputLabel>
                <Select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} label="Choose Product">
                  {products.map((p) => (
                    <MenuItem key={p._id} value={p._id}>
                      {p.title || p.name} - Rs. {p.price}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField type="number" label="Qty" value={quantity} onChange={(e) => setQuantity(e.target.value)} sx={{ width: 100 }} />
              <Button variant="contained" onClick={handleAddItem} startIcon={<AddIcon />} sx={{ backgroundColor: '#5E35B1' }}>
                Add
              </Button>
            </Box>

            {/* Selected Items Table */}
            {orderItems.length > 0 && (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>Rs. {item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>Rs. {item.price * item.quantity}</TableCell>
                      <TableCell align="center">
                        <IconButton color="error" onClick={() => handleRemoveItem(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <Typography variant="h6" sx={{ fontWeight: 800, mt: 3, textAlign: 'right', color: '#5E35B1' }}>
              Total: Rs. {totalAmount}
            </Typography>
          </CardContent>
        </Card>

        <Button type="submit" variant="contained" disabled={loading} fullWidth size="large" sx={{ backgroundColor: '#5E35B1', py: 1.5, borderRadius: '12px' }}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Order Now'}
        </Button>
      </form>
    </Box>
  );
};

export default OrderCreate;