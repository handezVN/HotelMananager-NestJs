import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { EnvKeyName, EXPIRES_TIME, JWT_SECRET_KEY } from 'src/common/enums/env';
import { JsonWebTokenStrategy } from 'src/common/strategies/jwt-strategy';
import { LocalStrategy } from 'src/common/strategies/local.strategy';
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

const Guard = [
  PassportModule,
  JwtModule.register({
    secret: JWT_SECRET_KEY,
    signOptions: { expiresIn: EXPIRES_TIME },
  }),
];
@Module({
  imports: [...mongodb, ...Guard],
  providers: [UserService, UserResolver, LocalStrategy, JsonWebTokenStrategy],
})
export class UserModule {}
