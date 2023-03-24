import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvKeyName } from 'src/common/enums/env';
import { Employee, EmployeeSchema } from 'src/models/Employee.schema';
import { User, UserSchema } from 'src/models/User.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const mongodb = [
  MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
    },
    {
      name: Employee.name,
      schema: EmployeeSchema,
    },
  ]),
];
@Module({
  imports: [...mongodb],
  providers: [UserService, UserResolver],
})
export class UserModule {}
