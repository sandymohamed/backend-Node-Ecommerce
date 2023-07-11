const asyncHandler = require('express-async-handler')
const ReviewsModel = require('../models/ReviewsModel')
const UserModel = require('../models/UserModel');


exports.getReviews = asyncHandler(async (req, res) => {

  const productId = req.body.product;
  // const userId = req.user._id;


  if (productId) {
    const reviews = await ReviewsModel.find({ productId }).populate('userId')
    if (!reviews) {

      res.status(200).json({ message: 'There is no reviews yet!!' })
    }
    return res.json(reviews)

  } else {
    res.status(404).json({ message: 'Product not found!' })
  }
}
)


exports.getReviewByID = asyncHandler(async (req, res) => {
  const review = await ReviewsModel.findById(req.params.id)

  if (review) {
    res.json(review)
  } else {
    res.status(404).json({ message: 'review not found!!' })
  }

})



exports.addNewReview = asyncHandler(async (req, res) => {
  const user = req.user._id;

  if (!req.body.product && !user) {
    return res.status(400).json({ message: 'No user or product selected' });
  }

  const newReview = new ReviewsModel({
    productId: req.body.product,
    userId: user,
    rating: req.body.rating,
    comment: req.body.comment,

  });

  try {
    const createdReview = await newReview.save();

    res.json(createdReview);
  } catch (error) {
    res.status(500).json({ message: 'Product creation failed' });
  }
});


exports.editReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user._id;

  console.log('user', user);
  const review = await ReviewsModel.findById(id);

  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  console.log('review', review);
  review.rating = req.body.rating;
  review.comment = req.body.comment;

  try {
    if (review.userId.equals(user)) {
      console.log('equal');
      const updatedReview = await review.save(); // Fixed typo here
      res.json(updatedReview);
    } else {
      res.status(403).json({ message: 'Unauthorized!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Review update failed!' });
  }
});





exports.deleteReviewByID = asyncHandler(async (req, res) => {

  const reviews = await ReviewsModel.findByIdAndDelete(req.params.id)

  if (!reviews) {
    res.status(404).json({ message: 'review not found!!' })
  } else {
    res.json({ message: `review ${req.params.id} deleted successfully` })
  }

})

