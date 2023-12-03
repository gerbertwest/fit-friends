import { Order } from "@fit-friends/shared/app-types";
import { Entity } from "@fit-friends/util/util-types";


export class OrderEntity implements Entity<OrderEntity>, Order {
  public orderId?: number;
  public type: string;
  public trainingId: number;
  public price: number;
  public count: number;
  public orderPrice: number;
  public paymentMethod: string;
  public createdAt: Date;
  public userId: string;
  public active: boolean;
  public idCount: number;
  public totalPrice: number;

constructor(order: Order) {
  this.fillEntity(order)
}

public fillEntity(entity: Order) {
  this.type = entity.type;
  this.trainingId = entity.trainingId;
  this.price = entity.price;
  this.count = entity.count;
  this.orderPrice = entity.orderPrice;
  this.paymentMethod = entity.paymentMethod;
  this.createdAt = entity.createdAt;
  this.userId = entity.userId;
  this.active = entity.active;
  this.idCount = entity.idCount;
  this.totalPrice = entity.totalPrice;
}

public toObject(): OrderEntity {
    return {... this}
  }
}
