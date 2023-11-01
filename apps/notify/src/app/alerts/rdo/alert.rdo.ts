import { Expose } from "class-transformer";

export class AlertRdo {
  @Expose()
  public id?: string;

  @Expose()
  public title: string;

  @Expose()
  public userId: string;

  @Expose({ name: 'createdAt' })
  public alertDate: Date;
}
