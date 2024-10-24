// import express from 'express';
// import User from '../models/user.js';

// const router = express.Router();

// // Get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get a single user by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Create a new user
// router.post('/', async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Update an existing user
// router.put('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     Object.assign(user, req.body);
//     await user.save();

//     res.json(user);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Delete a user
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) return res.status(404).json({ message: 'User not found' });
//     res.json({ message: 'User deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
// import express from 'express';
// import User from '../models/user.js';

// const router = express.Router();

// // Get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get a single user by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Create a new user
// router.post('/', async (req, res) => {
//   const { username, email, password } = req.body;
  
//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email already in use' });

//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Update an existing user
// router.put('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     Object.assign(user, req.body);
//     await user.save();
//     res.json(user);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Delete a user
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) return res.status(404).json({ message: 'User not found' });
//     res.json({ message: 'User deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;

// routes/userRoutes.js
import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// User registration (signup)
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful' });  // Simply return success message
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Password reset
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }
    user.password = newPassword;  // Directly update the password
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
