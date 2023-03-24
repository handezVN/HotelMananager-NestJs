import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CategoryInput {
  @Field()
  name: String;
  @Field()
  hotelId: String;
}
