import { Order } from "@fit-friends/shared/app-types";
import { CRUDRepository } from "@fit-friends/util/util-types";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderEntity } from "./order.entity";

@Injectable()
export class OrderRepository implements CRUDRepository<OrderEntity, number, Order> {
  constructor(private readonly prisma: PrismaService) {}

 public async create(item: OrderEntity): Promise<Order> {
    return this.prisma.order.create({
      data: { ...item.toObject() },
      include: { training: true }
    });
  }

  public async destroy(orderId: number): Promise<void> {
    await this.prisma.order.delete({
      where: {
        orderId,
      }
    });
  }

  public async findById(orderId: number): Promise<Order> {
    return this.prisma.order.findFirst({
      where: {
        orderId
      },
      include: { training: true }
    });
  }

  public async update(orderId: number, item: OrderEntity): Promise<Order> {
    return this.prisma.order.update({
      where: {
        orderId,
      },
      data: {
        ...item.toObject(),
      },
      include: { training: true }
    })
  }


}
