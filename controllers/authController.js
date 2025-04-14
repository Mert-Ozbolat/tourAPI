const User = require("../models/userModel")

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });
        res.status(201).json({
            message: "Kayit Olundu",
            user: newUser
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