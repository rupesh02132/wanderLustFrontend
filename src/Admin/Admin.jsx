import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ListItemButton, ListItem, ListItemIcon, ListItemText, List, Box, Toolbar, Drawer, CssBaseline } from '@mui/material';

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Admin/component/AdminDashboard';
import CreateListingForm from '../Admin/component/CreateListingForm';
import BookingTable from '../Admin/component/BookingTable';
import ListingTable from '../Admin/component/ListingTable';

import CustomerTable from './component/CustomerTable';
import HostBookingTable from './component/HostBookingTable';
import AdminRegisterScreen from './component/AdminRegisterScreen';

import { useDispatch } from 'react-redux';
import { logout } from '../state/auth/Action';







const menu = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardCustomizeIcon /> },
  { name: "Listings", path: "/admin/listings", icon: <ProductionQuantityLimitsIcon /> },
  { name: "Bookings", path: "/admin/bookings", icon: <BookmarkBorderIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <SupportAgentIcon /> },
  { name: "AddListing", path: "/admin/listing/new", icon: <AddShoppingCartIcon /> }, 
  { name: "HostBookings", path: "/admin/host/bookings", icon: <BookmarkBorderIcon /> },
  {name:"RegisterNewUser",path:"/admin/register",icon:<AddShoppingCartIcon/>}
];

const Admin = () => {
const navigate=useNavigate();
  const dispatch=useDispatch();
 const logoutHandler = () => {
  dispatch(logout());
  setTimeout(() => {
    navigate('/login');
  }, 100);
};


  const theme=useTheme();
  const isLargeScreen=useMediaQuery(theme.breakpoints.up('md'));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  


  const drawer=(
    <Box sx={{
      overflow:"auto",
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between",
      height:"100%"
    }}>
{/* {isLargeScreen && <Toolbar/>} */}
      <List>
        {menu.map((item,index)=>(
          <ListItem key={item.name} disablePadding onClick={()=>navigate(item.path)}>
            <ListItemButton>
            {/* <ListItemIcon>{index%2===0?<InboxIcon/>:<EmailIcon/>}</ListItemIcon> */}
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        
          <ListItem  disablePadding onClick={()=>navigate()}>
            <ListItemButton>
            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
            <ListItemText  onClick={logoutHandler}>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        
      </List>
    </Box>
  )
  return (
    <div>
      <div className='flex h-[100vh] '>
        <CssBaseline/>
      <div className='w-[15%] border border-gray-300 h-full fixed top-0'>
          {drawer}
          </div>
         
         <div className='w-[85%] ml-[15%]  h-full'>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/listings' element={<ListingTable/>}></Route>
            <Route path='/bookings' element={<BookingTable/>}></Route>
            <Route path='customers' element={<CustomerTable/>}></Route>
            <Route path='/listing/new' element={<CreateListingForm/>}></Route>
            <Route path='/host/bookings' element={<HostBookingTable/>}></Route>
            <Route path='/register' element={<AdminRegisterScreen/>}></Route>


          </Routes>
         </div>
        </div>
    </div>
  )
}

export default Admin
