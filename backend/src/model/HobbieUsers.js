const mongoose = require('mongoose')

const HobbiesUsers = new mongoose.Schema({
    username: { type: String, required: true },
    age: { type: Number, required: true },
    hobbies: { type: Array, required: true }
})

module.exports = mongoose.model('hobbieUsers', HobbiesUsers)