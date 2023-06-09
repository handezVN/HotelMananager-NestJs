import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { EditStaffInput, StaffOfHotels } from './Input/editStaff.input';
import { LoginInput } from './Input/login.input';
import { RegisterStaffInput } from './Input/registerStaff.input';
import { ReLoginInput } from './Input/reLogin.input';
import { UserType } from './type/user.type';
import { UserService } from './user.service';
import { User } from 'src/models/User.schema';
import { Employee } from 'src/models/Employee.schema';

@Resolver(() => Employee)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation((returns) => UserType)
  async loginUser(@Args() args: LoginInput) {
    console.log(args);
    const result = await this.userService.loginUser(args);
    return result;
  }

  @Mutation((returns) => UserType)
  async registerUser(@Args() args: LoginInput) {
    console.log(args);
    const result = await this.userService.registerUser(args);
    return result;
  }

  @Mutation((returns) => UserType)
  async reloginUser(@Args() args: ReLoginInput) {
    console.log(args);
    const result = await this.userService.reloginUser(args);
    return result;
  }
  @Mutation((returns) => UserType)
  async registerStaff(@Args() args: RegisterStaffInput) {
    console.log(args);
    const result = await this.userService.createStaff(args);
    return result;
  }
  @Mutation((returns) => UserType)
  async editStaff(@Args() args: EditStaffInput) {
    console.log(args);
    const result = await this.userService.editStaff(args);
    return result;
  }
  @Mutation((returns) => UserType)
  async removeStaff(@Args() args: EditStaffInput) {
    console.log(args);
    const result = await this.userService.removeStaff(args);
    return result;
  }
  @Query()
  async getStaffsOfHotel(@Args() args: StaffOfHotels) {
    const result = await this.userService.getStaffsOfHotel(args);
    return result;
  }

  @ResolveField(() => User)
  async user(@Parent() employee: Employee) {
    return await this.userService.getUserbyId(employee.userId);
  }
}
