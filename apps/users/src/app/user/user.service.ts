import { ForbiddenException, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "@fit-friends/shared/app-types";
import { UserQuery } from "./query/user.query";
import { UpdateUserDto } from "../authentication/dto/update-user.dto";
import { UsersSeeder } from "../seeder/users.seeder";
import { appConfig } from "@fit-friends/config/config-users";
import { ConfigType } from "@nestjs/config";
import { EXISTS_FRIEND } from "./user.constant";

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userSeeder: UsersSeeder,
    @Inject (appConfig.KEY) private readonly appOptions: ConfigType<typeof appConfig>,
  ) {}

public async onModuleInit() {
  const res = await this.userRepository.findAll();
  if (res.length === 0 && this.appOptions.environment === 'development') {
    const users = await this.userSeeder.seed()
    await this.userRepository.seed(users)
  }
}

public async getUsers(query: UserQuery): Promise<User[]> {
  return this.userRepository.find(query)
}

public async findUserFriends(userId: string, query: UserQuery) {
  const user = await this.userRepository.findById(userId);

  const userFriends = user.friends;
  return this.userRepository.findFriends(query, userFriends)
}

public async addFriend(userId: string, dto: UpdateUserDto, friendId: string): Promise<User> {
  const user = await this.userRepository.findById(userId);
  const userFriends = user.friends;
  const index = userFriends.indexOf(friendId);

  if (index === -1) {
    userFriends.push(friendId);
  }

  return this.userRepository.update(userId, {...dto, friends: userFriends})
}

public async deleteFriend(userId: string, dto: UpdateUserDto, friendId: string): Promise<User> {
  const user = await this.userRepository.findById(userId);
  const userFriends = user.friends;
  const index = userFriends.indexOf(friendId);

  if (index !== -1) {
    userFriends.splice(index, 1);
  }

  return this.userRepository.update(userId, {...dto, friends: userFriends})
}

public async existFriend (friendId: string, userId: string) {
  const user = await this.userRepository.findById(userId);
  const userFriends = user.friends;
  const index = userFriends.indexOf(friendId);

  if (index !== -1) {
    throw new ForbiddenException(EXISTS_FRIEND);
  }
  return null
}

public async addSubscription(userId: string, dto: UpdateUserDto, trainerId: string): Promise<User> {
  const user = await this.userRepository.findById(userId);
  const userSubscriptions = user.subscriptions;
  const index = userSubscriptions.indexOf(trainerId);

  if (index === -1) {
    userSubscriptions.push(trainerId);
  }

  return this.userRepository.update(userId, {...dto, subscriptions: userSubscriptions})
}

public async deleteSubscription(userId: string, dto: UpdateUserDto, trainerId: string): Promise<User> {
  const user = await this.userRepository.findById(userId);
  const userSubscriptions = user.subscriptions;
  const index = userSubscriptions.indexOf(trainerId);

  if (index !== -1) {
    userSubscriptions.splice(index, 1);
  }

  return this.userRepository.update(userId, {...dto, subscriptions: userSubscriptions})
}

public async findUserSubscriptions(userId: string): Promise<User[]> {
  const user = await this.userRepository.findById(userId);

  const userSubscriptions = user.subscriptions;

  return this.userRepository.findSubscriptions(userSubscriptions)
}

public async findUserSubscription(trainerId: string): Promise<User[]> {
  return this.userRepository.findSubscription(trainerId)
}

public async findTrainerFriends(trainerId: string, query: UserQuery): Promise<User[]> {
  return this.userRepository.findTrainerFriends(trainerId, query)
}

}
