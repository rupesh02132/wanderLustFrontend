import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListings, deleteListing } from "../../state/listing/Action";

import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ListingTable = () => {
  const dispatch = useDispatch();
  const { listings } = useSelector((store) => store);
  

  const handleDeleteProduct = (listingId) => {
    dispatch(deleteListing(listingId));
    console.log("clicked", listingId);
  };

  useEffect(() => {
    dispatch(getAllListings({}));
  }, [dispatch]);

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        padding: 0,
      }}
      className="px-1 sm:px-2 md:px-4 lg:px-8 py-2"
    >
      <Card
        sx={{
          mt: 2,
          width: '100%',
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <CardHeader
          title="All Listings"
          sx={{
            textAlign: 'center',
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            px: { xs: 1, sm: 2, md: 3 },
            py: { xs: 1, sm: 2 },
          }}
        />
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 440,
            overflowX: 'auto',
          }}
        >
          <Table
            stickyHeader
            aria-label="product table"
            sx={{
              minWidth: 650,
              width: '100%',
            }}
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Image</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Title</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>City</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Price</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Category</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Guests</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Bedrooms</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, px: { xs: 0.5, sm: 1 } }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listings?.listings.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell align="center">
                    <Avatar
                      alt={item.title}
                      src={item.images?.[0]}
                      sx={{
                        width: { xs: 26, sm: 36 },
                        height: { xs: 26, sm: 36 },
                        mx: 'auto',
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.85rem' },
                      maxWidth: { xs: 70, sm: 120 },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.title}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.85rem' },
                    }}
                  >
                    {item.city}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.85rem' },
                    }}
                  >
                    ₹{item.price}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.85rem' },
                    }}
                  >
                    {item.category}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.85rem' },
                    }}
                  >
                    {item.guests}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.85rem' },
                    }}
                  >
                    {item.bedrooms}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => handleDeleteProduct(item._id)}
                      sx={{
                        fontSize: { xs: '0.65rem', sm: '0.8rem' },
                        paddingX: { xs: 0.7, sm: 2 },
                        paddingY: { xs: 0.3, sm: 1 },
                        minWidth: { xs: 48, sm: 64 },
                      }}
                    >
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

export default ListingTable;
