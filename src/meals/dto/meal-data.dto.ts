import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';
import { CreateMealDto } from './create-meal.dto';

export class MealDataDto {
    @IsArray()
    @ValidateNested({ each: true })  
    @Type(() => CreateMealDto)     
    mealData: CreateMealDto[];
}