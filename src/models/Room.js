const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    name:{
        type: String,
    },
    floor:{
        type: String,
    },
    categoryId:{
        type: String,
    },
    hotelId:{
        type: String
    },
    status:{
        type : Boolean
    },
    checkInDate:{
        type:  String
    },
    totalNight: {
        type : Number
    },
    price:{
        type:  Number
    },
    bookingId:{
        type : String
    },
    isClean:{
        type: Boolean
    },
    isPayment:{
        type: Boolean
    },
    deposit:{
        type:Number
    }
})

module.exports = mongoose.model('rooms',RoomSchema)