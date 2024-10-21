import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Meal {
  @Prop({required: true})
  mealName: string;

  @Prop({ required: true })
  startTime: string;

  @Prop({required: true})
  endTime: string;

  @Prop({required : true})
  cost: number;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
