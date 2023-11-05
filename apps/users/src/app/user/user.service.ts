import { Injectable, OnModuleInit } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "@fit-friends/shared/app-types";
import { UserQuery } from "./query/user.query";
import { UpdateUserDto } from "../authentication/dto/update-user.dto";
import { UsersSeeder } from "../seeder/users.seeder";

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userSeeder: UsersSeeder,
  ) {}

public async onModuleInit() {
  const res = await this.userRepository.findAll();
  if (res.length === 0) {
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

}
