import { Order } from "@fit-friends/shared/app-types";
import { CRUDRepository } from "@fit-friends/util/util-types";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderEntity } from "./order.entity";

@Injectable()
export class OrderRepository implements CRUDRepository<OrderEntity, number, Order> {
  constructor(
    private readonly prisma: PrismaService,
    ) {}

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
      include: { training: true },
    });
  }

  public async findByUserId(userId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        userId
      },
      include: { training: true }
    });
  }

  public async findByTrainerId(trainerId: string): Promise<Order[]> {
    const result = await this.prisma.order.findMany({
      where: {
        training: {
          is: {
            trainerId: trainerId,
          }
        }
      },
      include: { training: true },
    });

    const trainings = [];
    const ids = [];

    for (let i= 0; i < result.length; i++ ) {
      ids.push(result[i].training.trainingId);
    }

    for (let i= 0; i < result.length; i++ ) {
      const id = result[i].training.trainingId;

      const count = ids.filter((item) => item === id).length
      const orderPrice = result[i].orderPrice

      const training = await this.prisma.order.update({
        where: {
          orderId: result[i].orderId
        },
        data: {
          training: {
            connect: result[i].training
          },
          idCount: count,
          totalPrice: orderPrice * count
        },
        include: {
          training: true
        }
      })
      trainings.push(training)
    }

    return trainings;
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
