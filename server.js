const mongoose = require('mongoose')
const app = require('./app.js');
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Veri Tabanına Bağlandı⚽'))
    .catch(() => console.log('Veri Tabanına Bağlanamadı🎇'))


const port = process.env.PORT

app.listen(port, () => console.log(`${port} port dinlemede🌴`))

