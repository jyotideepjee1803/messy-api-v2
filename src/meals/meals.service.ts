import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal } from './entities/meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { MealDataDto } from './dto/meal-data.dto';

@Injectable()
export class MealsService {
    constructor(@InjectModel('Meal') private mealModel : Model<Meal>) {}

    async create(createMealDto: CreateMealDto): Promise<Meal> {
        const newMeal = new this.mealModel(createMealDto);
        return newMeal.save();
    }
    
    async findAll(): Promise<Meal[]> {
        return this.mealModel.find().select({_id : 0}).exec();
    }
    
    async findById(id: string): Promise<Meal> {
        const meal = await this.mealModel.findById(id).exec();
        if (!meal) {
          throw new NotFoundException(`Meal with id ${id} not found`);
        }
        return meal;
    }
    
    async update(id: string, updateMealDto: UpdateMealDto): Promise<Meal> {
        const updatedMeal = await this.mealModel.findByIdAndUpdate(id, updateMealDto, {
          new: true,
        }).exec();
    
        if (!updatedMeal) {
          throw new NotFoundException(`Meal with id ${id} not found`);
        }
    
        return updatedMeal;
    }
    
    async delete(id: string): Promise<void> {
        const result = await this.mealModel.findByIdAndDelete(id).exec();
        if (!result) {
          throw new NotFoundException(`Meal with id ${id} not found`);
        }
    }

    async setMealCostTime(mealData : CreateMealDto[]) : Promise<Meal[]>{
        await this.mealModel.deleteMany({});
        
        const resp = await this.mealModel.insertMany(mealData);
        return resp;
    }
}
