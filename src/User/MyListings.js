// src/screens/user/MyListings.js
import { Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';

const MyListings = ({ listings }) => {
  return (
    <div className="my-listings">
      {listings.length === 0 ? (
        <Message variant="info">You have no listings yet.</Message>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.listing.map(listing => (
              <tr key={listing._id}>
                <td>{listing.title}</td>
                <td>${listing.price}</td>
                <td>{listing.category}</td>
                <td>
                  <Badge bg={listing.isPublished ? 'success' : 'secondary'}>
                    {listing.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    as={Link}
                    to={`/host/listings/${listing._id}/edit`}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    // Add delete handler here
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div className="mt-4">
        <Button as={Link} to="/host/listings/new" variant="primary">
          Create New Listing
        </Button>
      </div>
    </div>
  );
};

export default MyListings;