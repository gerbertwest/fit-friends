import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder, DataFactory } from "nestjs-seeder";
import { UserModel } from "../user/user.model";

const USERS_COUNT = 10;

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const users = DataFactory.createForClass(UserModel).generate(USERS_COUNT);

    // Insert into the database.
    return this.userModel.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.userModel.deleteMany({});
  }
}
