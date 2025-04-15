const express = require('express')
const { getAllTours, createTour, getTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan } = require('../controllers/tourController.js')
const formattedQuery = require('../middleware/formatQuery.js')
const { protect } = require('../controllers/authController.js')

const router = express.Router()

router.route('/top-tours')
    .get(protect, aliasTopTours, getAllTours)

router.route('/tour-stats')
    .get(protect, getTourStats)

router.route('/monthly-plan/:year')
    .get(protect, getMonthlyPlan)

router.route('/')
    .get(protect, formattedQuery, getAllTours)
    .post(createTour)

router.route('/:id')
    .get(getTour)
    .delete(deleteTour)
    .patch(updateTour)

module.exports = router

