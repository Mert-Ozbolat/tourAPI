const { Schema, default: mongoose } = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    name: {
        type: String,
        require: [true, "Kullanici isim degerini sahip olmali"],
        minLenght: [3, "Kullanici ismi en az3 karakter olmali"],
        maxLenght: [20, "Kullanici ismi en fazla 20 karakter olmali"]
    },

    email: {
        type: String,
        require: [true, "Kullanici isim degerini sahip olmali"],
        unique: [true, "Bu eposta adresine kayitli kullanici zaten var"],
        validate: [validator.isEmail, 'Lütfen geçerli bir mail giriniz']
    },

    photo: {
        type: String,
        default: "defaultpic.webp"
    },

    password: {
        type: String,
        required: [true, "Kullanıcı şifreye sahip olmalıdır"],
        minLength: [8, "Şifre en az 8 karakter olmalı"],
        validate: [validator.isStrongPassword, "Şifreniz yeterince güçlü değil"],
    },

    passwordConfirm: {
        type: String,
        required: [true, "Lütfen şifrenizi onaylayın"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Onay şifreniz eşleşmiyor",
        },
    },

    role: {
        type: String,
        enum: ["user", "guide", "lead-guide", "admin"],
        default: "user"
    },

    active: {
        type: Boolean,
        default: true
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User