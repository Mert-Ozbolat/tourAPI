const Tour = require("../models/tourModel.js")
const APIFeatures = require("../utils/apiFeatures.js")





exports.getAllTours = async (req, res) => {
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
        res.staus(404).json({ text: "getAllTours Başarisiz!!!" })
    }
}

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body)
        res.json({ text: 'createTour başarili', tour: newTour })
    } catch (error) {
        res.staus(404).json({ text: "createTour Başarisiz!!!", error: error.message })
    }
}

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id)
        res.json({ text: 'getTour basarili', tour })
    } catch (error) {
        res.status(400).json({ text: 'getTour basarisiz' })
    }
}

exports.deleteTour = async (req, res) => {
    try {
        await Tour.deleteOne({ _id: req.params.id })
        res.status(204).json({})
    } catch (error) {
        res.status(400).json({ text: 'deleteTour basarisiz' })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body)
        res.json({ text: 'updateTour basarili', tour })
    } catch (error) {
        res.status(400).json({ text: 'update basarisiz' })
    }
}

exports.aliasTopTours = async (req, res, next) => {
    req.query.sort = "-ratingsAverage, -ratingsQuantity"
    req.query['price[lte]'] = "1200"
    req.query.limit = 5
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'

    next()
}

exports.getTourStats = async (req, res) => {
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
        return res.status(500).json({ message: "rapor olusturulamadi" });
    }
};