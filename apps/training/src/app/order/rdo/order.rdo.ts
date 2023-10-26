import { Expose } from "class-transformer";

export class OrderRdo {
  @Expose()
  public orderId: number;
  @Expose()
  public type: string;
  @Expose()
  public trainingId: number;
  @Expose()
  public price: number;
  @Expose()
  public count: number;
  @Expose()
  public orderPrice: number;
  @Expose()
  public paymentMethod: string;
  @Expose()
  public createdAt: Date;
  @Expose()
  public userId: string;
}
