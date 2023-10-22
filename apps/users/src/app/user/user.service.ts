import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "@fit-friends/shared/app-types";
import { UserQuery } from "./query/user.query";
import { UpdateUserDto } from "../authentication/dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

public async getUsers(query: UserQuery): Promise<User[]> {
  return this.userRepository.find(query)
}

public async addFriend(userId: string, dto: UpdateUserDto, friendId: string): Promise<User> {
  const user = await this.userRepository.findById(userId);
  const userFriends = user.friends;
  console.log(userFriends)
  const index = userFriends.indexOf(friendId);

  if (index === -1) {
    userFriends.push(friendId);
  }

  return this.userRepository.update(userId, {...dto, friends: userFriends})
}

}