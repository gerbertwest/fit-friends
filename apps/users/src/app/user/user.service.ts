import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "@fit-friends/shared/app-types";
import { UserQuery } from "./query/user.query";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

public async getUsers(query: UserQuery): Promise<User[]> {
  return this.userRepository.find(query)
}

}
