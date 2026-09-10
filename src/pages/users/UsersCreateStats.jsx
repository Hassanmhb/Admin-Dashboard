import React, { useState, useEffect } from 'react';
import {
  Box, Card, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, CircularProgress, Paper, Grid
} from '@mui/material';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const UsersCreateStats = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');

    fetch(`${BASE_URL}/api/users`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data.users && Array.isArray(data.users)) {
          setUsers(data.users);
        } else if (data.data && Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          setUsers([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setUsers([]);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#0F172A' }}>
        User Creation Statistics
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              backgroundColor: '#F3E8FF',
              border: '1px solid #E9D5FF',
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#6B21A8', fontWeight: 700 }}>
              Total Created Users
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#4C1D95', mt: 1 }}>
              {users.length}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Card elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '16px' }}>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>User Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email Address</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Created Date & Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={30} />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                    No created users data found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{user.name || 'N/A'}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell sx={{ fontWeight: 500, color: '#475569' }}>
                      {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
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

export default UsersCreateStats;