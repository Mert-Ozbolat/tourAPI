const { Schema, model } = require('mongoose')

const reviewShema = new Schema(
    {
        review: {
            type: String,
            required: [true, 'Yorum içeriği boş olamaz']
        },

        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, 'Puan değeri tanimlanmali']
        },

        tour: {
            type: Schema.ObjectId,
            ref: 'Tour',
            required: [true, 'Yorum hangi tour için atildiği belirlenmeli']
        },

        user: {
            type: Schema.ObjectId,
            ref: 'User',
            required: [true, 'Yorum hangi kullanici attiği belirlenir']
        },
    },
    {
        timestamps: true
    }
)

// Yorumlar Tablosunda Kullanıcıların bilgilerini getirir
reviewShema.pre(/^find/, function (next) {
    this.populate({ path: 'user', select: 'name photo' })
    next()
})


const Review = model('Review', reviewShema)
model.exports = Review
