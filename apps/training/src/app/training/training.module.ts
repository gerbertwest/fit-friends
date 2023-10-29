import { Module } from "@nestjs/common";
import { TrainingController } from "./training.controller";
import { TrainingRepository } from "./training.repository";
import { TrainingService } from "./training.service";
import { NotifyModule } from "../notify/notify.module";

@Module({
  imports: [NotifyModule],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository],
  exports: [TrainingRepository]
})
export class TrainingModule {}
