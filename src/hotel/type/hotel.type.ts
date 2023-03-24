import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HotelType {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  address: string;
}
