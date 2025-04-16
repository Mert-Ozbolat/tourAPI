const express = require('express')
const tourRouter = require('./routes/tourRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const reviewRouter = require('./routes/reviewRoutes.js')
const cookieParser = require('cookie-parser')
const error = require('./utils/error.js')


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/tours', tourRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)


app.all('*', (req, res, next) => {
    const err = error(404, 'istek attiğiniz yol mevcut değil')
    next(err)
})

app.use((err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail'
    err.message = err.message || 'Üzgünüz bir hata meydana geldi'

    res.status(err.statusCode).json(
        {
            states: err.status,
            message: err.message
        })
})

module.exports = app
