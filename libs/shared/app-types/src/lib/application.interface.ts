import { Types } from "mongoose";

export interface Application {
  applicationId?: number;
  createdAt?: Date;
  publishAt?: Date;
  initiatorId?: string;
  status: string;
  userId: Types.ObjectId;
}
