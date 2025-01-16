const express = require('express')
const router = express.Router();
const { updateUser, getUsers } = require('../controllers/userController');

// Route to get all users
router.get('/', getUsers);

// Route to update a user
router.put('/update/:id', updateUser);

module.exports = router;