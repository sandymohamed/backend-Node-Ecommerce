const express = require('express');
const router = express.Router();
const { getUsers, getUserByID, authUser, getUserProfile, registerUser, updateUserProfile, getUserDetails, deleteUser } = require('../controller/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('./multerConfig'); 



router.get('/', protect, adminOnly, getUsers);
router.get('/user-details', protect, getUserDetails);

router.post('/signup', upload.single('avatar'), registerUser);
router.post('/login', upload.single('avatar'), authUser)


router.get('/profile', protect, getUserProfile)

router.put('/profile', upload.single('avatar'), protect, updateUserProfile)

router.get('/:id', protect, getUserByID)
router.delete('/', protect, deleteUser)


module.exports = {
    usersRouter: router
}