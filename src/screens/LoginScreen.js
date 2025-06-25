import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../state/auth/Action';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUser } from '../state/auth/Action';


const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {auth } = useSelector(store=>store);
  console.log('auth from login', auth);
  const { loading, error, jwt } = auth;


    useEffect(() => {
    if (jwt && !auth.user) {  
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  

useEffect(() => {
  if (auth.jwt) {
    navigate('/');
  }
}, [auth.jwt]);

const submitHandler = (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const credentials = {
    email: data.get('email'),
    password: data.get('password'),
  };
  dispatch(login(credentials));
  console.log('credentials', credentials);
};


  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
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
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginScreen;
