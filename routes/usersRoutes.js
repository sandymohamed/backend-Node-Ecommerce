const express = require('express');
const router = express.Router();
const { getUsers, getUserByID, authUser, getUserProfile, registerUser, updateUserProfile, getUserDetails, deleteUser } = require('../controller/userController');
const multer = require('multer');
const { protect, adminOnly } = require('../middleware/authMiddleware');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use the original filename for the uploaded file
  }
});


// Create Multer instance
const upload = multer({ storage: storage });


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