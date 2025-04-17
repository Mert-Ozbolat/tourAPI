const Tour = require("../models/tourModel.js")
const APIFeatures = require("../utils/apiFeatures.js")
const e = require("../utils/error.js")





exports.getAllTours = async (req, res, next) => {
    try {
        const features = new APIFeatures(
            Tour.find(),
            req.query,
            req.formattedQuery
        )
            .filter()
            .limit()
            .sort()
            .pagination()


        const tours = await features.query

        res.json({ message: 'getAllTours başarili', results: tours.length, tours })
    } catch (error) {
        next(e(500, error.message))
    }
}

exports.createTour = async (req, res, next) => {
    try {
        const newTour = await Tour.create(req.body)
        res.json({ text: 'createTour başarili', tour: newTour })
    } catch (error) {
        res.staus(404).json({ text: "createTour Başarisiz!!!", error: error.message })
        next(e(404, error.message))
    }
}

exports.getTour = async (req, res, next) => {
    try {
        const tour = await Tour.findById(req.params.id)
        res.json({ text: 'getTour basarili', tour })
    } catch (error) {
        next(e(400, error.message))
    }
}

exports.deleteTour = async (req, res, next) => {
    try {
        await Tour.deleteOne({ _id: req.params.id })
        res.status(204).json({})
    } catch (error) {
        next(e(400, error.message))
    }
}

exports.updateTour = async (req, res, next) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body)
        res.json({ text: 'updateTour basarili', tour })
    } catch (error) {
        next(e(400, error.message))
    }
}

exports.aliasTopTours = async (req, res, next) => {
    req.query.sort = "-ratingsAverage, -ratingsQuantity"
    req.query['price[lte]'] = "1200"
    req.query.limit = 5
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'

    next()
}

exports.getTourStats = async (req, res, next) => {
    try {
        const stats = await Tour.aggregate([
            { $match: { ratingsAverage: { $gte: 4.0 } }, },
            {
                $group: {
                    _id: "$difficulty",
                    avgRating: { $avg: "$ratingsAverage" },
                    avgPrice: { $avg: "$price" },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                }
            },
            { $sort: { avgPrice: 1 } },
            { $match: { avgPrice: { $gte: 500 } }, },
        ]);
        return res.status(200).json({ message: "rapor olusturuldu", stats });
    } catch (err) {
        next(e(500, error.message))
    }
};

exports.getMonthlyPlan = async (req, res, next) => {
    const year = Number(req.params.year)
    try {
        const stats = await Tour.aggregate([
            {
                $unwind: {
                    path: "$startDates"
                }
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $month: "$startDates"
                    },
                    count: {
                        $sum: 1
                    },
                    tours: {
                        $push: "$name"
                    }
                }
            },
            {
                $addFields: {
                    mouth: "$_id"
                }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: {
                    month: 1
                }
            }
        ]);

        if (stats.length === 0) {
            return res.status(404).json({
                message: `${year} yilina ait bir rapor bulunamadi`
            })
        }

        res.status(200).json({
            message: `${year} yili için aylık plan oluşturuldu`,
            stats
        })

    } catch (error) {
        res.status(500).json({
            message: `${year} yili için planlar oluşturulamadi`,
            error: error.message
        })
    }
}