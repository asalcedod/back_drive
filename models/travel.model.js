const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Travel = new Schema(
    {
        passenger: {type: mongoose.Schema.Types.ObjectId, ref: 'Passenger'},
        driver: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'},
        price: { type: String, default: "" },
        paymethod: { type: String },
        init_position: {
            lat: {type: String},
            lng: {type: String},
        },
        end_position: {
            lat: {type: String},
            lng: {type: String},
        },
        status_travel: { type: Number, required: true, default: 1 },
        status: { type: Number, required: true, default: 1 },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Travel', Travel)