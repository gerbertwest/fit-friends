import { Request } from "@fit-friends/shared/app-types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


@Schema({
  collection: 'requests',
  timestamps: true,
})

export class RequestModel extends Document implements Request {
  @Prop()
  public userId: string;

  @Prop()
  public initiatorId: string;

  @Prop()
  public status: string;

}

export const RequestSchema = SchemaFactory.createForClass(RequestModel);
