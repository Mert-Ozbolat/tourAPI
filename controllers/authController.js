const User = require("../models/userModel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { json } = require("express");
const e = require("../utils/error");


const signToken = (user_id) => {
    return jwt.sign(
        { id: user_id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXP }
    )
}

const createSendToken = (user, code, res) => {
    const token = signToken(user._id)
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // secure: true
    })
    user.password = undefined
    res.status(code).json({ message: 'oturum açildi', token, user })
}

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });

        createSendToken(newUser, 201, res)

    } catch (error) {
        next(e(500, error.message))
    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            next(e(400, 'Lütfen mail ve şifrenizi giriniz'))
        }

        const user = await User.findOne({ email })

        if (!user) {
            next(e(404, 'Girdiğiniz maile kayitli kullanici yok'))
        }

        const isValid = await user.correctPass(password, user.password)

        if (!isValid) {
            next(e(403, 'Girdiğiniz şifre geçersiz'))
        }
        createSendToken(user, 200, res)

    } catch (error) {
        next(e(500, error.message))
    }
}


exports.logout = (req, res) => {
    res.clearCookie('jwt').status(200).json({ message: 'Oturumunuz Kapatildi!' })
}



//* ------------Authorization MW------------

exports.protect = async (req, res, next) => {
    let token = req.cookies.jwt || req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
        token = token.split(" ")[1];
    }

    if (!token) {
        return next(e(403, "Bu işlem için yetkiniz yok (jwt gönderilmedi)"));
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        if (error.message === "jwt expired") {
            return next(e(403, "Oturumunuz süresi doldu (tekrar giriş yapın)"));
        }

        return next(e(403, "Gönderilen token geçersiz"));
    }

    let activeUser;

    try {
        activeUser = await User.findById(decoded.id);
    } catch (error) {
        return next(e(403, "Gönderilen token geçersiz"));
    }

    if (!activeUser) {
        return next(e(403, "Kullanıcının hesabına erişilemiyor (tekrar kaydolun)"));
    }

    if (!activeUser?.active) {
        return next(e(403, "Kullanıcının hesabı dondurulmuş"));
    }

    if (activeUser?.passChangedAt && decoded.iat) {
        const passChangedSeconds = parseInt(activeUser.passChangedAt.getTime() / 1000);

        if (passChangedSeconds > decoded.iat) {
            return next(
                e(403, "Yakın zamanda şifrenizi değiştirdiriniz. Lütfen tekrar giriş yapın")
            );
        }
    }
    req.user = activeUser;

    next();
};


exports.restrictTo = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        next(e(403, 'Bu işlem için yetkiniz yok (rolünüz yetersiz)'))
    }
    next()
}


//* Şifer Sıfırlama 
exports.forgotPassword = async (req, res, next) => { }

exports.resetPassword = async (req, res, next) => { }