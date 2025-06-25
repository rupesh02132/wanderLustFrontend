import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllListings,deleteListing} from "../../state/listing/Action";
import { useSelector } from "react-redux";
import { Avatar, Button, CardHeader } from "@mui/material";
import Card from "@mui/material/Card";





const ListingTable = () => {
  const dispatch = useDispatch();
  const { listings } = useSelector((store) => store);
  console.log("listings", listings);

  const handleDeleteProduct = (listingId) => {

    dispatch(deleteListing(listingId));
    console.log("clicked", listingId);
  };

 useEffect(() => {
     dispatch(getAllListings({}));
   }, [dispatch]);
 
  return (
    <div className="p-5">
      <Card className='mt-2'>
      <CardHeader title=" All Listings" />
        <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center"> Price</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Guests</TableCell>
              <TableCell align="center">BedRooms</TableCell>
              <TableCell align="center">delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listings?.listings.map((item) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Avatar alt="Remy Sharp" src={item.images[0]} />
                </TableCell>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{item.city}</TableCell>

                <TableCell align="center">₹{item.price}</TableCell>
                <TableCell align="center">{item.category}</TableCell>
                <TableCell align="center">{item.guests}</TableCell>
                <TableCell align="center">{item.bedrooms}</TableCell>
                <TableCell align="center"><Button onClick={() => handleDeleteProduct(item._id)}  variant="contained">delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Card >
      
    </div>
  );
};

export default ListingTable;
