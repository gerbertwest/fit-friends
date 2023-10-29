import { Subscriber } from "@fit-friends/shared/app-types";
import { Entity } from "@fit-friends/util/util-types";


export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public title: string;
  public trainerId: string;


  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.title = entity.title;
    this.id = entity._id;
    this.trainerId = entity.trainerId;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
