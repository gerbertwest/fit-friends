import { Review } from "@fit-friends/shared/app-types";
import { Entity } from "@fit-friends/util/util-types";

export class ReviewEntity implements Entity<ReviewEntity>, Review {
  public reviewId?: number;
  public trainingId: number;
  public message: string;
  public userId: string;
  public raiting: number;
  public createdAt: Date;

constructor(review: Review) {
  this.fillEntity(review)
}

public fillEntity(entity: Review) {
    this.message = entity.message;
    this.userId = entity.userId;
    this.raiting = entity.raiting;
    this.createdAt = entity.createdAt;
    this.trainingId = entity.trainingId;
}

public toObject(): ReviewEntity {
    return {... this}
  }
}
