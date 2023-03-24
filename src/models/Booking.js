const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    RoomName: {
        type: String,
    },
    RoomId: {
        type: String,
    },
    RoomPrice: {
        type: Number,
    },
    hotelId: {
        type: String,
    },
    CheckInDate: {
        type: String,
    },
    CheckOutDate: {
        type: String,
    },
    ExtraFee: {
        type: Number,
    },
    ExtraReaSon: {
        type: [
            {
                name: String,
                price: Number,
                quantity: Number,
                roomId: String,
                serviceId: String,
            },
        ],
    },
    CustomerList: {
        type: [
            {
                name: String,
                address: String,
                gen: String,
                birthday: String,
                number: String,
            },
        ],
    },
    checkInAt: {
        type: Date,
        default: Date.now,
    },
    checkOutAt: {
        type: Date,
    },
});
BookingSchema.pre("save", function (next) {
    if (!this.checkInAt) {
        this.checkInAt = new Date();
    }
    next();
});
module.exports = mongoose.model("bookings", BookingSchema);
