import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { Order } from "@fit-friends/shared/app-types";
import { OrderEntity } from "./order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { TrainingRepository } from "../training/training.repository";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly trainingRepository: TrainingRepository,

  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const training = await this.trainingRepository.findById(dto.trainingId);
    const price = training.price;
    const orderEntity = new OrderEntity({ ...dto, price: price, orderPrice: price*dto.count});

    return this.orderRepository.create(orderEntity);
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orderRepository.findByUserId(userId);
  }

  async getTrainerOrders(trainerId: string): Promise<Order[]> {
    return this.orderRepository.findByTrainerId(trainerId);
  }

}
