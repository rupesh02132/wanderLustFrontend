import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ searchHandler }) => {
  return (
    <Form onSubmit={searchHandler} className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search by city..."
        className="me-2"
        aria-label="Search"
        name="city"
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;