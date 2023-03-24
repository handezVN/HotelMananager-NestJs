import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HotelDocument = HydratedDocument<Hotel>;

@Schema()
export class Hotel {
  @Prop()
  name: String;
  @Prop()
  type: String;
  @Prop()
  userId: String;
  @Prop()
  address: String;
}
export const HotelSchema = SchemaFactory.createForClass(Hotel);
