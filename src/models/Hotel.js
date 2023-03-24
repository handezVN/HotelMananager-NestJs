const mongoose = require('mongoose');
const Schema = mongoose.Schema

const HotelSchema = new Schema({
    name:{
        type: String,
    },
    userId:{
        type: String,
    },
    address:{
        type:String,
    }
})

module.exports = mongoose.model('hotels',HotelSchema)