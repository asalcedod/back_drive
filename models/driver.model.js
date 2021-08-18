const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Driver = new Schema(
    {
        identification: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        vehicle: { type: String, required: true },
        plaque: { type: String, required: true },
        password: { type: String, required: true },
        position: {
            lat: {type: String},
            lng: {type: String},
        },
        status: { type: Number, required: true, default: 1 },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Driver', Driver)