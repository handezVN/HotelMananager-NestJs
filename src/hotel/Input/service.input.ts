import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class ServiceInput {
  @Field()
  name: String;
  @Field()
  hotelId: String;
  @Field()
  price: Number;
  @Field()
  type: String;
}
