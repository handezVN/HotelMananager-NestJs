import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import {
  AddCustomer,
  BookingIdInput,
  BookingInput,
  EditExtraItem,
} from './Input/booking.input';

@Resolver()
@UseGuards(AuthenticationGuard)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Mutation()
  async checkInRoom(@Args() args: BookingInput) {
    const result = await this.bookingService.checkInRoom(args);
    if (result.status === 200) {
      const data = {
        isCheckIn: true,
        isCheckOut: false,
        isClean: false,
        roomId: args.input,
        hotelId: result.hotelId,
      };
      console.log(data);
      // pubsub.publish("CHECKINROOM", { RoomStatus: data });
    }

    return result;
  }
  @Mutation()
  async checkOutRoom(@Args() args: BookingIdInput) {
    const result = await this.bookingService.checkOutRoom(args);
    if (result.status === 200) {
      const data = {
        isCheckIn: false,
        isCheckOut: true,
        isClean: false,
        roomId: result.rooms,
        hotelId: result.hotelId,
      };
      console.log(data);
      // pubsub.publish("CHECKOUTROOM", { RoomStatus: data });
    }
    return result;
  }
  @Mutation()
  async addCustomer(@Args() args: AddCustomer) {
    const result = await this.bookingService.addCustomer(args);
    const data = {
      isCheckIn: false,
      isCheckOut: false,
      isClean: false,
      roomId: null,
      hotelId: result.hotelId,
    };
    // pubsub.publish("CUSTOMER", { RoomStatus: data });
    return result.msg;
  }

  @Mutation()
  async editExtraItem(@Args() args: EditExtraItem) {
    const result = await this.bookingService.editExtraItem(args);
    const data = {
      isCheckIn: false,
      isCheckOut: false,
      isClean: false,
      roomId: null,
      hotelId: result.hotelId,
    };
    // pubsub.publish("EXTRAITEM", { RoomStatus: data });
    return result.msg;
  }
}
