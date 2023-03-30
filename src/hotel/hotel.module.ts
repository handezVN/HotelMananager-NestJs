import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvKeyName } from 'src/common/enums/env';
import { Employee, EmployeeSchema } from 'src/models/Employee.schema';
import { Hotel, HotelSchema } from 'src/models/Hotel.schema';
import { User, UserSchema } from 'src/models/User.schema';
import { Room, RoomSchema } from 'src/models/Room.schema';
import { HotelAdminResolver } from './hotel.resolver';
import { HotelService } from './hotel.service';
import { Category, CategorySchema } from 'src/models/Category.schema';
import { Service, ServiceSchema } from 'src/models/Services.schema';
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
  ]),
];
@Module({
  imports: [...mongodb],
  providers: [HotelAdminResolver, HotelService],
})
export class HotelModule {}
