const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
    type:{
        type: String,
    },
    name:{
        type: String,
    },
    price:{
        type: Number,
    },
    hotelId:{
        type:String,
    }
})

module.exports = mongoose.model('service',ServiceSchema)