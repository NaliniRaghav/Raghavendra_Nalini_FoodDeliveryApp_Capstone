import express from 'express';
import User from '../models/user.js';

const router = express.Router();
 
router.post('/signup', async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    user = new User({ name, email, password, phone, address });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id/contact', async (req, res) => {
  const { street, city, state, zipCode, country, email, phone } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

 
    if (street) user.address.street = street;
    if (city) user.address.city = city;
    if (state) user.address.state = state;
    if (zipCode) user.address.zipCode = zipCode;
    if (country) user.address.country = country;
 
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();
    res.json({ message: 'Contact information updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    
    Object.assign(user, req.body);

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


 
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  try {
    const user = await User.findOne({ name });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid name or password' });
    }

    req.session.userId = user._id;  
  
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Failed to log out' });
    res.json({ message: 'Logout successful' });
  });
});

// Get profile (for authenticated user)
router.get('/me', async (req, res) => {

   

  try {
   
    console.log(req);
    const user = await User.findById(req.session.userId).select('-password');
   
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user contact details and address by user ID (partial update)
router.patch('/:id/contact', async (req, res) => {
  const { street, city, state, zipCode, country, email, phone } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
 
    if (street !== undefined) user.address.street = street;
    if (city !== undefined) user.address.city = city;
    if (state !== undefined) user.address.state = state;
    if (zipCode !== undefined) user.address.zipCode = zipCode;
    if (country !== undefined) user.address.country = country;
 
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;

    await user.save();
    res.json({ message: 'Contact information updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

 
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    Object.assign(user, req.body);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

 
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
