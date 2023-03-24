import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class EditStaffInput {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  role: string;
}
