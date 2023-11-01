import { Controller, Delete, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AlertService } from "./alert.service";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { RabbitRouting } from "@fit-friends/shared/app-types";
import { CreateAlertDto } from "./dto/create-alert.dto";
import { fillObject } from "@fit-friends/util/util-core";
import { AlertRdo } from "./rdo/alert.rdo";

@ApiTags('Alert')
@Controller('alert')
export class AlertController {
  constructor(
    private readonly alertService: AlertService,
  ) {}

  @RabbitSubscribe({
    exchange: 'fitFriends.notify2',
    routingKey: RabbitRouting.AddAlert,
    queue: 'fitFriends.notify2',
  })
  public async create(alert: CreateAlertDto) {
    this.alertService.addAlert(alert);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All alerts by userId found'
  })
  @Get('/:userId')
  public async index(@Param('userId') userId: string) {
    const alerts = this.alertService.getAlerts(userId);
    return fillObject(AlertRdo, alerts)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Alert has been deleted.'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    this.alertService.deleteAlert(id);
  }
}
