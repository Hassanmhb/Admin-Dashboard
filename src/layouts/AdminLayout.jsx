import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  InputBase,
  Collapse,
  useMediaQuery,
  useTheme,
  Paper,
  ClickAwayListener,
  Tooltip,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useAdminAuth } from '../context/AdminAuthContext';

const DRAWER_WIDTH = 260;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/dashboard' },
  {
    text: 'Products',
    icon: <Inventory2OutlinedIcon />,
    children: [
      { text: 'List', path: '/products' },
    ],
  },
  {
    text: 'Users',
    icon: <AdminPanelSettingsOutlinedIcon />,
    children: [
      { text: 'List', path: '/users/list' },
    ],
  },
  {
    text: 'Order',
    icon: <ShoppingBagOutlinedIcon />,
    children: [
      { text: 'List', path: '/orders/list' },
      { text: 'Details', path: '/orders/details' },
    ],
  },
];

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auth Context Hook Integration
  const { logoutAdmin } = useAdminAuth();

  // Search Functionality States
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [openSections, setOpenSections] = useState({
    Products: true,
    Users: true,
    Order: true,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const staticPages = [
        { id: 1, name: 'Products List', path: '/products' },
        { id: 2, name: 'Users List', path: '/users/list' },
        { id: 3, name: 'Orders List', path: '/orders/list' },
        { id: 4, name: 'Order Details', path: '/orders/details' },
      ];

      const filtered = staticPages.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchTerm]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleSectionClick = (text) => {
    setOpenSections((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchTerm('');
    setShowSearchResults(false);
  };

  // 🟢 Fixed Logout Handler (Prevents Back Button Access)
  const handleLogout = () => {
    if (logoutAdmin) {
      logoutAdmin();
    } else {
      localStorage.clear();
      sessionStorage.clear();
    }
    navigate('/login', { replace: true });
  };

  const drawerContent = (
    <Box sx={{ height: '100%', backgroundColor: '#FFF', borderRight: '1px solid #E3E8EF' }}>
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ backgroundColor: '#5E35B1', width: 38, height: 38, fontWeight: 700 }}>
          H
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#121926', letterSpacing: 0.5 }}>
          HASSAN ADMIN
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{
          px: 3,
          pt: 1,
          pb: 1,
          display: 'block',
          fontWeight: 700,
          color: '#364152',
          fontSize: '0.75rem',
        }}
      >
        Application
      </Typography>

      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const hasChildren = Boolean(item.children);
          const isSectionOpen = Boolean(openSections[item.text]);
          const isParentSelected = item.path 
            ? location.pathname === item.path
            : location.pathname.startsWith(`/${item.text.toLowerCase()}`);

          return (
            <React.Fragment key={item.text}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => {
                    if (hasChildren) {
                      handleSectionClick(item.text);
                    } else {
                      navigate(item.path);
                      if (isMobile) setMobileOpen(false);
                    }
                  }}
                  sx={{
                    borderRadius: '12px',
                    backgroundColor: isParentSelected ? '#EDE7F6' : 'transparent',
                    color: isParentSelected ? '#5E35B1' : '#697586',
                    '&:hover': {
                      backgroundColor: isParentSelected ? '#EDE7F6' : '#F4F6F8',
                      color: isParentSelected ? '#5E35B1' : '#121926',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isParentSelected ? '#5E35B1' : '#697586', minWidth: 38 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: isParentSelected ? 700 : 500,
                          fontSize: '0.875rem',
                        },
                      },
                    }}
                  />
                  {hasChildren && (isSectionOpen ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />)}
                </ListItemButton>
              </ListItem>

              {hasChildren && (
                <Collapse in={isSectionOpen} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    sx={{
                      position: 'relative',
                      pl: 2.5,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: '26px',
                        top: 0,
                        bottom: 0,
                        width: '1px',
                        backgroundColor: '#E3E8EF',
                      },
                    }}
                  >
                    {item.children.map((child) => {
                      const isChildSelected = location.pathname === child.path;
                      return (
                        <ListItem key={child.text} disablePadding sx={{ my: 0.2 }}>
                          <ListItemButton
                            onClick={() => {
                              navigate(child.path);
                              if (isMobile) setMobileOpen(false);
                            }}
                            sx={{
                              pl: 3,
                              py: 0.6,
                              borderRadius: '8px',
                              color: isChildSelected ? '#5E35B1' : '#697586',
                              backgroundColor: isChildSelected ? '#F4F6F8' : 'transparent',
                              '&:hover': {
                                color: '#121926',
                                backgroundColor: '#F4F6F8',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <FiberManualRecordIcon
                                sx={{
                                  fontSize: isChildSelected ? 8 : 6,
                                  color: isChildSelected ? '#5E35B1' : '#9E9E9E',
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={child.text}
                              slotProps={{
                                primary: {
                                  sx: {
                                    fontSize: '0.825rem',
                                    fontWeight: isChildSelected ? 700 : 500,
                                  },
                                },
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#EEF2F6', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          backgroundColor: '#FFF',
          borderBottom: '1px solid #E3E8EF',
          color: '#121926',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1.5, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
              <MenuIcon />
            </IconButton>

            <ClickAwayListener onClickAway={() => setShowSearchResults(false)}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E3E8EF',
                    borderRadius: '12px',
                    px: 1,
                    py: 0.4,
                    width: { xs: 180, sm: 280 },
                  }}
                >
                  <SearchIcon sx={{ color: '#697586', mr: 0.5, fontSize: 18 }} />
                  <InputBase
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ fontSize: '0.8rem', width: '100%' }}
                  />
                  <IconButton size="small" sx={{ p: 0.4, backgroundColor: '#EDE7F6', borderRadius: '8px' }}>
                    <TuneIcon sx={{ fontSize: 14, color: '#5E35B1' }} />
                  </IconButton>
                </Box>

                {showSearchResults && (
                  <Paper
                    elevation={4}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      mt: 1,
                      zIndex: 10,
                      maxHeight: 250,
                      overflowY: 'auto',
                      borderRadius: '12px',
                    }}
                  >
                    {searchResults.length > 0 ? (
                      <List disablePadding>
                        {searchResults.map((result) => (
                          <ListItem key={result.id} disablePadding>
                            <ListItemButton
                              onClick={() => handleSearchResultClick(result.path)}
                              sx={{ py: 1, px: 2, '&:hover': { backgroundColor: '#F4F6F8' } }}
                            >
                              <Typography variant="body2" sx={{ fontSize: '0.825rem', color: '#121926' }}>
                                {result.name}
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Box sx={{ p: 1.5, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#697586' }}>
                          No results found
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                )}
              </Box>
            </ClickAwayListener>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ backgroundColor: '#EDE7F6', color: '#5E35B1', borderRadius: '8px', p: 0.8 }}>
              <NotificationsNoneOutlinedIcon fontSize="small" />
            </IconButton>

            <Tooltip title="Logout">
              <IconButton
                onClick={handleLogout}
                sx={{
                  backgroundColor: '#FEE4E2',
                  color: '#D92D20',
                  borderRadius: '8px',
                  p: 0.8,
                  '&:hover': { backgroundColor: '#FECDCA' },
                }}
              >
                <LogoutOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' } }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1.5, sm: 2.5, md: 3 },
          width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: '56px', sm: '64px' },
          boxSizing: 'border-box',
          overflowX: 'hidden',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;