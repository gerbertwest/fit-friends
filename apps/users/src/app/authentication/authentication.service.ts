import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { AuthUserError } from './authentication.constant';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, name, password, dateBirth, role, sex, description, location,  level, trainingType} = dto;

    const user = {
      email, name, role, dateBirth, sex, description, location, level, trainingType,
      avatar: '', passwordHash: ''
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

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUserError.NotFound);
    }

    const taskUserEntity = new UserEntity(existUser);
    if (!await taskUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthUserError.PasswordWrong);
    }

    return taskUserEntity.toObject();
  }


}
