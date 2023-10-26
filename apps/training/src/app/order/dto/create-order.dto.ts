export class CreateOrderDto {
  public type: string;
  public trainingId: number;
  public price: number;
  public count: number;
  public orderPrice: number;
  public paymentMethod: string;
  public createdAt: Date;
  public userId: string;
}
