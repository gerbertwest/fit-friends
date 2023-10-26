import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { Order } from "@fit-friends/shared/app-types";
import { OrderEntity } from "./order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,

  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const orderEntity = new OrderEntity({ ...dto });
    return this.orderRepository.create(orderEntity);
  }

}
