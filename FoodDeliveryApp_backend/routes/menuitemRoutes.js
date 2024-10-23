import express from 'express';
import MenuItem from '../models/menuitem.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new menu item
router.post('/', async (req, res) => {
  try {
    const newMenuItem = new MenuItem(req.body);
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an existing menu item
router.put('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

    Object.assign(menuItem, req.body);
    await menuItem.save();

    res.json(menuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
