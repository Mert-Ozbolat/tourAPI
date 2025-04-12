const express = require('express')

const router = express.Router()

router.route('/')
    .get((req, res) => { })
    .post((req, res) => { })

router.route('/:id')
    .get((req, res) => { })
    .delete((req, res) => { })
    .patch((req, res) => { })

module.exports = router

