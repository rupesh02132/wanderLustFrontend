import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../state/auth/Action';
import Message from '../components/Message';
import Loader from '../components/Loader';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jwt, loading, error } = useSelector((state) => state.auth);

  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [navigate, jwt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPhoneError('');

    const Data = new FormData(e.currentTarget);
    const phone = Data.get('phone');

    // ✅ Validate phone number (must be 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }

    const userData = {
      firstname: Data.get('firstname'),
      lastname: Data.get('lastname'),
      email: Data.get('email'),
      phone: phone,
      password: Data.get('password'),
    };

    dispatch(register(userData));
    console.log('userData', userData);
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        <h1>Sign Up</h1>
        {error && <Message variant="danger">{error}</Message>}
        {phoneError && <Message variant="danger">{phoneError}</Message>}
        {loading && <Loader />}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              placeholder="Enter first name"
              required
            />
          </Form.Group>

          <Form.Group controlId="lastname" className="mt-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              placeholder="Enter last name"
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group controlId="phone" className="mt-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Enter mobile number"
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-4">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
