const User = require('../model/User')
const { v4: uuidv4 } = require('uuid');


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'getUsers Server error' });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, age, hobbies } = req.body;

        // Find user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // update fields
        user.age = age || user.age;
        user.hobbies = hobbies || user.hobbies;
        user.username = username || user.username;

        // Save updated user
        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { updateUser, getUsers };