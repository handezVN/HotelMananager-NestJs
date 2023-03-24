import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  email: String;
  @Field()
  password: String;
  @Field()
  role: String;
  @Field()
  name: String;
}
