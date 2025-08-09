import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getAllReviews } from "../state/review/Action";
import {
  TextField,
  Button,
  Typography,
  Box,
  Rating,
  Alert,
  CircularProgress,
  Paper,
  Slide,
  Fade,
} from "@mui/material";

const ReviewForm = ({ listingId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [animateStars, setAnimateStars] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state || {});

  // Fade-in animation trigger
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Auto-hide success message
  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide a rating and comment.");
      return;
    }

    try {
      await dispatch(createReview({ listingId, review: rating, comment }));
      dispatch(getAllReviews());
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Review creation failed:", error);
    }
  };

  return (
    <Fade in={fadeIn} timeout={600}>
      <Paper
        elevation={4}
        className="p-6 sm:p-8 mt-6 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.01] bg-white"
      >
        {/* Title */}
        <Typography
          variant="h5"
          className="font-bold text-gray-800 mb-4 text-center sm:text-left"
        >
          ✍️ Write a Review
        </Typography>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center py-2">
            <CircularProgress color="primary" />
          </div>
        )}

        {/* Error Message */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Success Message */}
        <Slide direction="down" in={showSuccess} mountOnEnter unmountOnExit>
          <Alert severity="success" sx={{ mb: 2 }}>
            Review submitted successfully!
          </Alert>
        </Slide>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Rating */}
          <Box>
            <Typography
              variant="subtitle1"
              className="text-gray-700 font-medium mb-2"
            >
              Rating
            </Typography>
            <div
              className={`transition-transform duration-300 ${
                animateStars ? "scale-110" : ""
              }`}
            >
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                  setAnimateStars(true);
                  setTimeout(() => setAnimateStars(false), 200);
                }}
                size="large"
                precision={1}
                className="text-yellow-400"
              />
            </div>
          </Box>

          {/* Comment Input */}
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
            InputProps={{
              style: {
                borderRadius: "12px",
                backgroundColor: "#f9fafb",
              },
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
            sx={{
              borderRadius: "12px",
              paddingY: "10px",
              fontWeight: "600",
              background: "linear-gradient(45deg, #4facfe 30%, #00f2fe 90%)",
              "&:hover": {
                background: "linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)",
              },
            }}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </Paper>
    </Fade>
  );
};

export default ReviewForm;
