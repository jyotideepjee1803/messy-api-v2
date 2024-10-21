import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({default : false})
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
