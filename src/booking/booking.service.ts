import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from 'src/models/Boooking.schema';
import { BookingDocument } from 'src/models/Boooking.schema';
import { Room, RoomDocument } from 'src/models/Room.schema';
const moment = require('moment');
@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private readonly BookingModel: Model<BookingDocument>,
    @InjectModel(Room.name)
    private readonly RoomModel: Model<RoomDocument>,
  ) {}

  checkInRoom = async (args) => {
    var current_date = moment().format('DD/MM/YYYY , hh:mm A');
    const AllRoomOfHotel = await this.RoomModel.find({ hotelId: args.hotelId });
    const filterRoom = AllRoomOfHotel.filter((room) => {
      console.log(room._id.toString());
      return args.input.roomId.includes(room._id.toString());
    });
    let msg = '';
    let flag = false;
    let listRoom = [];
    var bookingid = '';
    console.log(args);
    await filterRoom.forEach((room) => {
      listRoom.push(room.name);
      if (room.status) {
        flag = true;
        msg = msg + `${room.name} is occupied . `;
      }
    });
    if (filterRoom.length === 0) {
      return {
        status: 401,
        msg: 'Phòng này không có trong khách sạn này !',
      };
    }
    if (flag) {
      return {
        status: 401,
        msg: msg,
      };
    } else {
      const newbooking = new this.BookingModel({
        CheckInDate: current_date,
        hotelId: args.hotelId,
        RoomName: listRoom.toString(),
        RoomId: args.input.roomId.toString(),
        RoomPrice: args.price,
      });
      const booking = await newbooking.save();
      bookingid = `${booking._id}`;
      filterRoom.forEach(async (room) => {
        await this.RoomModel.findByIdAndUpdate(room._id, {
          $set: {
            checkInDate: current_date,
            status: true,
            price: args.price,
            totalNight: args.totalNight,
            bookingId: booking._id,
            isPayment: args.isPayment,
            deposit: args.deposit,
          },
        });
      });
    }
    return {
      status: 200,
      msg: 'CheckIn SuccessFully !',
      hotelId: args.hotelId,
      rooms: [bookingid],
    };
  };
  checkOutRoom = async (args) => {
    var current_date = moment().format('DD/MM/YYYY , hh:mm A');
    const ListRoom = await this.RoomModel.find({ bookingId: args.bookingId });
    const data = [];
    if (ListRoom.length > 0) {
      const booking = await this.BookingModel.findById(args.bookingId);
      await booking.updateOne({
        $set: {
          CheckOutDate: current_date,
          checkOutAt: new Date(),
        },
      });
      ListRoom.forEach(async (room) => {
        data.push(room._id.toString());
        await this.RoomModel.findByIdAndUpdate(room._id, {
          $set: {
            checkInDate: null,
            status: false,
            bookingId: null,
            price: null,
            totalNight: null,
            isClean: false,
            isPayment: null,
            desposit: 0,
          },
        });
      });

      return {
        status: 200,
        msg: 'CheckOut SuccessFully !',
        rooms: data,
        hotelId: ListRoom[0].hotelId,
      };
    }
    return {
      status: 401,
      msg: 'CheckOut Failed ! Room is available .',
    };
  };
  addCustomer = async (args) => {
    const booking = await this.BookingModel.findById(args.bookingId);
    const customerList = args.ListCustomer.ListCustomer;
    await booking.updateOne({
      $set: {
        CustomerList: customerList,
      },
    });

    return {
      msg: 'Update Customer SuccessFully !',
      hotelId: booking.hotelId,
    };
  };
  editExtraItem = async (args) => {
    const booking = await this.BookingModel.findById(args.bookingId);
    const ListExtraItem = args.ListExtraItem.ListExtraItem;
    let totalExtraItem = 0;
    ListExtraItem.forEach((item) => {
      totalExtraItem = totalExtraItem + item.price * item.quantity;
    });

    await booking.updateOne({
      $set: {
        ExtraFee: totalExtraItem,
        ExtraReaSon: ListExtraItem,
      },
    });
    return {
      msg: 'Update ExtraItem SuccessFully !',
      hotelId: booking.hotelId,
    };
  };
}