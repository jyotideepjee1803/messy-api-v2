import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Coupon extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ default: false })
  taken: boolean;

  @Prop({ type: [[Boolean]] })
  week: boolean[][];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);