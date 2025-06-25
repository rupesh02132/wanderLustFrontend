import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../state/auth/Action';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error, user } = useSelector((state) => state.auth);

console.log('user', user);

  useEffect(() => {
    if (user?.success) {
      navigate('/register');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedUser = {
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    dispatch(updateUserProfile(updatedUser));
    console.log('updatedUser', updatedUser);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Update Profile</h2>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstname" className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            placeholder="Enter first name"
            defaultValue={userInfo?.name?.split(' ')[0] || ''}
            required
          />
        </Form.Group>

        <Form.Group controlId="lastname" className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            placeholder="Enter last name"
            defaultValue={userInfo?.name?.split(' ').slice(1).join(' ') || ''}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            defaultValue={userInfo?.email}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-4">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter new password"
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-2 font-semibold"
        >
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default ProfileScreen;
