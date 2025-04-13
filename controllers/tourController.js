const Tour = require("../models/tourModel.js")


exports.getAllTours = async (req, res) => {
    try {
        const toursQuery = await Tour.find(req.formattedQuery)

        if (req.query.sort) {
            toursQuery.sort(req.query.sort.split, (',').join(' '))
        } else {
            toursQuery.sort('-createdAt')
        }

        if (req.query.fields) {
            toursQuery.select(req.query.fields.replaceAll(",", " "))
        }

        const tours = await toursQuery
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