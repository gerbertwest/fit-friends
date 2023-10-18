import { Document } from 'mongoose';
import { User, UserLevel, UserLocation, UserRole, UserSex } from "@fit-friends/shared/app-types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  collection: 'users',
  timestamps: true,
})

export class UserModel extends Document implements User {
  @Prop({
    required: true,
  })
  public name: string;

  @Prop()
  public avatar: string;

  @Prop()
  public dateBirth: Date;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserSex,
    default: UserSex.another,
  })
  public sex: UserSex;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role: UserRole;

  @Prop()
  public description: string;

  @Prop({
    required: true,
    type: String,
    enum: UserLocation,
    default: UserLocation.subway1,
  })
  public location: UserLocation;

  @Prop()
  public backgroundImage: string;

  @Prop({
    type: String,
    enum: UserLevel,
    //default: UserLevel.amateur,
  })
  public level?: UserLevel;

  @Prop()
  public trainingType?: string[];

  @Prop()
  public trainingTime?: string;

  @Prop()
  public caloriesToLose?: number;

  @Prop()
  public caloriesToBurn?: number;

  @Prop()
  public readyToTraining?: boolean;

  @Prop()
  public certificates?: string;

  @Prop()
  public merits?: string;

  @Prop()
  public personalTrainings?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
