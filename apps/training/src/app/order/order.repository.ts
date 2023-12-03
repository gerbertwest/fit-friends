import { Order } from "@fit-friends/shared/app-types";
import { CRUDRepository } from "@fit-friends/util/util-types";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderEntity } from "./order.entity";
import { TrainingQuery } from "../training/query/training.query";
import { DEFAULT_SORT_DIRECTION, DEFAULT_SORT_FIELD } from "./order.constant";
import { UpdateOrderDto } from "./dto/update-order.dto";

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

  public async findByTrainingId(trainingId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        trainingId
      },
      include: { training: true },
    });
  }

  public async findByUserId(userId: string, {limit, page, active}: TrainingQuery): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        userId,
        active: active === 'true' ? true : undefined
      },
      include: { training: true },
      take: page > 0 ? (limit * page) : limit,
      orderBy: [
        {createdAt: DEFAULT_SORT_DIRECTION}
      ]
    });
  }

  public async findByTrainerId(trainerId: string, {sortDirection, sortField, limit, page}: TrainingQuery): Promise<Order[]> {
    const result = await this.prisma.order.findMany({
      where: {
        training: {
          is: {
            trainerId: trainerId,
          }
        }
      },
      include: { training: true },
      take: page > 0 ? (limit * page) : limit,
      orderBy: [
        sortField === DEFAULT_SORT_FIELD ? {idCount: sortDirection} : {totalPrice: sortDirection}
      ],
      distinct: ['trainingId']
    });

    return result;
  }


  public async update(orderId: number, dto: UpdateOrderDto): Promise<Order> {
    return this.prisma.order.update({
      where: {
        orderId,
      },
      data: {
        ...dto,
      },
      include: { training: true }
    })
  }

  public async updateMany(trainingId: number, {idCount, totalPrice}: UpdateOrderDto) {
    return this.prisma.order.updateMany({
      where: {
        trainingId
      },
      data: {
        idCount: idCount,
        totalPrice: totalPrice
      }
    })
  }

}
