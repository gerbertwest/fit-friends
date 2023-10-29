import { Injectable } from "@nestjs/common";
import { MailModel } from "./mail.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { MailEntity } from "./mail.entity";
import { Mail } from "@fit-friends/shared/app-types";

@Injectable()
export class MailRepository {
  constructor(
    @InjectModel(MailModel.name) private readonly mailModel: Model<MailModel>
  ) {}

  public async create(item: MailEntity): Promise<Mail> {
    const mail = new this.mailModel(item);
    return mail.save();
  }

  public async findByEmail(email: string): Promise<Mail[] | null> {
    return this.mailModel
      .find({ email: email})
      .sort({createdAt: -1})
      .exec();
  }
}
