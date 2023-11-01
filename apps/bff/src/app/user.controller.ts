import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { RequestWithTokenPayload } from '@fit-friends/shared/app-types';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQuery } from './query/user.query';
import { CheckUserRoleGuard } from './guards/check-user-role.guard';

@ApiTags('User')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto);
    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/register`, createUserDto);
    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User refresh tocken has been deleted.'
  })
  @Delete('/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroyTockens(@Param('userId') userId: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Auth}/${userId}`);
    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been updated.'
  })
  @UseGuards(CheckAuthGuard)
  @Patch('update')
  public async update(@Body() UpdateUserDto: UpdateUserDto, @Req() { user: payload }: RequestWithTokenPayload, @Req() req: Request) {

    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/update/${payload.sub}`, UpdateUserDto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user found.'
  })
  @UseGuards(CheckAuthGuard)
  @Get('/:userId')
  public async show(@Param('userId') userId: string, @Req() req: Request) {

    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${userId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All users found.'
  })
  @UseGuards(CheckAuthGuard, CheckUserRoleGuard)
  @Get('/')
  public async index(@Query() query: UserQuery, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.User}`, {params: query,
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The friends of user found.'
  })
  @UseGuards(CheckAuthGuard)
  @Post('friends')
  public async getUserFriends(@Query() query: UserQuery, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.User}/friends`, {params: query,
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'add friend'
  })
  @UseGuards(CheckAuthGuard, CheckUserRoleGuard)
  @Patch('/:userId')
  public async addFriend(@Param('userId') userId: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.User}/${userId}`, {}, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'delete friend'
  })
  @UseGuards(CheckAuthGuard, CheckUserRoleGuard)
  @Delete('/:userId')
  public async deleteFriend(@Param('userId') userId: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.User}/${userId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The email has been sended.'
  })
  @UseGuards(CheckAuthGuard, CheckUserRoleGuard)
  @Post('/email')
  public async sendEmail(@Body() dto, @Req() { user: payload }: RequestWithTokenPayload, @Req() req: Request) {

    const mails = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Email}/${payload.email}`)).data;

    let requestDate: Date;

    if (mails.length === 0) {
      requestDate = new Date()
    }
    else {requestDate = new Date(mails[0].createdAt)}

    const subscriptions = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.User}/subscriptions`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    })).data;

    const trainerNames = subscriptions.map((sub) => sub.name)
    const trainers = subscriptions.map((sub) => sub.id)

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Email}`, {email: payload.email, requestDate: requestDate, trainers: trainers, trainerNames: trainerNames})
    return data
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'add subscription'
  })
  @UseGuards(CheckAuthGuard, CheckUserRoleGuard)
  @Patch('subscriptions/:trainerId')
  public async addSubscription(@Param('trainerId') trainerId: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.User}/subscription/${trainerId}`, {}, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'delete subscription'
  })
  @UseGuards(CheckAuthGuard, CheckUserRoleGuard)
  @Delete('subscriptions/:trainerId')
  public async deleteSubscription(@Param('trainerId') trainerId: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.User}/subscription/${trainerId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All alerts by userId found'
  })
  @UseGuards(CheckAuthGuard)
  @Post('alerts')
  public async getAlerts(@Req() { user: payload }: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Alert}/${payload.sub}`)
    return data;
  }

  ///////

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Alert has been deleted.'
  })
  @UseGuards(CheckAuthGuard)
  @Delete('alerts/:id')
  public async deleteAlert(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Alert}/${id}`)
    return data;
  }

}
