import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Alert } from '@fit-friends/shared/app-types';


const ALERTS_COLLECTION_NAME = 'alerts';

@Schema({
  collection: ALERTS_COLLECTION_NAME,
  timestamps: true,
})
export class ALertModel extends Document implements  Alert {
  @Prop()
  public title: string;

  @Prop()
  public userId: string;
}

export const AlertSchema = SchemaFactory.createForClass(ALertModel);
