import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Parent,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import {
  AddCustomer,
  BookingIdInput,
  BookingInput,
  EditExtraItem,
  RoomIdInput,
} from './Input/booking.input';
import { PubSubEngine, withFilter } from 'graphql-subscriptions';
import { Room } from 'src/models/Room.schema';
@ObjectType()
export class RoomStatusPayload {
  @Field(() => Boolean)
  isCheckIn: boolean;

  @Field(() => Boolean)
  isCheckOut: boolean;

  @Field(() => Boolean)
  isClean: boolean;

  @Field(() => [String])
  roomId: string[];
}
// @UseGuards(AuthenticationGuard)
@Resolver()
export class BookingResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private readonly bookingService: BookingService,
  ) {}

  @Mutation()
  async checkInRoom(@Args() args: BookingInput) {
    const result = await this.bookingService.checkInRoom(args);
    if (result.status === 200) {
      const data = {
        isCheckIn: true,
        isCheckOut: false,
        isClean: false,
        roomId: args.input.roomId,
        hotelId: result.hotelId,
      };
      console.log(data);
      this.pubSub.publish('CHECKINROOM', { RoomStatus: data });
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
      this.pubSub.publish('CHECKOUTROOM', { RoomStatus: data });
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
    this.pubSub.publish('CUSTOMER', { RoomStatus: data });
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
    this.pubSub.publish('EXTRAITEM', { RoomStatus: data });
    return result.msg;
  }
  @Mutation()
  async cleanRoom(@Args() args: RoomIdInput) {
    const result = await this.bookingService.cleanRoom(args);
    const data = {
      isCheckIn: false,
      isCheckOut: false,
      isClean: true,
      roomId: [result.roomId],
      hotelId: result.hotelId,
    };
    this.pubSub.publish('CLEANROOM', { RoomStatus: data });
    return result.msg;
  }

  @Subscription(() => RoomStatusPayload, {
    filter: (payload, variables) =>
      payload.RoomStatus.hotelId === variables.hotelId,
  })
  async RoomStatus(@Args('hotelId') hotelId: string) {
    return this.pubSub.asyncIterator([
      'CHECKINROOM',
      'CHECKOUTROOM',
      'CLEANROOM',
      'CREATEROOM',
      'EDITROOM',
      'EXTRAITEM',
      'CUSTOMER',
    ]);
  }
}
