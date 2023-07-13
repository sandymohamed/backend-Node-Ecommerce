const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { getReviews, addNewReview, getReviewByID, editReview, deleteReviewByID, deleteReviewByIDAdmin } = require('../controller/ReviewsController');
const multer = require('multer');


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



router.post('/', getReviews)
router.post('/new', protect, addNewReview)

router.put('/edit/:id', protect, editReview)


router.get('/:id', getReviewByID)

router.delete('/admin/:id', protect, adminOnly, deleteReviewByIDAdmin);
router.delete('/:id', protect, deleteReviewByID);




module.exports = {
  reviewRouter: router
}