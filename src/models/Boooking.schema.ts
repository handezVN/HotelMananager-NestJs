import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type BookingDocument = HydratedDocument<Booking>;

type CustomerType = {
                name: String,
                address: String,
                gen: String,
                birthday: String,
                number: String,
            }
type ExtraFeeType =  {
    name: String,
    price: Number,
    quantity: Number,
    roomId: String,
    serviceId: String,
}
@Schema()
export class Booking {
    @Prop()
    RoomName: String
    @Prop()
    RoomId : String 
    @Prop()
    RoomPrice: Number
    @Prop()
    hotelId: String
    @Prop()
    CheckInDate: String
    @Prop()
    CheckOutDate: String
    @Prop()
    ExtraFee: Number
    @Prop()
    ExtraReaSon: [ExtraFeeType]
    @Prop()
    CustomerList: [CustomerType]
    @Prop({
        default : Date.now
    })
    checkInAt: Date
    @Prop()
    checkOutAt: Date
    
}
export const BookingSchema = SchemaFactory.createForClass(Booking);