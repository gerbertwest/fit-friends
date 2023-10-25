import { Order, Review } from "@fit-friends/shared/app-types";
import { Expose } from "class-transformer";

export class TrainingRdo {
  @Expose()
  public id?: number;
  @Expose()
  public title: string;
  @Expose()
  public backgroundImage: string;
  @Expose()
  public level: string;
  @Expose()
  public trainingType: string;
  @Expose()
  public trainingTime: string;
  @Expose()
  public price: number;
  @Expose()
  public caloriesCount: number;
  @Expose()
  public description: string;
  @Expose()
  public sex: string;
  @Expose()
  public video: string;
  @Expose()
  public raiting: number;
  @Expose()
  public trainerId: string;
  @Expose()
  public special: boolean;
  @Expose()
  public createdAt?: Date;
  @Expose()
  public publishAt?: Date;
  @Expose()
  public orders?: Order[];
  @Expose()
  public reviews?: Review[];
}
