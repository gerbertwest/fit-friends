import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { AuthUserError } from './authentication.constant';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '@fit-friends/shared/app-types';
import { jwtConfig } from '@fit-friends/config/config-users';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { createJWTPayload } from '@fit-friends/util/util-core';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as crypto from 'node:crypto';


@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  //////

  public async register(dto: CreateUserDto) {
    const {email, name, password, dateBirth, role, sex,
      description, location} = dto;

    const user = {
      email, name, role, dateBirth, sex, description, location, certificates: [],
      avatar: '', passwordHash: '', backgroundImage: '',
    };

    const existUser = await this.userRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUserError.Exists);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password)

    return this.userRepository
      .create(userEntity);
  }

  /////

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUserError.NotFound);
    }

    const userEntity = new UserEntity(existUser);
    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthUserError.PasswordWrong);
    }

    return userEntity.toObject();
  }

  //////

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  //////

  public async updateUser(id: string, dto: UpdateUserDto) {
    return this.userRepository
      .update(id, dto)
  }

  //////

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }

  //////

  public async deleteUserTokens(userId: string) {
    return this.refreshTokenService.deleteUserRefreshSessions(userId);
  }

}
