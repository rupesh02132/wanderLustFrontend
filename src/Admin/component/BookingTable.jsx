import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { AvatarGroup, Avatar, Button } from "@mui/material";


import { getAllBookings, deleteBooking } from "../../state/booking/Action";

const OrderTable = () => {
  const { bookings } = useSelector(store=>store);
  console.log("booking..",bookings)
 
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);
  const handleDelete = (bookingId) => {
    dispatch(deleteBooking(bookingId));
  };

  const [anchorEl, setAnchorEl] = useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (e, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = e.currentTarget;
    setAnchorEl(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  return (
    <div className="px-1 sm:px-3 md:px-5 py-2 sm:py-4">
      <Card className="mt-2">
        <CardHeader title="All Bookings" sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }, px: { xs: 1, sm: 2, md: 3 }, py: { xs: 1, sm: 2 } }} />
        <TableContainer sx={{ maxHeight: 1000, width: '100%', overflowX: 'auto' }} component={Paper}>
          <Table sx={{ minWidth: 650, width: '100%' }} aria-label="product table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Image</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Title</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Guests</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Check In - Check Out</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Total Price</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Status</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.allBookings?.map((item, index) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <AvatarGroup sx={{ display: "flex", justifyContent: "center" }}>
                      <Avatar alt="Listing" src={item.listing?.images?.[0]} sx={{ width: { xs: 26, sm: 36 }, height: { xs: 26, sm: 36 } }} />
                    </AvatarGroup>
                  </TableCell>

                  <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' }, maxWidth: { xs: 70, sm: 120 }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.listing?.title}</TableCell>

                  <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>{item.guests}</TableCell>

                  <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                    {new Date(item.checkIn).toLocaleDateString()} -{" "}
                    {new Date(item.checkOut).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>₹{item.totalPrice}</TableCell>

                  <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                    {item.isPaid ? "Paid" : "Pending"}
                  </TableCell>

                  <TableCell align="center">
                    <Button variant="contained" color="error" size="small" sx={{ fontSize: { xs: '0.65rem', sm: '0.8rem' }, px: { xs: 0.7, sm: 2 }, py: { xs: 0.3, sm: 1 }, minWidth: { xs: 48, sm: 64 } }} onClick={() => handleDelete(item._id)}  >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrderTable;
