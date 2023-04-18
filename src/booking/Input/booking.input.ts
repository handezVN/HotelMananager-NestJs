import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class BookingInput {
  @Field()
  hotelId: String;
  @Field()
  price: Number;

  @Field()
  input: {
    roomId: [String];
  };
  @Field()
  totalNight: Number;

  @Field()
  isPayment: Boolean;
  @Field()
  deposit: Number;
}
@InputType()
export class RoomIdInput {
  @Field()
  roomId: String;
}
@InputType()
export class BookingFromTo {
  @Field()
  from: string;
  @Field()
  to: string;
  @Field()
  hotelId: string;
}
@InputType()
export class BookingIdInput {
  @Field()
  bookingId: String;
  @Field()
  ListCustomer: [Customer];
}

@InputType()
export class AddCustomer {
  @Field()
  bookingId: String;
}

@InputType()
export class Customer {
  @Field()
  name: String;
  @Field()
  address: String;
  @Field()
  gen: String;
  @Field()
  birthday: String;
  @Field()
  number: String;
}

@InputType()
export class EditExtraItem {
  @Field()
  bookingId: String;
  @Field()
  ListCustomer: [Customer];
}

@InputType()
export class ExtraItem {
  @Field()
  roomId: String;
  @Field()
  serviceId: String;
  @Field()
  name: String;
  @Field()
  quantity: Number;
  @Field()
  price: Number;
}
