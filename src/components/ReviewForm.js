import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getAllReviews } from '../state/review/Action';
import {
  TextField,
  Button,
  Typography,
  Box,
  Rating,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';

const ReviewForm = ({ listingId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state || {});
  const {review}=useSelector(store=>store)
 



  const submitHandler = async (e) => {
  e.preventDefault();
  if (rating === 0 || comment.trim() === '') {
    alert('Please provide a rating and comment.');
    return;
  }

  try {
    await dispatch(createReview({ listingId, review: rating, comment }));
    dispatch(getAllReviews()); 
   
    setRating(0);
    setComment('');
  } catch (error) {
    console.error("Review creation failed:", error);
  }
};


  return (
    <Paper elevation={3} className="p-6 mt-6 space-y-4 rounded-xl border border-gray-200">
      <Typography variant="h5" className="font-semibold text-gray-800 mb-4">
        Write a Review
      </Typography>

      {loading && <CircularProgress color="primary" />}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Review submitted successfully!</Alert>}

      <form onSubmit={submitHandler} className="space-y-6">
        {/* Rating */}
        <Box>
          <Typography variant="subtitle1" className="text-gray-700 font-medium mb-1">
            Rating
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            size="large"
            precision={1}
            className="text-yellow-400"
          />
        </Box>

        {/* Comment TextField */}
        <TextField
          id="comment"
          label="Your Comment"
          variant="outlined"
          multiline
          fullWidth
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={loading}
          className="mt-2 font-semibold tracking-wide"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </Paper>
  );
};

export default ReviewForm;
