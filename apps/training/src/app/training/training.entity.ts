import { Order, Review, Training } from "@fit-friends/shared/app-types";
import { Entity } from "@fit-friends/util/util-types";


export class TrainingEntity implements Entity<TrainingEntity>, Training {

  public id?: number;
  public title: string;
  public backgroundImage: string;
  public level: string;
  public trainingType: string;
  public trainingTime: string;
  public price: number;
  public caloriesCount: number;
  public description: string;
  public sex: string;
  public video: string;
  public raiting: number;
  public trainerId: string;
  public special: boolean;
  public createdAt?: Date;
  public publishAt?: Date;
  public orders?: Order[];
  public reviews?: Review[];

  constructor(training: Training) {
    this.fillEntity(training)
  }

  public fillEntity(entity: Training) {
    this.title = entity.title;
    this.backgroundImage = entity.backgroundImage;
    this.level = entity.level;
    this.trainingType = entity.trainingType;
    this.trainingTime = entity.trainingTime;
    this.price = entity.price;
    this.caloriesCount = entity.caloriesCount;
    this.description = entity.description;
    this.sex = entity.sex;
    this.video = entity.video;
    this.raiting = entity.raiting;
    this.trainerId = entity.trainerId;
    this.special = entity.special;
    this.createdAt = new Date();
    this.publishAt = new Date();
    this.orders = [];
    this.reviews = [];
  }

  public toObject(): TrainingEntity {
    return {
      ...this,
      orders: [...this.orders],
      reviews: [...this.reviews],
    }
  }
}
