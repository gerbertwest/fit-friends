import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderRdo } from "./rdo/order.rdo";
import { fillObject } from "@fit-friends/util/util-core";
import { TrainerOrderRdo } from "./rdo/trainer-order.rdo";

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post('/')
  async create(@Body() dto: CreateOrderDto) {
    const newOrder = await this.orderService.createOrder(dto);
    return fillObject(OrderRdo, newOrder);
  }

  @Get('user/:id')
  async showOrdersByUser(@Param('id') userId: string) {
    const trainings = await this.orderService.getUserOrders(userId);
    return trainings;
  }

  @Get('trainer/:id')
  async showOrdersByTrainer(@Param('id') trainerId: string) {
    const trainings = await this.orderService.getTrainerOrders(trainerId);
    return fillObject(TrainerOrderRdo, trainings);
  }
}
