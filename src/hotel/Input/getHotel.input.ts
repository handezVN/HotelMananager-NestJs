import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class GetHotelInput {
  @Field()
  userId: string;
  hotelId: string;
}
