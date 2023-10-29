import { Body, Controller, Get, HttpStatus, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { HttpService } from "@nestjs/axios";
import { CreateOrderDto } from "./dto/create-order.dto";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { UseridInterceptor } from "./interceptors/userid.interceptor";
import { ApplicationServiceURL } from "./app.config";
import { fillObject } from "@fit-friends/util/util-core";
import { OrderRdo } from "./rdo/order.rdo";
import { CheckUserRoleGuard } from "./guards/check-user-role.guard";
import { CheckAdminRoleGuard } from "./guards/check-admin-role.guard";
import { TrainingQuery } from "./query/training.query";
import { RequestWithTokenPayload } from "@fit-friends/shared/app-types";

@ApiTags('Order')
@Controller('order')
@UseFilters(AxiosExceptionFilter)
export class OrderController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new order has been successfully created.'
  })
  @UseGuards(CheckAuthGuard, CheckUserRoleGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateOrderDto, @Req() req: Request) {
    const user = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${dto.userId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
      })).data
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Order}/`, dto);
    return fillObject(OrderRdo, {...data, user: user});
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All orders of trainer found'
  })
  @UseGuards(CheckAuthGuard, CheckAdminRoleGuard)
  @Get('/trainer')
  public async indexTrainingsByTrainer(@Query() query: TrainingQuery, @Req() { user: payload }: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Order}/trainer/${payload.sub}`, {params: query});
    return data;
  }

    ///////

    @ApiResponse({
      status: HttpStatus.OK,
      description: 'All orders of user found'
    })
    @UseGuards(CheckAuthGuard, CheckUserRoleGuard)
    @Get('/user')
    public async indexTrainingsByUser(@Query() query: TrainingQuery, @Req() { user: payload }: RequestWithTokenPayload) {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Order}/user/${payload.sub}`, {params: query});
      return data;
    }

}
