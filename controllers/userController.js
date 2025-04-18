const e = require("../utils/error");
const c = require("../utils/catchAsync");


exports.updateMe = c(async (req, res, next) => {
    res.status(200).json('işlem başarili')
})

exports.deleteMe = c(async (req, res, next) => {
    res.status(200).json('işlem başarili')
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