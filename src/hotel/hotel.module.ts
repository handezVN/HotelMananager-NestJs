import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EXPIRES_TIME, EnvKeyName, JWT_SECRET_KEY } from 'src/common/enums/env';
import { Employee, EmployeeSchema } from 'src/models/Employee.schema';
import { Hotel, HotelSchema } from 'src/models/Hotel.schema';
import { User, UserSchema } from 'src/models/User.schema';
import { Room, RoomSchema } from 'src/models/Room.schema';
import { HotelAdminResolver } from './hotel.resolver';
import { HotelService } from './hotel.service';
import { Category, CategorySchema } from 'src/models/Category.schema';
import { Service, ServiceSchema } from 'src/models/Services.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Booking, BookingSchema } from 'src/models/Boooking.schema';
import { BookingService } from 'src/booking/booking.service';
import { RoomResolver } from './room.resolver';
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
    {
      name: Hotel.name,
      schema: HotelSchema,
    },
    {
      name: Room.name,
      schema: RoomSchema,
    },
    {
      name: Category.name,
      schema: CategorySchema,
    },
    {
      name: Service.name,
      schema: ServiceSchema,
    },
    {
      name: Booking.name,
      schema: BookingSchema,
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
  providers: [HotelAdminResolver, HotelService, BookingService, RoomResolver],
})
export class HotelModule {}
