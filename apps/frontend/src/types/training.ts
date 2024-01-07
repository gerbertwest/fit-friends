import { Review } from "./review";
import { User } from "./user";

export type Training = {
  id: number;
  trainingId?: number;
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
  trainer: User;
  special: boolean;
  createdAt?: Date;
  publishAt?: Date;
  orders?: number[];
  reviews?: Review[];
  totalPageNumber: number;
}
