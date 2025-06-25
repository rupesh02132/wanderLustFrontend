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
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="All Bookings" />
        <TableContainer sx={{ maxHeight: 1000 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Guests</TableCell>
                <TableCell align="center">Check In - Check Out</TableCell>
                <TableCell align="center">Total Price</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Delete</TableCell>
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
                      <Avatar alt="Listing" src={item.listing?.images?.[0]} />
                    </AvatarGroup>
                  </TableCell>

                  <TableCell align="center">{item.listing?.title}</TableCell>

                  <TableCell align="center">{item.guests}</TableCell>

                  <TableCell align="center">
                    {new Date(item.checkIn).toLocaleDateString()} -{" "}
                    {new Date(item.checkOut).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="center">₹{item.totalPrice}</TableCell>

                  <TableCell align="center">
                    {item.isPaid ? "Paid" : "Pending"}
                  </TableCell>

                  <TableCell align="center">
                    <Button variant="contained" color="error" onClick={() => handleDelete(item._id)}  >
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
