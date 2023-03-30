import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvKeyName, EXPIRES_TIME, JWT_SECRET_KEY } from './common/enums/env';
import { Booking, BookingSchema } from './models/Boooking.schema';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { UserModule } from './user/user.module';
import { User, UserSchema } from './models/User.schema';
import { HotelModule } from './hotel/hotel.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
const mongodb = [
  MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const config: MongooseModuleFactoryOptions = {
        uri: configService.get<string>(EnvKeyName.MONGODB),
      };

      return config;
    },
  }),
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

const Config = [
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(3000),
    }),
  }),
];

@Module({
  imports: [...mongodb, ...graphql, UserModule, HotelModule, ...Config],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
