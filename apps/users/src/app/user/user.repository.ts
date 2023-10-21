import { User } from "@fit-friends/shared/app-types";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserEntity } from "./user.entity";
import { UserModel } from "./user.model";
import { CRUDRepository } from "@fit-friends/util/util-types";
import { UpdateUserDto } from "../authentication/dto/update-user.dto";
import { UserQuery } from "./query/user.query";

@Injectable()
export class UserRepository implements CRUDRepository<UserEntity | UpdateUserDto, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly taskUserModel: Model<UserModel>) {
  }

  public async create(item: UserEntity): Promise<User> {
    const newTaskUser = new this.taskUserModel(item);
    return newTaskUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.taskUserModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.taskUserModel
      .findOne({ _id: id })
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.taskUserModel
      .findOne({ email })
      .exec();
  }

  public async update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.taskUserModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  public async find({limit, location, level, trainingType, sortDirection, page}: UserQuery): Promise<User[] | null> {
    return this.taskUserModel
      .find({location: {$in: location}, level:level, trainingType: {$in: trainingType}})
      .sort({role: sortDirection})
      .limit(page > 0 ? limit*page : limit)
      .exec();
  }
}
