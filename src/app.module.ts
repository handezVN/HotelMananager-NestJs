import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvKeyName } from './common/enums/env';
import { Booking, BookingSchema } from './models/Boooking.schema';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserSchema } from './models/User.schema';
import { HotelModule } from './hotel/hotel.module';
const mongodb = [
  MongooseModule.forRoot(EnvKeyName.MONGODB),
  MongooseModule.forFeature([
    {
      name: Booking.name,
      schema: BookingSchema,
    },
    {
      name: User.name,
      schema: UserSchema,
    },
  ]),
];

const graphql = [
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    typePaths: ['./**/*.graphql'],
    transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
    installSubscriptionHandlers: true,
  }),
];

@Module({
  imports: [...mongodb, ...graphql, UserModule, HotelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
