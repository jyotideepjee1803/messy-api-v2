import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MealSchema } from './entities/meal.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }]),
  AuthModule
],
  providers: [MealsService],
  controllers: [MealsController]
})
export class MealsModule {}
