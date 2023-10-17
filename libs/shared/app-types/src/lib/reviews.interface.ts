import { Types } from "mongoose";

export interface Review {
  reviewId?: number;
  //createdAt?: Date;
  trainingId?: number;
  message: string;
  userId: Types.ObjectId;
  rating: number;
}
