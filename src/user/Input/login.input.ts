import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  passwords: string;
}
