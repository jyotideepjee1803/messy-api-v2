import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notice } from './entities/notice.entity';
import { Model } from 'mongoose';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Injectable()
export class NoticesService {
    constructor (@InjectModel(Notice.name) private noticeModel : Model<Notice>) {}

    async createNotice(createNoticeDto: CreateNoticeDto) : Promise<Notice>{
        const newNotice = new this.noticeModel(createNoticeDto);
        return newNotice.save();
    }

    async findAll(): Promise<Notice[]> {
        return this.noticeModel.find().exec();
    }

    async findById(id: string): Promise<Notice> {
        return this.noticeModel.findById(id).exec();
    }

    async updateById(id : string, updateNoticeDto : UpdateNoticeDto) : Promise<Notice> {
        const updatedNotice = await this.noticeModel.findByIdAndUpdate(id, updateNoticeDto, {
            new: true,
        }).exec();
      
        if (!updatedNotice) {
            throw new NotFoundException(`Notice with id ${id} not found`);
        }
      
        return updatedNotice;
    }

    async deleteNotice(id: string): Promise<Notice> {
        return this.noticeModel.findByIdAndDelete(id).exec();
    }
}
