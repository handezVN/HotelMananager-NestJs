import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { RoomStatusPayload } from './booking.resolver';
import { PubSubEngine } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver()
export class RoomStatusResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}
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
