export interface Request {
  requestId?: string;
  userId: string;
  trainerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
}
