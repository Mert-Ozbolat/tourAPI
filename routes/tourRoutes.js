const express = require('express')
const { getAllTours, createTour, getTour, updateTour, deleteTour, aliasTopTours, getTourStats } = require('../controllers/tourController.js')
const formattedQuery = require('../middleware/formatQuery.js')

const router = express.Router()


router.route('/top-tours')
    .get(aliasTopTours, getAllTours)

router.route('/tour-stats')
    .get(getTourStats)

router.route('/')
    .get(formattedQuery, getAllTours)
    .post(createTour)

router.route('/:id')
    .get(getTour)
    .delete(deleteTour)
    .patch(updateTour)

module.exports = router

