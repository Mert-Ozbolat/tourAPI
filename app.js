const express = require('express')
const tourRouter = require('./routes/tourRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const reviewRouter = require('./routes/reviewRoutes.js')


const app = express()

app.use(express.json())

app.use('/api/tours', tourRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)


module.exports = app
