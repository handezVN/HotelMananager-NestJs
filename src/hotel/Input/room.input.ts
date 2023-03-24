import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class RoomInput {
  @Field()
  name: String;
  @Field()
  hotelId: String;
  @Field()
  floor: String;
  @Field()
  categoryId: String;
}
