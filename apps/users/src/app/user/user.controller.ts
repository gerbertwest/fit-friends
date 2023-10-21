import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserRdo } from "../authentication/rdo/user.rdo";
import { fillObject } from "@fit-friends/util/util-core";
import { UserQuery } from "./query/user.query";

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
}
