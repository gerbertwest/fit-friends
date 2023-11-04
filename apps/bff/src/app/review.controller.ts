import { HttpService } from "@nestjs/axios";
import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { CheckUserRoleGuard } from "./guards/check-user-role.guard";
import { UseridInterceptor } from "./interceptors/userid.interceptor";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ApplicationServiceURL } from "./app.config";
import { fillObject } from "@fit-friends/util/util-core";
import { ReviewRdo } from "./rdo/review.rdo";
import { TrainingQuery } from "./query/training.query";

@ApiTags('Review')
@Controller('review')
@UseFilters(AxiosExceptionFilter)
export class ReviewController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.'
  })
  @UseGuards(CheckAuthGuard, CheckUserRoleGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateReviewDto, @Req() req: Request) {
    const user = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${dto.userId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
      })).data
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Review}/`, dto);
    return fillObject(ReviewRdo, {...data, user: user});
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'reviews of trainings found'
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Get('/:trainingId')
  public async showRewievsByTrainer(@Param('trainingId') trainingId: number, @Query() query: TrainingQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Review}/${trainingId}`, {params: query});
    return data;
  }


}
