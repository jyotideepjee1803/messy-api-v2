import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Day } from './entities/day.entity';
import { Model } from 'mongoose';
import { CreateDayDto } from './dto/create-day.dto';

@Injectable()
export class DaysService {
    constructor (@InjectModel(Day.name) private dayModel : Model<Day>) {}

    async create(createDayDto: CreateDayDto): Promise<Day> {
        const newMeal = new this.dayModel(createDayDto);
        return newMeal.save();
    }
    
    async findAll(): Promise<Day[]> {
        return this.dayModel.find().select({_id : 0}).exec();
    }
    
    async setMenu(menuData : CreateDayDto[]) : Promise<Day[]>{
        await this.dayModel.deleteMany({});
        
        const resp = await this.dayModel.insertMany(menuData);
        return resp;
    }
}
