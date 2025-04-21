const e = require("../utils/error");
const c = require("../utils/catchAsync");
const filterObject = require("../utils/filterObject");
const error = require("../utils/error");


exports.updateMe = c(async (req, res, next) => {

    if (req.body.password || req.body.passwordConfirm) return next(error(400, "Şifre güncellenemez"))

    const filtredBody = filterObject(req.body, ["name", "email", "photo"])

    const updated = await User.findByIdAndUpdate(req.user.id, filtredBody, { new: true })

    res.status(200).json({ message: 'işlem başarili', updated })
})

exports.deleteMe = c(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })
    res.status(200).json({ message: 'Hesabiniz Donddurulmuş' })
})

exports.getAllUsers = c(async (req, res, next) => {
    res.status(200).json('işlem başarili')
})

exports.createUser = c(async (req, res, next) => {
    res.status(200).json('işlem başarili')
})

exports.getUser = c(async (req, res, next) => {
    res.status(200).json('işlem başarili')
})

exports.updateUser = c(async (req, res, next) => {
    res.status(200).json('işlem başarili')
})

exports.deleteUser = c(async (req, res, next) => {
    res.status(200).json('işlem başarili')
})