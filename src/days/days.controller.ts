import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DaysService } from './days.service';
import { CreateDayDto } from './dto/create-day.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@UseGuards(AuthGuard)
@Controller('days')
export class DaysController {
    constructor(private readonly dayService: DaysService) {}

    @Post('set-menu')
    @UseGuards(RoleGuard)
    async setMenu(@Body('menuData') mealData: CreateDayDto[]) {
        const response = await this.dayService.setMenu(mealData);
        return response;
    }

    @Get('get-menu')
    async getMealData(){
        const response = await this.dayService.findAll();
        return response;
    }
}
