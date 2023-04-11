import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from 'src/models/Boooking.schema';
import { Room, RoomSchema } from 'src/models/Room.schema';
const mongodb = [
  MongooseModule.forFeature([
    {
      name: Booking.name,
      schema: BookingSchema,
    },
    {
      name: Room.name,
      schema: RoomSchema,
    },
  ]),
];
@Module({
  imports: [...mongodb],
  providers: [BookingService, BookingResolver],
})
export class BookingModule {}
