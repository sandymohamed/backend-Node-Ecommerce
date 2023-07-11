const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { getReviews, addNewReview, getReviewByID, editReview, deleteReviewByID } = require('../controller/ReviewsController');


router.post('/', getReviews)
router.post('/new', protect, addNewReview)

router.put('/edit/:id', protect, editReview)


router.get('/:id', getReviewByID)



router.delete('/:id', protect, adminOnly, deleteReviewByID);





module.exports = {
  reviewRouter: router
}