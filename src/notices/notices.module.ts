import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from './entities/notice.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Notice.name, schema: NoticeSchema}]),
    AuthModule
  ],
  providers: [NoticesService],
  controllers: [NoticesController]
})
export class NoticesModule {}
