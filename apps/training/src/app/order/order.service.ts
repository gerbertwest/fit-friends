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

    const ordersByTrainingId = await this.orderRepository.findByTrainingId(dto.trainingId);
    const counts = ordersByTrainingId.map((item) => item.count)

    const count = counts.reduce((acc, num) => acc + num, 0);
    const idCount = count + dto.count;
    const totalPrice = idCount*price

    const orderEntity = new OrderEntity({ ...dto, price: price, orderPrice: price*dto.count, active: true, idCount: idCount, totalPrice: totalPrice});
    const newOrder = this.orderRepository.create(orderEntity);

    this.orderRepository.updateMany(dto.trainingId, {...dto, idCount: idCount, totalPrice: totalPrice} )

    return newOrder
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
