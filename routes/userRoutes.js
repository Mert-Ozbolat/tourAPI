const express = require('express')
const { signup, login, logout, forgotPassword, resetPassword, protect } = require('../controllers/authController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:token', resetPassword)
router.patch("/update-password", protect, updatePassword);

module.exports = router

