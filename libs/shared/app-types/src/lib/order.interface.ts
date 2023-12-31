export interface Order {
  orderId?: number;
  type: string;
  trainingId?: number;
  price: number;
  count: number;
  orderPrice: number;
  paymentMethod: string;
  createdAt?: Date;
  userId: string;
  active: boolean;
  idCount?: number;
  totalPrice?: number;
}
