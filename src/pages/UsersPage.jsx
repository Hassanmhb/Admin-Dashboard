import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Paper,
} from '@mui/material';

// Dynamic API URL from environment variable with Vercel fallback
const BASE_URL = import.meta.env.VITE_API_URL || 'https://shop-ecommerce-backend.vercel.app';
const API_BASE = `${BASE_URL}/api`;

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
    
    fetch(`${API_BASE}/users`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users fetch error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#0F172A' }}>
        Manage Users
      </Typography>

      <Card elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '16px' }}>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>User Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email Address</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Joined Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={30} />
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role || 'Customer'}
                        size="small"
                        color={user.role === 'admin' ? 'primary' : 'default'}
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt || Date.now()).toLocaleDateString()}
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

export default UsersPage;