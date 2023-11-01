import { Expose } from "class-transformer";
import { UserRdo } from "./user.rdo";

export class AlertRdo {
  @Expose()
  public id?: string;

  @Expose()
  public title: string;

  @Expose()
  public user: UserRdo;

  @Expose({ name: 'createdAt' })
  public alertDate: Date;
}
