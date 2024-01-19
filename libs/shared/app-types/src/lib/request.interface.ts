export interface Request {
  initiatorId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  _id?: string;
}
