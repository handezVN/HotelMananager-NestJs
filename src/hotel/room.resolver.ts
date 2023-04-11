import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BookingService } from 'src/booking/booking.service';
import { Booking } from 'src/models/Boooking.schema';
import { Room } from 'src/models/Room.schema';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private bookingService: BookingService) {}

  @ResolveField(() => Booking)
  async booking(@Parent() room: Room) {
    return await this.bookingService.getBooking(room.bookingId);
  }
}
