import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Avatar, Chip } from '@mui/material';

const dummyCustomers = [
  { id: 1, name: 'Sara Khan', email: 'sara@gmail.com', orders: 12, spent: '$1,240.00', joined: '12 Aug 2026' },
  { id: 2, name: 'Hamza Malik', email: 'hamza@yahoo.com', orders: 5, spent: '$450.00', joined: '18 Aug 2026' },
  { id: 3, name: 'Ayesha Raza', email: 'ayesha@hotmail.com', orders: 1, spent: '$85.00', joined: '01 Sep 2026' },
];

const CustomersPage = () => {
  return (
    <Box sx={{ ml: '260px', p: 4, backgroundColor: '#F4F6F8', minHeight: '100vh' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#121926' }}>
          Customers List
        </Typography>
        <Typography variant="body2" sx={{ color: '#697586' }}>
          Registered buyers from your main e-commerce store.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #E3E8EF', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#FAFAFA' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email Address</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Total Orders</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Total Spent</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Joined Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyCustomers.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 36, height: 36, backgroundColor: '#E3F2FD', color: '#1976D2', fontWeight: 600 }}>
                      {row.name.charAt(0)}
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{row.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Chip label={`${row.orders} Orders`} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2E7D32' }}>{row.spent}</TableCell>
                <TableCell>{row.joined}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default CustomersPage;