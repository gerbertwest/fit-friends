import { Module } from "@nestjs/common";
import { RequestModel, RequestSchema } from "./request.model";
import { MongooseModule } from "@nestjs/mongoose";
import { NotifyModule } from "../notify/notify.module";
import { RequestController } from "./request.controller";
import { RequestService } from "./request.servise";
import { RequestRepository } from "./request.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: RequestModel.name, schema: RequestSchema }
  ]),
  NotifyModule
],
  controllers: [RequestController],
  providers: [RequestRepository, RequestService],
  exports: [RequestRepository, RequestService]
})
export class RequestModule {}
