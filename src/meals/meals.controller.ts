import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { MealDataDto } from './dto/meal-data.dto';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('meals')
export class MealsController {
    constructor(private readonly mealService: MealsService) {}

    @UseGuards(AuthGuard, RoleGuard)
    @Post('set-meal')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async setMealCostTime(@Body(ValidationPipe) mealDataDto: MealDataDto) {
        const response = await this.mealService.setMealCostTime(mealDataDto.mealData);  // Use mealData array from the DTO
        return response;
    }

    @UseGuards(AuthGuard)
    @Get('get-meal')
    async getMealData(){
        const response = await this.mealService.findAll();
        return response;
    }
}
