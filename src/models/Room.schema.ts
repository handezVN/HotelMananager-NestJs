import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  floor: string;

  @Prop({ required: true })
  categoryId: string;

  @Prop({ required: true })
  hotelId: string;

  @Prop({ required: true, default: true })
  status: boolean;

  @Prop({ required: false })
  checkInDate: string;

  @Prop({ required: false })
  totalNight: number;

  @Prop({ required: false })
  price: number;

  @Prop({ required: false })
  bookingId: string;

  @Prop({ required: false, default: false })
  isClean: boolean;

  @Prop({ required: false, default: false })
  isPayment: boolean;

  @Prop({ required: false })
  deposit: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
