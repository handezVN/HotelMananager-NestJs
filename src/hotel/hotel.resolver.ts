import { UseGuards } from '@nestjs/common';
import { Args, Field, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { HotelService } from './hotel.service';
import { CategoryInput } from './Input/category.input';
import { CreateHotelInput } from './Input/createHotel.input';
import { GetHotelInput } from './Input/getHotel.input';
import { RoomInput } from './Input/room.input';
import { ServiceInput } from './Input/service.input';
import { HotelType } from './type/hotel.type';

@Resolver()
@UseGuards(AuthenticationGuard)
@UseGuards(RolesGuard)
@Roles(Role.Admin)
export class HotelAdminResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Query()
  async getAllHotels(@Args() args: GetHotelInput) {
    console.log('getAllHotels');
    const result = await this.hotelService.getAllHotels(args);
    return result;
  }
  @Query()
  async getHotelOfStaff(@Args() args: GetHotelInput) {
    const result = await this.hotelService.getHotelOfStaff(args);
    return result;
  }
  @Query()
  async getCategoryOfHotels(@Args() args: GetHotelInput) {
    const result = await this.hotelService.getCategoryOfHotels(args);
    return result;
  }
  @Query()
  @Roles(Role.Admin, Role.Staff, Role.User)
  async getService(@Args() args: GetHotelInput) {
    const result = await this.hotelService.getService(args);
    return result;
  }
  @Mutation()
  async createHotel(@Args() args: CreateHotelInput) {
    const result = await this.hotelService.createHotel(args);
    return result;
  }

  @Mutation()
  async createRoom(@Args() args: RoomInput) {
    const result = await this.hotelService.createRoom(args);
    return result;
  }

  @Mutation()
  async updateHotel(@Args() args: CreateHotelInput) {
    const result = await this.hotelService.updateHotel(args);
    return result;
  }
  @Mutation()
  async editRoom(@Args() args: RoomInput) {
    const result = await this.hotelService.updateHotel(args);
    return result;
  }
  @Mutation()
  async createCategory(@Args() args: CategoryInput) {
    const result = await this.hotelService.createCategory(args);
    return result;
  }
  @Roles(Role.Admin, Role.Staff, Role.User)
  @Mutation()
  async getRoomOfHotel(@Args() args: GetHotelInput) {
    const result = await this.hotelService.getRoomOfHotel(args);
    return result;
  }
  @Mutation()
  async createService(@Args() args: ServiceInput) {
    const result = await this.hotelService.createService(args);
    return result;
  }
  @Mutation()
  async editService(@Args() args: ServiceInput) {
    const result = await this.hotelService.editService(args);
    return result;
  }
  @Mutation()
  async deleteService(@Args() args: ServiceInput) {
    const result = await this.hotelService.deleteService(args);
    return result;
  }
}
