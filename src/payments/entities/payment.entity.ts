import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  expires: 600
})
export class Payment extends Document {
    @Prop({ required: true })
    orderId: string;
  
    @Prop({ type: [[Boolean]], default: [
      [false, false, false, false, false, false, false],  // Breakfast
      [false, false, false, false, false, false, false],  // Lunch
      [false, false, false, false, false, false, false]   // Dinner
    ]})

    selected: boolean[][];
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
