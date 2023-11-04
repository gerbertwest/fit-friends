import { CRUDRepository } from "@fit-friends/util/util-types";
import { Injectable } from "@nestjs/common";
import { ReviewEntity } from "./review.entity";
import { Review } from "@fit-friends/shared/app-types";
import { PrismaService } from "../prisma/prisma.service";
import { TrainingQuery } from "../training/query/training.query";
import { DEFAULT_SORT_DIRECTION } from "./review.constant";

@Injectable()
export class ReviewRepository implements CRUDRepository<ReviewEntity, number, Review> {
  constructor(
    private readonly prisma: PrismaService,
    ) {}

    public async create(item: ReviewEntity): Promise<Review> {
      return this.prisma.review.create({
        data: {...item.toObject()},
        include: { training: true }
      });
    }

    public async destroy(reviewId: number): Promise<void> {
      await this.prisma.review.delete({
        where: {
          reviewId,
        }
      });
    }

    public async findById(reviewId: number): Promise<Review> {
      return this.prisma.review.findFirst({
        where: {
          reviewId
        },
        include: { training: true },
      });
    }

    public async findByTrainingId(trainingId: number, {limit, page}: TrainingQuery): Promise<Review[]> {
      return this.prisma.review.findMany({
        where: {
          trainingId,
        },
        include: { training: true },
        take: page > 0 ? (limit * page) : limit,
        orderBy: [
          {createdAt: DEFAULT_SORT_DIRECTION}
        ]
      });
    }

    public async update(reviewId: number, item: ReviewEntity): Promise<Review> {
      return this.prisma.review.update({
        where: {
          reviewId,
        },
        data: {
          ...item.toObject(),
        },
        include: { training: true }
      })
    }

    async calculateRating(trainingId: number) {
      const result = await this.prisma.review
      .aggregate({
        where: {
          trainingId,
        },
        _avg: {
          raiting: true
        }
      })

      const raiting = result._avg.raiting;

      return await this.prisma.training.updateMany({
        where: {
          trainingId,
        },
        data: {
          raiting: raiting,
        }
      })
    }
}
