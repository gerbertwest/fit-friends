import { CRUDRepository } from "@fit-friends/util/util-types";
import { Injectable } from "@nestjs/common";
import { TrainingEntity } from "./training.entity";
import { Training } from "@fit-friends/shared/app-types";
import { PrismaService } from "../prisma/prisma.service";
import { TrainingQuery } from "./query/training.query";

@Injectable()
export class TrainingRepository implements CRUDRepository<TrainingEntity, number, Training> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TrainingEntity): Promise<Training> {
    const entityData = item.toObject();
    return this.prisma.training.create({
      data: {
        ...entityData,
        orders: {
          connect: []
        },
        reviews: {
          connect: []
        },
      },
      include: {
        orders: true,
        reviews: true,
      }
    });
  }

  public async destroy(trainingId: number): Promise<void> {
    await this.prisma.training.delete({
      where: {
        trainingId,
      }
    });
  }

  public async findById(trainingId: number): Promise<Training | null> {
    return this.prisma.training.findFirst({
      where: {
        trainingId
      },
      include: {
        orders: true,
        reviews: true,
      }
    });
  }

  public async findByTrainerId(trainerId: string, {limit, minPrice, maxPrice, minCaloriesCount, maxCaloriesCount,
    minRaiting, maxRaiting, trainingTypes, sortDirection, page, trainingTime}: TrainingQuery): Promise<Training[]> {
      const trainings = await this.prisma.training.findMany({
        where: {
          trainerId: trainerId,
          price: {
              gte: minPrice,
              lte: maxPrice
          },
          caloriesCount: {
            gte: minCaloriesCount,
            lte: maxCaloriesCount
          },
          raiting: {
            gte: minRaiting,
            lte: maxRaiting
          },
          trainingType: {
            in: trainingTypes
          },
          trainingTime: {
            in: trainingTime
          }
        },
      })

      const count = trainings.length;

      const result = await this.prisma.training.findMany({
        where: {
          trainerId: trainerId,
          price: {
              gte: minPrice,
              lte: maxPrice
          },
          caloriesCount: {
            gte: minCaloriesCount,
            lte: maxCaloriesCount
          },
          raiting: {
            gte: minRaiting,
            lte: maxRaiting
          },
          trainingType: {
            in: trainingTypes
          },
          trainingTime: {
            in: trainingTime
          }
        },
        take: page > 0 ? (limit * page) : limit,
        include: {
          orders: true,
          reviews: true,
        },
        orderBy: [
          { price: sortDirection }
        ],
      });

      const newResult = result.map((item) => ({...item, totalPageNumber: count}))

      return newResult;
    }

  public async find({limit, minPrice, maxPrice, minCaloriesCount, maxCaloriesCount,
    minRaiting, maxRaiting, trainingTypes, sortDirection, page, special, sortField}: TrainingQuery): Promise<Training[]> {

      const trainings = await this.prisma.training.findMany({
        where: {
          price: {
              gte: minPrice,
              lte: maxPrice
          },
          caloriesCount: {
            gte: minCaloriesCount,
            lte: maxCaloriesCount
          },
          raiting: {
            gte: minRaiting,
            lte: maxRaiting
          },
          trainingType: {
            in: trainingTypes
          },
          special: special === 'true' ? true : undefined,
        },
      })
      const count = trainings.length;

    const result =  await this.prisma.training.findMany({
      where: {
        price: {
            gte: minPrice,
            lte: maxPrice
        },
        caloriesCount: {
          gte: minCaloriesCount,
          lte: maxCaloriesCount
        },
        raiting: {
          gte: minRaiting,
          lte: maxRaiting
        },
        trainingType: {
          in: trainingTypes
        },
        special: special === 'true' ? true : undefined,
      },
      take: page > 0 ? (limit * page) : limit,
      include: {
        orders: true,
        reviews: true,
      },
      orderBy: [
        sortField === 'raiting' ? { raiting: sortDirection } : {price: sortDirection}
      ],
    });

    const newResult = result.map((item) => ({...item, totalPageNumber: count}))
    return newResult;
  }

  public update(trainingId: number, item: TrainingEntity): Promise<Training> {
    return this.prisma.training.update({
      where: {
        trainingId,
        },
      data: {
        ...item.toObject(),
        orders: {
          connect: item.toObject().orders
          .map(({ orderId }) => ({ orderId }))
        },
        reviews: {
          connect: item.toObject().reviews
            .map(({ reviewId }) => ({ reviewId }))
        },
      },
      include: {
        orders: true,
        reviews: true,
      }
    });
  }

}
