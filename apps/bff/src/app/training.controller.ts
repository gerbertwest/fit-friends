import { BadRequestException, Body, Controller, ForbiddenException, Get, HttpStatus, Param, Patch, Post, Query, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
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
import { FileInterceptor } from "@nestjs/platform-express";
import 'multer';
import FormData from 'form-data';

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

    const subscribers = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.User}/subscription/${dto.trainerId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
      })).data

    let subscriber = false;

    if (subscribers.length > 0) {
      subscriber = true
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Training}/`, {...dto, subscriber: subscriber});
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

    console.log(data)

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

  /////////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Training video has been updated'
  })
  @UseGuards(CheckAuthGuard, CheckAdminRoleGuard)
  @Post('video/:trainingId')
  @UseInterceptors(FileInterceptor('file'))
  public async certificateUpload(@UploadedFile() file: Express.Multer.File,
  @Req() req: Request, @Param('trainingId') trainingId: number) {

    if (file.mimetype !== 'video/x-msvideo' && file.mimetype !== 'application/mp4' && file.mimetype !== 'video/quicktime') {
      throw new BadRequestException(UserError.FileFormat);
    }

    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });
    const headers = {
      ...formData.getHeaders(),
      'Content-Length': formData.getLengthSync(),
    };

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Upload}/upload`, formData, { headers });

    await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Training}/${trainingId}`, {video: data.path}, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });

    return data;
  }

}
