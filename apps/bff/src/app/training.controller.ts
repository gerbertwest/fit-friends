import { Body, Controller, ForbiddenException, Get, HttpStatus, Param, Patch, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { HttpService } from "@nestjs/axios";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { CheckAdminRoleGuard } from "./guards/check-admin-role.guard";
import { UseridInterceptor } from "./interceptors/userid.interceptor";
import { ApplicationServiceURL } from "./app.config";
import { fillObject } from "@fit-friends/util/util-core";
import { TrainingRdo } from "./rdo/training.rdo";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { TrainingQuery } from "./query/training.query";
import { RequestWithTokenPayload } from "@fit-friends/shared/app-types";
import { UpdateTrainingDto } from "./dto/update-training.dto";
import { UserError } from "./app.constant";

@ApiTags('Training')
@Controller('training')
@UseFilters(AxiosExceptionFilter)
export class TrainingController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new training has been successfully created.'
  })
  @UseGuards(CheckAuthGuard, CheckAdminRoleGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateTrainingDto, @Req() req: Request) {
    const trainer = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${dto.trainerId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
      })).data
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Training}/`, dto);
    return fillObject(TrainingRdo, {...data, user: trainer});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All trainings of trainer found'
  })
  @UseGuards(CheckAuthGuard, CheckAdminRoleGuard)
  @Get('/trainer')
  public async indexTrainingsByTrainer(@Query() query: TrainingQuery, @Req() { user: payload }: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}/trainer/${payload.sub}`, {params: query});
    return data;
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'training found'
  })
  @Get('/:trainingId')
  public async showTask(@Param('trainingId') trainingId: number, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}/${trainingId}`);
    console.log(data.trainerId.toString())

    const user = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${data.trainerId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    })).data;
    return fillObject(TrainingRdo, {...data, user: user});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The training has been updated.'
  })
  @UseGuards(CheckAuthGuard, CheckAdminRoleGuard)
  @Patch('/:trainingId')
  public async update(@Param('trainingId') trainingId: number, @Body() UpdateTrainingDto: UpdateTrainingDto, @Req() { user: payload }: RequestWithTokenPayload, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Training}/${trainingId}`, UpdateTrainingDto);

    if (data.trainerId !== payload.sub) {
      throw new ForbiddenException(UserError.UpdateTraining);
    }

    const user = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${data.trainerId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    })).data;

    return fillObject(TrainingRdo, {...data, user: user});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All trainings found'
  })
  @UseGuards(CheckAuthGuard)
  @Get('/')
  public async indexTrainings(@Query() query: TrainingQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}`, {params: query});
    return data;
  }

}