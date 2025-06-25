import { Form } from 'react-bootstrap';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <Form.Group controlId="categoryFilter">
      <Form.Label>Category</Form.Label>
      <Form.Select 
        value={selectedCategory} 
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default CategoryFilter;