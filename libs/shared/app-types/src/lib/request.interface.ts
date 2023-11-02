export interface Request {
  requestId?: string;
  initiatorId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
}
