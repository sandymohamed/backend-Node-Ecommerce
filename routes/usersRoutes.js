const express = require('express');
const router = express.Router();
const { getUsers, getUserByID, authUser, getUserProfile, registerUser } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getUsers);

router.post('/signup', registerUser);
router.post('/login', authUser)


router.get('/:id', getUserByID)
router.get('/profile', protect, getUserProfile)


module.exports = {
    usersRouter: router
}