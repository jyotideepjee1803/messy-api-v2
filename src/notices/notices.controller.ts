import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Notice } from './entities/notice.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@UseGuards(AuthGuard)
@Controller('notices')
export class NoticesController {
    constructor(private readonly noticeService : NoticesService) {}

    @Post()
    @UseGuards(RoleGuard)
    async createNotice(@Body(ValidationPipe) createNoticeDto : CreateNoticeDto){
        return this.noticeService.createNotice(createNoticeDto);
    }

    @Get()
    async getAllNotices(){
        return this.noticeService.findAll();
    }

    @Get(':id')
    async getNoticeById(@Param('id') id : string){
        return this.noticeService.findById(id);
    }

    @Put(':id')
    @UseGuards(RoleGuard)
    async update(@Param('id') id: string, @Body(ValidationPipe) updateMealDto: UpdateNoticeDto): Promise<Notice> {
        return this.noticeService.updateById(id, updateMealDto);
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    async deleteNotice(@Param('id') id : string){
        return this.noticeService.deleteNotice(id);
    }
}
