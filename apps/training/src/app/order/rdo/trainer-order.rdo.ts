import { Training } from "@fit-friends/shared/app-types";
import { Expose } from "class-transformer";

export class TrainerOrderRdo {
  @Expose()
  public orderId: number;

  @Expose()
  public idCount: number;

  @Expose()
  public totalPrice: number;

  @Expose()
  public training: Training;
}
