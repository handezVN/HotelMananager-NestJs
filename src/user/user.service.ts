import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EnvKeyName } from 'src/common/enums/env';
import { Employee, EmployeeDocument } from 'src/models/Employee.schema';
import { User, UserDocument } from 'src/models/User.schema';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,

    @InjectModel(Employee.name)
    private readonly EmployeeModel: Model<EmployeeDocument>,
  ) {}
  async loginUser(args: any) {
    console.log('loginUser', args);
    const user = await this.UserModel.findOne({ email: args.email });
    if (!user) {
      return {
        msg: 'Tên đăng nhập không tồn tại.',
        status: 401,
      };
    } else {
      const isCheckPassword = bcrypt.compareSync(args.password, user.password);
      if (!isCheckPassword) {
        return {
          msg: 'Mật khẩu không chính xác.',
          status: 401,
        };
      }
    }
    const token = jwt.sign({ ...user }, EnvKeyName.PRITEKEY, {
      expiresIn: '7d',
    });

    return {
      msg: 'Đăng nhập thành công.',
      status: 200,
      token: token,
      userId: user.id,
      email: user.email,
      role: user.role,
    };
  }
  async registerUser(args) {
    const check = await this.UserModel.find({ email: args.email });
    if (check.length > 0) {
      return 'Account Exits !';
    } else {
      const hashpassword = bcrypt.hashSync(
        args.password,
        parseInt(EnvKeyName.saltRounds),
      );
      const newUser = new this.UserModel({
        email: args.email,
        password: hashpassword,
      });
      await newUser.save();
      return 'Register Success !';
    }
  }
  async reloginUser(args: any) {
    try {
      var decoded = jwt.verify(args.token, EnvKeyName.PRITEKEY);
      const data = decoded._doc; // bar
      const user = await this.UserModel.findOne({
        email: data.email,
        password: data.password,
      });
      if (user) {
        return {
          msg: 'Đăng nhập thành công.',
          status: 200,
          token: args.token,
          userId: user.id,
          email: user.email,
          role: user.role,
        };
      }
    } catch (error) {
      return {
        msg: 'Phiên đăng nhập đã hết hạn !',
        status: 401,
      };
    }
  }
  async createStaff(args) {
    const check = await this.UserModel.find({ email: args.email });
    if (check.length > 0) {
      return 'Account Exits !';
    } else {
      try {
        const hashpassword = bcrypt.hashSync(
          args.password,
          parseInt(EnvKeyName.saltRounds),
        );
        const newUser = new this.UserModel({
          email: args.email,
          password: hashpassword,
          role: 'staff',
          name: args.name,
        });
        const result = await newUser.save();
        const newEmployee = new this.EmployeeModel({
          userId: result._id,
          hotelId: args.hotelId,
          role: args.role,
          name: args.name,
          isDeleted: false,
        });
        console.log(await newEmployee.save());
        return 'Register Success !';
      } catch (error) {
        return 'Error';
      }
    }
  }
  async editStaff(args) {
    const employee = await this.EmployeeModel.findByIdAndUpdate(args.id);
    console.log(employee);
    try {
      await employee.updateOne({
        $set: {
          name: args.name,
          role: args.role,
        },
      });
    } catch (error) {
      console.log(error);
      return 'Erorr';
    }
    return 'Update Success !';
  }
  async removeStaff(args) {
    try {
      const employee = await this.EmployeeModel.findByIdAndUpdate(args.id);
      await employee.updateOne({
        $set: {
          isDeleted: true,
        },
      });
    } catch (error) {
      return 'Erorr';
    }
    return 'Remove Staff Success !';
  }
}
