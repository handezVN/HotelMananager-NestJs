import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './models/Boooking.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Booking.name)
    private readonly BookingModel: Model<BookingDocument>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async getBooking() {
    return this.BookingModel.find();
  }
}
