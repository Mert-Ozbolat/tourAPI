const express = require('express')
const { signup, login, logout, forgotPassword, resetPassword, protect, restrictTo } = require('../controllers/authController')
const { updateMe, deleteMe, getAllUsers, createUser, getUser, updateUser, deleteUser, uploadUserPhoto } = require('../controllers/userController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:token', resetPassword)
router.patch("/update-password", protect, updatePassword);


router.use(protect);

router.patch(
    "/update-me",
    uploadUserPhoto, // RAM'de saklar
    resize, // Yeniden boyutlandırıp diske kaydeder
    updateMe // Veritbanındaki kullanıcı photo bilgisini günceller
);

router.delete("/delete-me", deleteMe);
router.use(restrictTo("admin"));
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router

