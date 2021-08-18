const mongoose = require('mongoose')
require("dotenv").config();

mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, seUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db