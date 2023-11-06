import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { Order } from "@fit-friends/shared/app-types";
import { OrderEntity } from "./order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { TrainingRepository } from "../training/training.repository";
import { TrainingQuery } from "../training/query/training.query";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderError } from "./order.constant";
import { TrainingError } from "../training/training.constant";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly trainingRepository: TrainingRepository,

  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const existTraining = await this.trainingRepository.findById(dto.trainingId)

    if (!existTraining) {
      throw new NotFoundException(TrainingError.NotExistTraining);
    }

    const training = await this.trainingRepository.findById(dto.trainingId);
    const price = training.price;
    const orderEntity = new OrderEntity({ ...dto, price: price, orderPrice: price*dto.count, active: true});

    return this.orderRepository.create(orderEntity);
  }

  async getUserOrders(userId: string, query: TrainingQuery): Promise<Order[]> {
    return this.orderRepository.findByUserId(userId,  query);
  }

  async getTrainerOrders(trainerId: string, query: TrainingQuery): Promise<Order[]> {
    return this.orderRepository.findByTrainerId(trainerId, query);
  }

  async updateOrder(orderId: number, dto: UpdateOrderDto) {

    const existOrder = await this.orderRepository.findById(orderId)

    if (!existOrder) {
      throw new NotFoundException(OrderError.NotExistOrder);
    }

    return this.orderRepository.update(orderId, dto)
  }

}
