import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema()
export class Service {
  @Prop()
  name: String;
  @Prop()
  type: String;
  @Prop()
  price: Number;
  @Prop()
  hotelId: String;
  @Prop()
  ServiceId: String;
}
export const ServiceSchema = SchemaFactory.createForClass(Service);
