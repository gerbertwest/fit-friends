import { Body, Controller, Post } from "@nestjs/common";
import { TrainingService } from "./training.service";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { TrainingRdo } from "./rdo/training.rdo";
import { fillObject } from "@fit-friends/util/util-core";

@Controller('trainings')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
  ) {}

  @Post('/')
  async create(@Body() dto: CreateTrainingDto) {
    const newTraining = await this.trainingService.createTraining(dto);
    return fillObject(TrainingRdo, newTraining);
  }
}
