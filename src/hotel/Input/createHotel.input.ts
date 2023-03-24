import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateHotelInput {
  @Field()
  userId: string;
  @Field()
  @MinLength(3)
  name: string;
  @Field()
  address: string;
}
