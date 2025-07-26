import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
  Divider,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Admin/component/AdminDashboard';
import CreateListingForm from '../Admin/component/CreateListingForm';
import BookingTable from '../Admin/component/BookingTable';
import ListingTable from '../Admin/component/ListingTable';
import CustomerTable from './component/CustomerTable';
import HostBookingTable from './component/HostBookingTable';
import AdminRegisterScreen from './component/AdminRegisterScreen';

import { useDispatch } from 'react-redux';
import { logout } from '../state/auth/Action';

const drawerWidth = 240;

const menu = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardCustomizeIcon /> },
  { name: "Listings", path: "/admin/listings", icon: <ProductionQuantityLimitsIcon /> },
  { name: "Bookings", path: "/admin/bookings", icon: <BookmarkBorderIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <SupportAgentIcon /> },
  { name: "AddListing", path: "/admin/listing/new", icon: <AddShoppingCartIcon /> },
  { name: "HostBookings", path: "/admin/host/bookings", icon: <BookmarkBorderIcon /> },
  { name: "RegisterNewUser", path: "/admin/register", icon: <AddShoppingCartIcon /> }
];

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate('/login');
    }, 100);
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menu.map((item) => (
          <ListItem key={item.name} disablePadding onClick={() => {
            navigate(item.path);
            setMobileOpen(false);
          }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => {
          logoutHandler();
          setMobileOpen(false);
        }}>
          <ListItemButton>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {!isDesktop && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ fontSize: { xs: 18, sm: 22 } }}>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant={isDesktop ? 'permanent' : 'temporary'}
          open={isDesktop || mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              maxWidth: '80vw',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 1, sm: 2, md: 3 },
          py: { xs: 1, sm: 2, md: 3 },
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
          transition: 'padding 0.3s',
        }}
      >
        {/* Responsive Toolbar Spacer */}
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }} />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/listings' element={<ListingTable />} />
          <Route path='/bookings' element={<BookingTable />} />
          <Route path='/customers' element={<CustomerTable />} />
          <Route path='/listing/new' element={<CreateListingForm />} />
          <Route path='/host/bookings' element={<HostBookingTable />} />
          <Route path='/register' element={<AdminRegisterScreen />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Admin;
