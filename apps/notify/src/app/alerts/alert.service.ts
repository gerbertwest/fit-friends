import { Injectable } from "@nestjs/common";
import { AlertRepository } from "./alert.repository";
import { CreateAlertDto } from "./dto/create-alert.dto";
import { AlertEntity } from "./alert.entity";

@Injectable()
export class AlertService {
  constructor(
    private readonly alertRepository: AlertRepository
  ) {}

  public async addSubscriber(alert: CreateAlertDto) {
    // const { title } = subscriber;
    // const existsSubscriber = await this.alertRepository.findByTitle(title);

    // if (existsSubscriber) {
    //   return existsSubscriber;
    // }

    return this.alertRepository
      .create(new AlertEntity(alert));
  }

}
