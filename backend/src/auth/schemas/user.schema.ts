import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({
    type: String,
    enum: ['admin', 'contributor', 'knowledge_holder', 'visitor'],
    default: 'contributor',
  })
  role: string;

  @Prop({ default: '' })
  affiliation: string;

  @Prop({ default: '' })
  communityOrLineage: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: '' })
  avatarUrl: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

