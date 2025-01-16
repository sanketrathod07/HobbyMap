const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const {
    getHobbieUsers,
    addHobbieUsers,
    updateHobbieUsers,
    deleteHobbieUser
} =
    require('../controllers/hobbieUserController');

router.get('/', getHobbieUsers)

router.post('/addUser', addHobbieUsers)

router.put('/update/:id', updateHobbieUsers)

router.delete('/delete/:id', deleteHobbieUser)

module.exports = router;