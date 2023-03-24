const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name:{
        type: String,
    },
    hotelId:{
        type: String,
    }
})

module.exports = mongoose.model('categorys',CategorySchema)