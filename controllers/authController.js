const User = require("../models/userModel")
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });

        const token = jwt.sign(
            { id: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.status(201).json({
            message: "Kayit Olundu",
            user: newUser,
            token,
        })
    } catch (error) {
        res.status(500).json({
            message: "Üzgünüz bir hata oluştu",
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        res.status(200).json({
            message: "Giriş yapildi"
        })

    } catch (error) {
        res.status(500).json({
            message: "Üzgünüz bir hata oluştu"
        })
    }
}


exports.logout = async (req, res) => {
    try {
        res.status(200).json({
            message: "Çikiş yapildi"
        })

    } catch (error) {
        res.status(500).json({
            message: "Üzgünüz bir hata oluştu"
        })
    }
}