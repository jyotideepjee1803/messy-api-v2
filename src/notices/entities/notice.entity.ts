import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Notice extends Document {
  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  body: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
