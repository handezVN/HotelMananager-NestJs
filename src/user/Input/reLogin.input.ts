import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class ReLoginInput {
  @Field()
  token: string;
}
