const { Schema, model } = require('mongoose')
const Tour = require('./tourModel')


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



// bir tur için turun rating ortalamasını hesaplayan bir fonksiyon yazalım
reviewSchema.statics.calcAverage = async function (tourId) {
    // aggreage ile istatistik hesapla
    const stats = await this.aggregate([
        [
            // 1) parametre olarak gelen turun id'si ile eşleşen yorumları al
            { $match: { tour: tourId } },
            // 2) toplam yorum sayısı ve yorumların ortalama değerini hesapla
            {
                $group: {
                    _id: "$tour",
                    nRating: { $sum: 1 }, // toplam yorum sayısı
                    avgRating: { $avg: "$rating" }, // rating ortalaması
                },
            },
        ],
    ]);

    // eğer tura atılan yorum varsa hesaplanan istatistikleri tur belgesine kayder
    if (stats.length > 0) {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsAverage: stats[0].avgRating,
            ratingsQuantity: stats[0].nRating,
        });
    } else {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsAverage: 4,
            ratingsQuantity: 0,
        });
    }
};


reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.post('save', function () {
    Review.calcAverage(thşs.tour)
})

reviewSchema.post(/^findOneAnd/, function (document) {
    Review.calcAverage(document.tour)
})

const Review = model('Review', reviewShema)
model.exports = Review
