import React, { useEffect } from "react";
import { Avatar,  Card, CardContent, Typography, Divider } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../state/auth/Action';
const UserProfile = () => {
 const dispatch = useDispatch();

  const {auth } = useSelector(store=>store);
   console.log('auth from login', auth.user.user);
   const {jwt } = auth;
   console.log("iii",auth.user.user.firstname?.slice(0,1).toUpperCase());

   useEffect(() => {
      if (jwt && !auth.user) {  
        dispatch(getUser(jwt));
      }
    }, [dispatch,auth.user,jwt]);


  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    location: "India",
    bio: "Loves to travel and explore new places.",
    joined: auth.user.user.createdAt,
  };
const date = new Date(user.joined);

const options = { 
  timeZone: 'Asia/Kolkata', 
  day: 'numeric', 
  month: 'long', 
  year: 'numeric' 
};
  return (
    <Container className="my-5">
      <Card className="shadow-lg rounded-xl">
        <CardContent>
          <Row className="items-center">
            {/* Left Column - Avatar & Basic Info */}
            <Col md={4} className="text-center mb-4">
              <Avatar
  alt={auth.user.user.firstname}
  sx={{ width: 120, height: 120 }}
  className="mx-auto h-16 w-16 rounded-full object-cover"
>
  {auth.user.user.firstname?.slice(0,1).toUpperCase()}
</Avatar>

              <Typography variant="h6" className="mt-4">
                {auth.user.user.firstname} {auth.user.user.lastname}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {auth.user.user.email}
              </Typography>
             
            </Col>

            {/* Right Column - Profile Details */}
            <Col md={8}>
              <Typography variant="h6" className="mb-2 font-bold">
                Profile Information
              </Typography>
              <Divider className="mb-4" />
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-medium">Location:</span> {user.location}</p>
                <p><span className="font-medium">About:</span> {user.bio}</p>
                <p><span className="font-medium">Joined:</span> {date.toLocaleDateString('en-IN', options)}</p>
              </div>

              <div className="mt-6">
                <Typography variant="h6" className="mb-2 font-bold">
                  Booking Summary
                </Typography>
                <Divider className="mb-4" />
                <ul className="list-disc list-inside text-sm text-gray-700">
                  <li>5 stays completed</li>
                  <li>2 stays upcoming</li>
                  <li>1 canceled booking</li>
                </ul>
              </div>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
