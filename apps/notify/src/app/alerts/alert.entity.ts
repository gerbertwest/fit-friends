import { Alert } from "@fit-friends/shared/app-types";
import { Entity } from "@fit-friends/util/util-types";


export class AlertEntity implements Entity<AlertEntity>, Alert {
  public id: string;
  public title: string;
  public userId: string;


  constructor(alert: Alert) {
    this.fillEntity(alert);
  }

  public fillEntity(entity) {
    this.title = entity.title;
    this.id = entity._id;
    this.userId = entity.userId;
  }

  public toObject(): AlertEntity {
    return { ...this };
  }
}
