const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userId: String,
    hotelId:String,
    role: String,
    name:String,
    isDeleted: { type: Boolean, defaults: false }
})
UserSchema.pre('find', function() {
    this.where({ isDeleted: false });
  });
  
  UserSchema.pre('findOne', function() {
    this.where({ isDeleted: false });
  });
module.exports = mongoose.model('employee',UserSchema)