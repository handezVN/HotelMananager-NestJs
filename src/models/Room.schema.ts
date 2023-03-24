import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop()
  name: String;
  @Prop()
  floor: String;
  @Prop()
  categoryId: String;
  @Prop()
  hotelId: String;
  @Prop()
  status: Boolean;
  @Prop()
  checkInDate: String;
  @Prop()
  totalNight: Number;
  @Prop()
  price: Number;
  @Prop()
  bookingId: String;
  @Prop()
  isClean: Boolean;
  @Prop()
  isPayment: Boolean;
  @Prop()
  deposit: Number;
}
export const RoomSchema = SchemaFactory.createForClass(Room);
