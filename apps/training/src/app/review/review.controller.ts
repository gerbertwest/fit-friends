import { fillObject } from "@fit-friends/util/util-core";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewService } from "./review.service";
import { ReviewRdo } from "./rdo/review.rdo";
import { Body, Controller, Get, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { TrainingQuery } from "../training/query/training.query";

@ApiTags('review')
@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.'
  })
  @Post('/')
  async create(@Body() dto: CreateReviewDto) {
    const newReview = await this.reviewService.createReview(dto);
    await this.reviewService.calculateRating(dto.trainingId);
    return fillObject(ReviewRdo, newReview);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'reviews of trainings found'
  })
  @Get('/:trainingId')
  async showRewievsByTrainer(@Param('trainingId') trainingId: number, @Query() query: TrainingQuery) {
    const reviews = await this.reviewService.getTreaningReviews(trainingId, query);
    return fillObject(ReviewRdo, reviews);
  }

}
