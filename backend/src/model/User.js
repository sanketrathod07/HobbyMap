const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: {
        type: String, required: true, unique: true, validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: { type: String, required: true },
    age: { type: Number, default: null },
    hobbies: { type: [String], default: [] },
});

module.exports = mongoose.model('User', UserSchema);
