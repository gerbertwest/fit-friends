import { Body, Controller, Get, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderRdo } from "./rdo/order.rdo";
import { fillObject } from "@fit-friends/util/util-core";
import { TrainerOrderRdo } from "./rdo/trainer-order.rdo";
import { TrainingQuery } from "../training/query/training.query";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('order')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new order has been successfully created.'
  })
  @Post('/')
  async create(@Body() dto: CreateOrderDto) {
    const newOrder = await this.orderService.createOrder(dto);
    return fillObject(OrderRdo, newOrder);
  }

  @ApiResponse({
    type: TrainerOrderRdo,
    status: HttpStatus.OK,
    description: 'order found'
  })
  @Get('user/:id')
  async showOrdersByUser(@Param('id') userId: string, @Query() query: TrainingQuery) {
    const trainings = await this.orderService.getUserOrders(userId, query);
    return trainings;
  }

  @ApiResponse({
    type: TrainerOrderRdo,
    status: HttpStatus.OK,
    description: 'order found'
  })
  @Get('trainer/:id')
  async showOrdersByTrainer(@Param('id') trainerId: string, @Query() query: TrainingQuery) {
    const trainings = await this.orderService.getTrainerOrders(trainerId, query);
    return fillObject(TrainerOrderRdo, trainings);
  }
}
