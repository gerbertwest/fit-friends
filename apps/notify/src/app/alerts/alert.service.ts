import { Injectable } from "@nestjs/common";
import { AlertRepository } from "./alert.repository";
import { CreateAlertDto } from "./dto/create-alert.dto";
import { AlertEntity } from "./alert.entity";

@Injectable()
export class AlertService {
  constructor(
    private readonly alertRepository: AlertRepository
  ) {}

  public async addAlert(alert: CreateAlertDto) {
    const { title, userId } = alert;
    const existsAlert = await this.alertRepository.findByTitleAndUser(title, userId);

    if (existsAlert) {
      return existsAlert;
    }

    return this.alertRepository
      .create(new AlertEntity(alert));
  }

  public async getAlerts(userId: string) {
    return this.alertRepository.find(userId)
  }

  public async deleteAlert(id: string) {
    return this.alertRepository.destroy(id)
  }

}
