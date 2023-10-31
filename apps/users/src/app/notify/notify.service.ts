import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@fit-friends/shared/app-types';
import { CreateAlertDto } from './dto/create-alert.dto';
import { rabbitUserConfig } from '@fit-friends/config/config-users';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitUserConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitUserConfig>,
  ) {}

  public async registerSubscriber(dto: CreateAlertDto ) {
    return this.rabbitClient.publish<CreateAlertDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddAlert,
      { ...dto }
    );
  }
}
