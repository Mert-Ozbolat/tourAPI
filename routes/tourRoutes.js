const express = require('express')
const { getAllTours, createTour, getTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan } = require('../controllers/tourController.js')
const formattedQuery = require('../middleware/formatQuery.js')
const { protect, restrictTo } = require('../controllers/authController.js')
const reviewController = require('../controllers/reviewController.js')

const router = express.Router()

router.route('/top-tours')
    .get(aliasTopTours, getAllTours)

router.route('/tour-stats')
    .get(protect, restrictTo('admin'), getTourStats)

router.route('/monthly-plan/:year')
    .get(protect, restrictTo('admin'), getMonthlyPlan)

router.route('/')
    .get(formattedQuery, restrictTo('lead-guide', 'admin'), getAllTours)
    .post(protect, createTour)

router.route('/:id')
    .get(getTour)
    .delete(protect, restrictTo('lead-guide', 'admin'), deleteTour)
    .patch(protect, restrictTo('guide', 'lead-guide', 'admin'), updateTour)

router.route('/:tourId/reviews')
    .get(reviewController.getAllReviews)
    .post(protect, reviewController.setRefIds, reviewController.createReview)


module.exports = router

