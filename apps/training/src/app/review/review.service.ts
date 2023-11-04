import { Injectable } from "@nestjs/common";
import { ReviewRepository } from "./review.repository";
import { CreateReviewDto } from "./dto/create-review.dto";
import { Review } from "@fit-friends/shared/app-types";
import { ReviewEntity } from "./review.entity";
import { TrainingQuery } from "../training/query/training.query";

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async createReview(dto: CreateReviewDto): Promise<Review> {
    const reviewEntity = new ReviewEntity(dto);
    return this.reviewRepository.create(reviewEntity);
  }

  async getTreaningReviews(trainingId: number, query: TrainingQuery): Promise<Review[]> {
    return this.reviewRepository.findByTrainingId(trainingId,  query);
  }

  async calculateRating(trainingId: number) {
    return this.reviewRepository.calculateRating(trainingId)
  }

}
