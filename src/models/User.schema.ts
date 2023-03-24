import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: String;
  @Prop()
  password: String;
  @Prop()
  role: String;
  @Prop()
  name: String;
}
export const UserSchema = SchemaFactory.createForClass(User);
