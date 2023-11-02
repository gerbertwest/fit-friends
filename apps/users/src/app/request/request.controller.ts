import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { NotifyService } from "../notify/notify.service";
import { RequestService } from "./request.servise";
import { CreateRequestDto } from "./dto/create-request.dto";
import { fillObject } from "@fit-friends/util/util-core";
import { RequestRdo } from "./rdo/request.rdo";
import { UpdateRequestDto } from "./dto/update-request.dto";

@ApiTags('request')
@Controller('request')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private readonly notifyService: NotifyService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new request has been successfully created.'
  })
  @Post('/')
  async create(@Body() dto: CreateRequestDto) {
    const newRequest = await this.requestService.addRequest(dto);
    await this.notifyService.registerSubscriber({title: `Пользователь ${dto.initiatorId} пригласил Вас на тренировку`, userId: dto.userId})
    return fillObject(RequestRdo, newRequest);
  }

  @ApiResponse({
    type: RequestRdo,
    status: HttpStatus.OK,
    description: 'Training has been updeted.'
  })
  @Patch('/:id')
  async changeRequestStatus(@Param('id') id: string, @Body() dto: UpdateRequestDto) {
    const updateRequest = await this.requestService.updateRequest(id, {...dto});
    return fillObject(RequestRdo, updateRequest)
  }

  @ApiResponse({
    type: RequestRdo,
    status: HttpStatus.OK,
    description: 'orders of treiner found'
  })
  @Get('/:id')
  async showOrdersByTrainer(@Param('id') userId: string) {
    const userRequests = await this.requestService.gerRequestsByUser(userId);
    return fillObject(RequestRdo, userRequests);
  }

}
