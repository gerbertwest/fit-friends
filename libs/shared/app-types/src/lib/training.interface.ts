import { Order } from "./order.interface";
import { Review } from "./reviews.interface";

export interface Training {
  id?: number;
  title: string;
  backgroundImage: string;
  level: string;
  trainingType: string;
  trainingTime: string;
  price: number;
  caloriesCount: number;
  description: string;
  sex: string;
  video: string;
  raiting?: number;
  trainerId: string;
  special: boolean;
  createdAt?: Date;
  publishAt?: Date;
  orders?: Order[];
  reviews?: Review[]
}
