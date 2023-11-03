import { Module } from "@nestjs/common";
import { TrainingModule } from "../training/training.module";
import { ReviewController } from "./review.controller";
import { ReviewRepository } from "./review.repository";
import { ReviewService } from "./review.service";

@Module({
  imports: [TrainingModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewRepository]
})
export class ReviewModule {}
