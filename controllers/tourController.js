const mongoose = require("mongoose")
const Tour = require("../models/tourModel.js")


exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find()
        res.json({ message: 'getAllTours başarili', tours })
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