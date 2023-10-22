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

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
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
    description: 'delete friend'
  })
  @UseGuards(JwtAuthGuard)
  @Get('/friends')
  async getUserFriends(@Req() { user: payload }: RequestWithTokenPayload) {
    const userFriends = await this.userService.findUserFriends(payload.sub)
    return fillObject(UserRdo, userFriends);
  }

}
