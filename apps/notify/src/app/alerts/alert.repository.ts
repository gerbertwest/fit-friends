import { Alert } from "@fit-friends/shared/app-types";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ALertModel } from "./alert.model";
import { CRUDRepository } from "@fit-friends/util/util-types";
import { AlertEntity } from "./alert.entity";
import { Model } from "mongoose";

@Injectable()
export class AlertRepository implements CRUDRepository<AlertEntity, string, Alert> {
  constructor(
    @InjectModel(ALertModel.name) private readonly alertModel: Model<ALertModel>
  ) {}

  public async create(item: AlertEntity): Promise<Alert> {
    const newAlert = new this.alertModel(item);
    return newAlert.save();
  }

  public async destroy(id: string): Promise<void> {
    this.alertModel
      .deleteOne({ _id: id })
      .exec();
  }

  public async findById(id: string): Promise<Alert | null> {
    return this.alertModel
      .findOne({ _id: id })
      .exec();
  }

  public async findByTitleAndUser(title: string, userId: string): Promise<Alert | null> {
    return this.alertModel
      .findOne({ title: title, userId: userId })
      .exec()
  }

  public async update(id: string, item: AlertEntity): Promise<Alert> {
    return this.alertModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async find(userId: string): Promise<Alert[] | null> {
    return this.alertModel
      .find({
        userId: userId
      })
      .exec();
  }
}
