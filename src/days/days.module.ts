import { Module } from '@nestjs/common';
import { DaysService } from './days.service';
import { DaysController } from './days.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Day, DaySchema } from './entities/day.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Day.name, schema: DaySchema }]),
    AuthModule
  ],
  providers: [DaysService],
  controllers: [DaysController]
})
export class DaysModule {}
