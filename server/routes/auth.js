import express from 'express';
import User from '../models/User.js';
import { generateToken, protect, isUserAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide username and password' });
        }

        // Check if user exists
        const userExists = await User.findOne({ username: username.toLowerCase() });
        if (userExists) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Create user
        const user = await User.create({
            username: username.toLowerCase(),
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                isAdmin: isUserAdmin(user),
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

// @route   POST /api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide username and password' });
        }

        // Find user
        const user = await User.findOne({ username: username.toLowerCase() });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                isAdmin: isUserAdmin(user),
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
    res.json({
        _id: req.user._id,
        username: req.user.username,
        isAdmin: isUserAdmin(req.user)
    });
});

export default router;
