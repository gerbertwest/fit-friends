import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderRdo } from "./rdo/order.rdo";
import { fillObject } from "@fit-friends/util/util-core";

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
}
