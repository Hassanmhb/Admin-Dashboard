import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Sidebar = () => {
  const location = useLocation();

  const [openProducts, setOpenProducts] = useState(true);
  const [openUsers, setOpenUsers] = useState(true);
  const [openOrders, setOpenOrders] = useState(true);

  return (
    <Box sx={{ width: 260, backgroundColor: '#FFFFFF', minHeight: '100vh', p: 2, borderRight: '1px solid #E2E8F0' }}>
      <Typography variant="h6" sx={{ fontWeight: 900, mb: 3, px: 2, color: '#0F172A', letterSpacing: '-0.5px' }}>
        SHOP.CO
      </Typography>

      <List component="nav" disablePadding>
        {/* 1. Dashboard Home Link */}
        <ListItemButton
          component={Link}
          to="/dashboard"
          selected={location.pathname === '/dashboard'}
          sx={{
            borderRadius: '12px',
            color: location.pathname === '/dashboard' ? '#6B21A8' : '#475569',
            backgroundColor: location.pathname === '/dashboard' ? '#F3E8FF' : 'transparent',
            '&:hover': { backgroundColor: '#F3E8FF', color: '#6B21A8' },
            mb: 1,
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Dashboard</Typography>}
          />
        </ListItemButton>

        {/* 2. Products Menu (No Create) */}
        <ListItemButton
          onClick={() => setOpenProducts(!openProducts)}
          sx={{
            borderRadius: '12px',
            backgroundColor: openProducts ? '#F3E8FF' : 'transparent',
            color: '#6B21A8',
            '&:hover': { backgroundColor: '#F3E8FF' },
            mb: 1,
          }}
        >
          <ListItemIcon sx={{ color: '#6B21A8', minWidth: 36 }}>
            <ShoppingBagOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Products</Typography>}
          />
          {openProducts ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openProducts} timeout="auto" unmountOnExit>
          <Box
            sx={{
              pl: 3.5,
              position: 'relative',
              mb: 1,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: '20px',
                top: 0,
                bottom: 0,
                width: '1px',
                backgroundColor: '#E9D5FF',
              },
            }}
          >
            <ListItemButton
              component={Link}
              to="/dashboard/products"
              selected={location.pathname === '/dashboard/products'}
              sx={{ py: 0.8, borderRadius: '8px' }}
            >
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: '#6B21A8' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#6B21A8' }}>
                    List
                  </Typography>
                }
              />
            </ListItemButton>
          </Box>
        </Collapse>

        {/* 3. Users Menu (Only List - Social/Profile/Cards removed) */}
        <ListItemButton
          onClick={() => setOpenUsers(!openUsers)}
          sx={{
            borderRadius: '12px',
            backgroundColor: openUsers ? '#F3E8FF' : 'transparent',
            color: '#6B21A8',
            '&:hover': { backgroundColor: '#F3E8FF' },
            mb: 1,
          }}
        >
          <ListItemIcon sx={{ color: '#6B21A8', minWidth: 36 }}>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Users</Typography>}
          />
          {openUsers ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <Box
            sx={{
              pl: 3.5,
              position: 'relative',
              mb: 1,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: '20px',
                top: 0,
                bottom: 0,
                width: '1px',
                backgroundColor: '#E9D5FF',
              },
            }}
          >
            <ListItemButton
              component={Link}
              to="/dashboard/users/list"
              selected={location.pathname === '/dashboard/users/list'}
              sx={{ py: 0.8, borderRadius: '8px' }}
            >
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: '#6B21A8' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#6B21A8' }}>
                    List
                  </Typography>
                }
              />
            </ListItemButton>
          </Box>
        </Collapse>

        {/* 4. Order Menu (Only List & Details - Create/Edit removed) */}
        <ListItemButton
          onClick={() => setOpenOrders(!openOrders)}
          sx={{
            borderRadius: '12px',
            backgroundColor: openOrders ? '#F3E8FF' : 'transparent',
            color: '#6B21A8',
            '&:hover': { backgroundColor: '#F3E8FF' },
            mb: 1,
          }}
        >
          <ListItemIcon sx={{ color: '#6B21A8', minWidth: 36 }}>
            <ShoppingCartOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Order</Typography>}
          />
          {openOrders ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openOrders} timeout="auto" unmountOnExit>
          <Box
            sx={{
              pl: 3.5,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: '20px',
                top: 0,
                bottom: 0,
                width: '1px',
                backgroundColor: '#E9D5FF',
              },
            }}
          >
            <ListItemButton
              component={Link}
              to="/dashboard/orders/list"
              selected={location.pathname === '/dashboard/orders/list'}
              sx={{ py: 0.8, borderRadius: '8px', mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: '#6B21A8' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#6B21A8' }}>
                    List
                  </Typography>
                }
              />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/dashboard/orders/details"
              selected={location.pathname === '/dashboard/orders/details'}
              sx={{ py: 0.8, borderRadius: '8px' }}
            >
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: '#6B21A8' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#6B21A8' }}>
                    Details
                  </Typography>
                }
              />
            </ListItemButton>
          </Box>
        </Collapse>
      </List>
    </Box>
  );
};

export default Sidebar;