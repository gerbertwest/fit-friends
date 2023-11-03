import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { NotifyService } from "../notify/notify.service";
import { RequestService } from "./request.servise";
import { fillObject } from "@fit-friends/util/util-core";
import { RequestRdo } from "./rdo/request.rdo";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { JwtAuthGuard } from "../authentication/guards/jwt-auth.guard";
import { RequestWithTokenPayload, UserRequest, UserRole } from "@fit-friends/shared/app-types";
import { AuthenticationService } from "../authentication/authentication.service";
import { MongoidValidationPipe } from "@fit-friends/shared/shared-pipes";
import { RequestError } from "./request.constant";

@ApiTags('request')
@Controller('request')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private readonly notifyService: NotifyService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new request has been successfully created.'
  })
  @UseGuards(JwtAuthGuard)
  @Post('/:userId')
  async create(@Param('userId', MongoidValidationPipe) userId: string, @Req() { user: payload }: RequestWithTokenPayload) {
    const newRequest = await this.requestService.addRequest({userId: userId, initiatorId: payload.sub});
    const user = await this.authenticationService.getUser(userId);

    if (user.role === UserRole.User && user.readyToTraining !== true) {
      throw new BadRequestException(RequestError.ReadyToTraining);
    }
    else if (user.role === UserRole.Admin && user.personalTrainings !== true) {
      throw new BadRequestException(RequestError.ReadyToTraining);
    }

    const title = user.role === UserRole.User ? `Пользователь ${payload.name} пригласил Вас на совмествую тренировку` : `Пользователь ${payload.name} оставил заявку на персональную тренировку`
    await this.notifyService.registerSubscriber({title: title, userId: userId})
    return fillObject(RequestRdo, newRequest);
  }

  @ApiResponse({
    type: RequestRdo,
    status: HttpStatus.OK,
    description: 'The request has been updeted.'
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async changeRequestStatus(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateRequestDto, @Req() { user: payload }: RequestWithTokenPayload) {
    const request = await this.requestService.getRequest(id)
    const title = dto.status === UserRequest.accepted ? `Пользователь ${payload.name} принял Вашу заявку` : `Пользователь ${payload.name} отклонил Вашу заявку`
    await this.notifyService.registerSubscriber({title: title, userId: request.initiatorId})
    const updateRequest = await this.requestService.updateRequest(id, {...dto});
    return fillObject(RequestRdo, updateRequest)
  }

  @ApiResponse({
    type: RequestRdo,
    status: HttpStatus.OK,
    description: 'requests of user found'
  })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async showRequestsByUser(@Param('id', MongoidValidationPipe) userId: string) {
    const userRequests = await this.requestService.gerRequestsByUser(userId);
    return fillObject(RequestRdo, userRequests);
  }

}
