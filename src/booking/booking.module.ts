import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from 'src/models/Boooking.schema';
import { Room, RoomSchema } from 'src/models/Room.schema';
import { PubSub } from 'graphql-subscriptions';
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
const graphqlSubscriptionHandlers = [
  {
    provide: 'PUB_SUB',
    useValue: new PubSub(),
  },
];
@Module({
  imports: [...mongodb],
  providers: [BookingService, BookingResolver, ...graphqlSubscriptionHandlers],
})
export class BookingModule {}
