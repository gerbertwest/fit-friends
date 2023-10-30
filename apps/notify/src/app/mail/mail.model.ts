import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Mail } from "@fit-friends/shared/app-types";
import { Document } from 'mongoose';

@Schema({
  collection: 'mailings',
  timestamps: true,
})

export class MailModel extends Document implements  Mail {
  @Prop()
  public email: string;

  @Prop()
  public requestDate: Date;

  @Prop()
  public trainerName: string;

}

export const MailSchema = SchemaFactory.createForClass(MailModel);
