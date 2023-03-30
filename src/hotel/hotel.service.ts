import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/models/Category.schema';
import { Employee, EmployeeDocument } from 'src/models/Employee.schema';
import { Hotel } from 'src/models/Hotel.schema';
import { Room, RoomDocument } from 'src/models/Room.schema';
import { Service, ServiceDocument } from 'src/models/Services.schema';
import { HotelModule } from './hotel.module';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name)
    private readonly HotelModel: Model<HotelModule>,
    @InjectModel(Room.name)
    private readonly RoomModel: Model<RoomDocument>,
    @InjectModel(Employee.name)
    private readonly EmployeeModel: Model<EmployeeDocument>,
    @InjectModel(Category.name)
    private readonly CategoryModel: Model<CategoryDocument>,
    @InjectModel(Service.name)
    private readonly ServiceModel: Model<ServiceDocument>,
  ) {}
  async createHotel(args) {
    const newHotel = new this.HotelModel({
      name: args.name,
      userId: args.userId,
      address: args.address,
    });
    return await newHotel.save();
  }
  async updateHotel(args) {
    const hotel = this.HotelModel.findByIdAndUpdate(args.id);
    try {
      await hotel.updateOne({
        $set: {
          name: args.name,
          address: args.address,
        },
      });
    } catch (error) {
      console.log(error);
      return 'Update Failed';
    }
    return 'Update Success';
  }
  async createRoom(args) {
    const findRoomName = await this.RoomModel.findOne({
      name: args.name,
      hotelId: args.hotelId,
    });
    if (findRoomName) {
      return {
        msg: 'Room Name đã tồn tại !',
        status: 400,
      };
    }
    const newRoom = new this.RoomModel({
      name: args.name,
      hotelId: args.hotelId,
      floor: args.floor,
      categoryId: args.categoryId,
      status: false,
      isClean: true,
    });
    const result = await newRoom.save();
    if (result) {
      return {
        msg: 'Create Room Success ',
        status: 200,
      };
    }
  }
  async editRoom(args) {
    const data = await this.RoomModel.findByIdAndUpdate(args.roomId, {
      $set: {
        name: args.name,
        categoryId: args.categoryId,
        floor: args.floor,
      },
    });
    return {
      msg: 'Edit Room Success ',
      status: 200,
      hotelId: data.hotelId,
    };
  }
  async getAllHotels(args) {
    return await this.HotelModel.find({ userId: args.userId });
  }
  async getHotelOfStaff(args) {
    const info = await this.EmployeeModel.find({ userId: args.userId });
    if (info.length > 0) {
      return await this.HotelModel.findById(info[0].hotelId);
    }
    return null;
  }

  async createCategory(args) {
    const newcategory = new this.CategoryModel({
      name: args.name,
      hotelId: args.hotelId,
    });
    return newcategory.save();
  }
  async getCategoryOfHotels(args) {
    const data = await this.CategoryModel.find({ hotelId: args.hotelId });
    return data;
  }
  async getRoomOfHotel(args) {
    const data = await this.RoomModel.find({ hotelId: args.hotelId });
    return data.sort((a, b) =>
      a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0,
    );
  }
  async createService(args) {
    const findService = await this.ServiceModel.findOne({
      name: args.name,
      hotelId: args.hotelId,
    });
    if (findService) {
      return {
        msg: 'Sản phẩm này đã tồn tại !',
        status: 400,
      };
    }
    const data = new this.ServiceModel({
      type: args.type,
      name: args.name,
      price: args.price,
      hotelId: args.hotelId,
    });
    const result = await data.save();
    if (result) {
      return {
        msg: 'Create Services Success ',
        status: 200,
      };
    } else
      return {
        msg: 'Lỗi server',
        status: 500,
      };
  }
  async getService(args) {
    const data = await this.ServiceModel.find({ hotelId: args.hotelId });
    return data;
  }
  async editService(args) {
    const data = await this.ServiceModel.findByIdAndUpdate(args.serviceId, {
      $set: {
        name: args.name,
        price: args.price,
        type: args.type,
      },
    });
    if (data) {
      return {
        msg: 'Edit service success !',
        status: 200,
      };
    } else {
      return {
        msg: 'Edit service failed !',
        status: 400,
      };
    }
  }
  async deleteService(args) {
    try {
      await this.ServiceModel.findByIdAndRemove(args.serviceId);
      return {
        msg: 'Delete Item Success !',
        status: 200,
      };
    } catch (error) {
      return {
        msg: 'Delete Item Failed !',
        status: 400,
      };
    }
  }
}
