import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMealDto {
   @IsString()
   @IsNotEmpty()
   mealName : string;

   @IsString()
   @IsNotEmpty()
   startTime : string;

   @IsString()
   @IsNotEmpty()
   endTime: string;

   @IsNumber()
   @IsNotEmpty()
   cost : number;
}
  