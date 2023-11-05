import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder, DataFactory } from "nestjs-seeder";
import { UserModel } from "../user/user.model";
import { UserSeedModel } from "./user.seed.model";
import { TrainerSeedModel } from "./trainer.seed.model";

const USERS_COUNT = 3;

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  async seed(): Promise<unknown> {
    const users = DataFactory.createForClass(UserSeedModel).generate(USERS_COUNT);
    const trainers = DataFactory.createForClass(TrainerSeedModel).generate(USERS_COUNT);
    const data = [...users, ...trainers]
    return data;
  }

  async drop(): Promise<unknown> {
    return this.userModel.deleteMany({});
  }
}
