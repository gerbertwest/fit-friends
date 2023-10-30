import { Mail } from "@fit-friends/shared/app-types";

export class MailEntity implements Mail {
  public id: string;
  public email: string;
  public trainerNames?: string[];

  constructor(mail: Mail) {
    this.fillEntity(mail);
  }

  public fillEntity(entity: Mail) {
    this.id = entity.id;
    this.email = entity.email;
    this.trainerNames = entity.trainerNames;
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email,
      trainerNames: this.trainerNames
    };
  }
}
