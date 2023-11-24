import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Query, Req, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserRdo } from "../authentication/rdo/user.rdo";
import { fillObject } from "@fit-friends/util/util-core";
import { UserQuery } from "./query/user.query";
import { UpdateUserDto } from "../authentication/dto/update-user.dto";
import { JwtAuthGuard } from "../authentication/guards/jwt-auth.guard";
import { RequestWithTokenPayload } from "@fit-friends/shared/app-types";
import { MongoidValidationPipe } from "@fit-friends/shared/shared-pipes";
import { NotifyService } from "../notify/notify.service";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly notifyService: NotifyService,
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'users found'
  })
  @Get('/')
  async index(@Query() query: UserQuery) {
    const users = await this.userService.getUsers(query);
    return fillObject(UserRdo, users);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'add friend'
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async addFriend(@Param('id', MongoidValidationPipe) friendId: string, @Body() dto: UpdateUserDto, @Req() { user: payload }: RequestWithTokenPayload) {
    const updateFriends = await this.userService.addFriend(payload.sub, {...dto}, friendId);
    await this.notifyService.registerSubscriber({title: `Пользователь ${payload.name} добавил Вас в друзья`, userId: friendId})
    return fillObject(UserRdo, updateFriends);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'delete friend'
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteFriend(@Param('id', MongoidValidationPipe) friendId: string, @Body() dto: UpdateUserDto, @Req() { user: payload }: RequestWithTokenPayload) {
    const updateFriends = await this.userService.deleteFriend(payload.sub, {...dto}, friendId);
    return fillObject(UserRdo, updateFriends);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'friends found'
  })
  @UseGuards(JwtAuthGuard)
  @Get('/friends')
  async getUserFriends(@Query() query: UserQuery, @Req() { user: payload }: RequestWithTokenPayload) {
    const userFriends = await this.userService.findUserFriends(payload.sub, query)
    return fillObject(UserRdo, userFriends);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'friends found'
  })
  @UseGuards(JwtAuthGuard)
  @Get('/trainer/friends')
  async getTrainerFriends(@Req() { user: payload }: RequestWithTokenPayload) {
    const trainerFriends = await this.userService.findTrainerFriends(payload.sub)
    return fillObject(UserRdo, trainerFriends);
  }

  ////////////////////////////

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'add subscription'
  })
  @UseGuards(JwtAuthGuard)
  @Patch('subscription/:id')
  async addSubscription(@Param('id', MongoidValidationPipe) trainerId: string, @Body() dto: UpdateUserDto, @Req() { user: payload }: RequestWithTokenPayload) {
    const updateSubscriptions = await this.userService.addSubscription(payload.sub, {...dto}, trainerId);
    return fillObject(UserRdo, updateSubscriptions);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'delete subscription'
  })
  @UseGuards(JwtAuthGuard)
  @Delete('subscription/:id')
  async deleteSubscription(@Param('id', MongoidValidationPipe) trainerId: string, @Body() dto: UpdateUserDto, @Req() { user: payload }: RequestWithTokenPayload) {
    const updateSubscriptions = await this.userService.deleteSubscription(payload.sub, {...dto}, trainerId);
    return fillObject(UserRdo, updateSubscriptions);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'subscriptions found'
  })
  @UseGuards(JwtAuthGuard)
  @Get('/subscriptions')
  async getSubscriptions(@Req() { user: payload }: RequestWithTokenPayload) {
    const userSubscriptions = await this.userService.findUserSubscriptions(payload.sub)
    return fillObject(UserRdo, userSubscriptions);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'subscription found'
  })
  @UseGuards(JwtAuthGuard)
  @Get('subscription/:id')
  async getSubscription(@Param('id', MongoidValidationPipe) trainerId: string) {
    const userSubscription = await this.userService.findUserSubscription(trainerId);
    return fillObject(UserRdo, userSubscription);
  }

}
