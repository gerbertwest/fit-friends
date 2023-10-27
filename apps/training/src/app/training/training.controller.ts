import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { TrainingService } from "./training.service";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { TrainingRdo } from "./rdo/training.rdo";
import { fillObject } from "@fit-friends/util/util-core";
import { TrainingQuery } from "./query/training.query";
import { UpdateTrainingDto } from "./dto/update-training.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('training')
@Controller('trainings')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new training has been successfully created.'
  })
  @Post('/')
  async create(@Body() dto: CreateTrainingDto) {
    const newTraining = await this.trainingService.createTraining(dto);
    return fillObject(TrainingRdo, newTraining);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'All trainings found'
  })
  @Get('/')
  async index(@Query() query: TrainingQuery) {
    const trainings = await this.trainingService.getTrainings(query);
    return fillObject(TrainingRdo, trainings);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'training found'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const training = await this.trainingService.getTraining(id);
    return fillObject(TrainingRdo, training);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Training has been deleted.'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.trainingService.deleteTraining(id);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Training has been updeted.'
  })
  @Patch('/:id')
  async changeTraining(@Param('id') id: number, @Body() dto: UpdateTrainingDto) {
    const updateTraining = await this.trainingService.updateTraining(id, {...dto});
    return fillObject(TrainingRdo, updateTraining)
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'training by trainer found'
  })
  @Get('trainer/:id')
  async showTrainingsByUser(@Param('id') userId: string, @Query() query: TrainingQuery) {
    const trainings = await this.trainingService.getTrainingsByTrainerId(userId, query);
    return fillObject(TrainingRdo, trainings);
  }
}
