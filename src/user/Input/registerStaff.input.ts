import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class RegisterStaffInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  hotelId: string;
  @Field()
  name: string;
  @Field()
  role: string;
}
