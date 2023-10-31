import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AlertService } from "./alert.service";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { RabbitRouting } from "@fit-friends/shared/app-types";
import { CreateAlertDto } from "./dto/create-alert.dto";

@ApiTags('Alert')
@Controller('alert')
export class AlertController {
  constructor(
    private readonly subscriberService: AlertService,
  ) {}

  @RabbitSubscribe({
    exchange: 'fitFriends.notify',
    routingKey: RabbitRouting.AddAlert,
    queue: 'fitFriends.notify',
  })
  public async create(subscriber: CreateAlertDto) {
    this.subscriberService.addSubscriber(subscriber);
  }
}
