const express = require('express');
const router = express.Router();
const { getUsers, getUserByID, authUser, getUserProfile, registerUser, updateUserProfile, getUserDetails } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getUsers);
router.get('/user-details', protect, getUserDetails);

router.post('/signup', registerUser);
router.post('/login', authUser)


router.get('/:id', getUserByID)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect,updateUserProfile)


module.exports = {
    usersRouter: router
}