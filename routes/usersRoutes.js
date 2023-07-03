const express = require('express');
const router = express.Router();
const { getUsers, getUserByID, authUser, getUserProfile, registerUser, updateUserProfile, getUserDetails, deleteUser } = require('../controller/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, adminOnly, getUsers);
router.get('/user-details', protect, getUserDetails);

router.post('/signup', registerUser);
router.post('/login', authUser)


router.get('/:id', protect, getUserByID)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
router.delete('/', protect, deleteUser)


module.exports = {
    usersRouter: router
}