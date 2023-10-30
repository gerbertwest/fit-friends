import 'module-alias/register'

import { Document } from 'mongoose';
import { User, UserLevel, UserLocation, UserRole, UserSex, trainingTime, trainingsType } from "@fit-friends/shared/app-types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Factory } from "nestjs-seeder";

@Schema({
  collection: 'users',
  timestamps: true,
})

export class UserModel extends Document implements User {
  @Factory((faker) => faker.person.fullName())
  @Prop({
    required: true,
  })
  public name: string;

  @Factory((faker) => faker.image.avatar())
  @Prop()
  public avatar: string;

  @Factory((faker) => faker.date.birthdate())
  @Prop()
  public dateBirth: Date;

  @Factory((faker) => faker.internet.email())
  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Factory('$2b$10$XwPIpWdHflUcwQtMZ3duV.YLvqMDdQGVEgahI8myP6eLp9hGKF49m')
  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Factory((faker) => faker.helpers.enumValue(UserSex))
  @Prop({
    required: true,
    type: String,
    enum: UserSex,
    default: UserSex.another,
  })
  public sex: UserSex;

  @Factory((faker) => faker.helpers.enumValue(UserRole))
  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role: UserRole;

  @Factory('описание 1')
  @Prop()
  public description: string;

  @Factory((faker) => faker.helpers.enumValue(UserLocation))
  @Prop({
    required: true,
    type: String,
    enum: UserLocation,
    default: UserLocation.subway1,
  })
  public location: UserLocation;

  @Factory((faker) => faker.image.avatar())
  @Prop()
  public backgroundImage: string;

  @Factory((faker) => faker.helpers.enumValue(UserLevel))
  @Prop({
    type: String,
    enum: UserLevel,
  })
  public level?: UserLevel;

  @Factory((faker) => faker.helpers.arrayElement(trainingsType))
  @Prop()
  public trainingType?: string[];

  @Factory((faker) => faker.helpers.arrayElement(trainingTime))
  @Prop()
  public trainingTime?: string;

  @Factory(1000)
  @Prop()
  public caloriesToLose?: number;

  @Factory(1000)
  @Prop()
  public caloriesToBurn?: number;

  @Factory((faker) => faker.helpers.arrayElement([true, false]))
  @Prop()
  public readyToTraining?: boolean;

  @Factory('example.pdf')
  @Prop()
  public certificates?: string;

  @Factory('Заслуга 11111')
  @Prop()
  public merits?: string;

  @Factory((faker) => faker.helpers.arrayElement([true, false]))
  @Prop()
  public personalTrainings?: boolean;

  @Prop()
  public friends?: string[]

  @Prop()
  public subscriptions?: string[]
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
