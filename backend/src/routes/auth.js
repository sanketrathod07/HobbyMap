const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../model/User');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;


router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Hash the Password
        const hashPassword = await bcrypt.hash(password, 10)

        // Create new User
        const newUser = new User({ username, password: hashPassword, email });
        await newUser.save();

        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
})

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate token (optional)
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", user: { id: user._id, username: user.username, token } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router