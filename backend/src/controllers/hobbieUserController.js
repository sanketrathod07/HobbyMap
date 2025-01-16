const HobbiesUsers = require('../model/HobbieUsers')


const getHobbieUsers = async (req, res) => {
    try {
        const HobbieUsers = await HobbiesUsers.find();
        res.status(200).json(HobbieUsers)
    } catch (error) {
        res.status(500).json({ message: "Error getting Hobbie Users" })
    }
}

const addHobbieUsers = async (req, res) => {
    try {
        const { username, age, hobbies } = req.body;
        const isAlreadyExits = await HobbiesUsers.findOne({ username });

        if (isAlreadyExits) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        const newUser = new HobbiesUsers({ username, age, hobbies });
        await newUser.save();

        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error in addHobbieUsers:", error.message); // Log error for debugging
        res.status(500).json({ message: "Error in creating user" }); // Corrected error message
    }
};


const updateHobbieUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, age, hobbies } = req.body;

        // Find user by ID
        const checkUser = await HobbiesUsers.findById(id);
        if (!checkUser) {
            return res.status(400).json({ message: "User not found" });
        }

        // Update user fields
        checkUser.username = username || checkUser.username;
        checkUser.age = age || checkUser.age;
        checkUser.hobbies = hobbies || checkUser.hobbies;

        // Save updated user
        await checkUser.save();

        res.status(200).json({ message: "User updated successfully", user: checkUser });
    } catch (error) {
        console.error("Error updating user:", error.message); // Log error for debugging
        res.status(500).json({ message: "Error updating user" }); // Corrected error message
    }
};

const deleteHobbieUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the user
        const deletedUser = await HobbiesUsers.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error.message); // Log error for debugging
        res.status(500).json({ message: "Error deleting user" });
    }
};


module.exports = { getHobbieUsers, addHobbieUsers, updateHobbieUsers, deleteHobbieUser }