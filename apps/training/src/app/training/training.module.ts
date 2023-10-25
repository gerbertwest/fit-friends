import { Module } from "@nestjs/common";
import { TrainingController } from "./training.controller";
import { TrainingRepository } from "./training.repository";
import { TrainingService } from "./training.service";

@Module({
  imports: [],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository],
  exports: [TrainingRepository]
})
export class TrainingModule {}
