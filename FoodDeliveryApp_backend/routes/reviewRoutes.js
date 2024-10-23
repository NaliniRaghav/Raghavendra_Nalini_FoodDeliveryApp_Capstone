import express from 'express';
import Review from '../models/review.js';

const router = express.Router();

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('userId restaurantId');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('userId restaurantId');
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new review
router.post('/', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an existing review
router.put('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    Object.assign(review, req.body);
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a review
router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
