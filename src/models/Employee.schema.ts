import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
    @Prop()
    userId: String
    @Prop()
    hotelId:String 
    @Prop()
    role: String 
    @Prop()
    name:String 
    @Prop({default: false})
    isDeleted: boolean
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
EmployeeSchema.pre('find', function() {
    this.where({ isDeleted: false });
  });
  
  EmployeeSchema.pre('findOne', function() {
    this.where({ isDeleted: false });
  });