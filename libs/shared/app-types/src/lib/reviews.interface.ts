export interface Review {
  reviewId?: number;
  createdAt?: Date;
  trainingId?: number;
  message: string;
  userId: string;
  raiting: number;
}
