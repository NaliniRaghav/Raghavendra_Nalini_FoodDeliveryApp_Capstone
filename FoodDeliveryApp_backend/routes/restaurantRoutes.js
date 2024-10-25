import express from 'express';
import Restaurant from '../models/restaurant.js';

const router = express.Router();

// Get all restaurants with optional search query
router.get('/', async (req, res) => {
  const { search } = req.query;
  try {
    const query = search
      ? { $or: [ { name: { $regex: search, $options: 'i' } }, { cuisine: { $regex: search, $options: 'i' } } ] }
      : {};

    const restaurants = await Restaurant.find(query).populate('menu reviews');
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('menu reviews');
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new restaurant
router.post('/', async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an existing restaurant
router.put('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    Object.assign(restaurant, req.body);
    await restaurant.save();

    res.json(restaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a restaurant
router.delete('/:id', async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json({ message: 'Restaurant deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
