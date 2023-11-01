import { Request } from "@fit-friends/shared/app-types";
import { CRUDRepository } from "@fit-friends/util/util-types";
import { Injectable } from "@nestjs/common";
import { RequestEntity } from "./request.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RequestModel } from "./request.model";

@Injectable()
export class RequestRepository implements CRUDRepository<RequestEntity, string, Request> {
  constructor(
    @InjectModel(RequestModel.name) private readonly requestModel: Model<RequestModel>
  ) {}

  public async create(item: RequestEntity): Promise<Request> {
    const newAlert = new this.requestModel(item);
    return newAlert.save();
  }

  public async destroy(id: string): Promise<void> {
    this.requestModel
      .deleteOne({ _id: id })
      .exec();
  }

  public async findById(id: string): Promise<Request | null> {
    return this.requestModel
      .findOne({ _id: id })
      .exec();
  }

  public async update(id: string, item: RequestEntity): Promise<Request> {
    return this.requestModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}
