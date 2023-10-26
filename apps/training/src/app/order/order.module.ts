import { Module } from "@nestjs/common";
import { OrderController } from "./order-controller";
import { OrderService } from "./order.service";
import { OrderRepository } from "./order.repository";

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderRepository]
})
export class OrderModule {}
