import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Card,
  CardHeader,
} from "@mui/material";
import { getAllUser, deleteUser } from "../../state/auth/Action"; // adjust import path

const CustomerTable = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.auth.users);

  console.log("users", users);

  // useEffect(() => {
  //   dispatch(getAllUser());
  // }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
    dispatch(getAllUser());
  };

  return (
    <div className="p-5">
      <Card>
        <CardHeader title="Registered Customers" />
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell align="center">Avatar</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell align="center">
                      <Avatar src={user.avatar || undefined}>
                        {!user.avatar &&
                          user.firstname?.charAt(0).toUpperCase()}
                      </Avatar>
                    </TableCell>
                    <TableCell align="center">
                      {user.firstname} {user.lastname}
                    </TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default CustomerTable;
