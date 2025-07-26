import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../state/auth/Action';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

const AdminRegisterScreen = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [phoneError, setPhoneError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPhoneError('');
    setFormSuccess(false);

    const Data = new FormData(e.currentTarget);
    const phone = Data.get('phone');

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
      role: Data.get('role'),
    };

    dispatch(register(userData));
     e.target.reset();
    setFormSuccess(true);
    
  };

  return (
    <Row className="justify-content-center mt-4 px-1 px-sm-2 px-md-3 px-lg-4">
      <Col xs={12} sm={10} md={8} lg={6} xl={5} style={{ maxWidth: 500 }}>
        <Card className="shadow-sm border-0 rounded-4 p-2 p-sm-3 p-md-4">
          <Card.Body>
            <h2 className="text-center mb-3 mb-sm-4" style={{ fontSize: '1.5rem' }}>Add User (Admin Panel)</h2>

            {error && <Message variant="danger">{error}</Message>}
            {phoneError && <Message variant="danger">{phoneError}</Message>}
            {formSuccess && <Message variant="success">User created successfully</Message>}
            {loading && <Loader />}

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="firstname" className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      placeholder="Enter first name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="lastname" className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      placeholder="Enter last name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit mobile number"
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                />
              </Form.Group>

              <Form.Group controlId="role" className="mb-4">
                <Form.Label>User Role</Form.Label>
                <Form.Select name="role" required>
                  <option value="">Select role</option>
                  <option value="user">User</option>
                  <option value="host">Host</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 py-2 rounded-3" style={{ fontSize: '1rem' }}>
                Create Account
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminRegisterScreen;
