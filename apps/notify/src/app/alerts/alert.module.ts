import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ALertModel, AlertSchema } from "./alert.model";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { getRabbitMQOptions } from "@fit-friends/util/util-core";
import { AlertController } from "./alert.controller";
import { AlertRepository } from "./alert.repository";
import { AlertService } from "./alert.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ALertModel.name, schema: AlertSchema }
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit2')
    ),
  ],
  controllers: [AlertController],
  providers: [
    AlertService,
    AlertRepository,
    AlertController
  ],
})
export class AlertModule {}
