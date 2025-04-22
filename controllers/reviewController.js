const c = require('../utils/catchAsync')
const Review = require('../models/reviewModel')

exports.getAllReviews = c(async (req, res, next) => {
    const reviews = await Review.find({})
    res.status(200).json({
        status: 'success',
        data: reviews
    })
})

exports.createReview = c(async (req, res, next) => {
    const newReview = await Review.create(req.body)
    res.status(200).json({
        status: 'success',
        data: newReview
    })
})

exports.getReview = c(async (req, res, next) => { })

exports.updateReview = c(async (req, res, next) => { })

exports.deleteReview = c(async (req, res, next) => { })