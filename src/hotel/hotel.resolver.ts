import { Args, Field, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from 'src/user/type/user.type';
import { HotelService } from './hotel.service';
import { CategoryInput } from './Input/category.input';
import { CreateHotelInput } from './Input/createHotel.input';
import { GetHotelInput } from './Input/getHotel.input';
import { RoomInput } from './Input/room.input';
import { HotelType } from './type/hotel.type';

@Resolver()
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Query()
  async getAllHotels(@Args() args: GetHotelInput) {
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
  @Mutation()
  async getRoomOfHotel(@Args() args: GetHotelInput) {
    const result = await this.hotelService.getRoomOfHotel(args);
    return result;
  }
}
