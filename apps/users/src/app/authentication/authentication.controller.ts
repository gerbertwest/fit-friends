import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { fillObject } from '@fit-friends/util/util-core';
//import { LoggedUserRdo } from './rdo/logged-user.rdo';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,

  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  // @ApiResponse({
  //   type: LoggedUserRdo,
  //   status: HttpStatus.OK,
  //   description: 'User has been successfully logged.'
  // })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   description: 'Password or Login is wrong.',
  // })
  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // public async login(@Req() { user }: RequestWithUser) {
  //   return this.authService.createUserToken(user);
  // }

}
