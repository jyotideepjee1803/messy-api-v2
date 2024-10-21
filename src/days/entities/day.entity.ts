import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({versionKey: false})
export class Day extends Document {
  @Prop({ required: true })
  day: string;

  @Prop({ required: true })
  breakfast: string;

  @Prop({ required: true })
  lunch: string;

  @Prop({ required: true })
  dinner: string;
}

export const DaySchema = SchemaFactory.createForClass(Day);
