import 'module-alias/register'

import { Document } from 'mongoose';
import { User, UserLevel, UserLocation, UserRole, UserSex, trainingsType } from "@fit-friends/shared/app-types";
import { Factory } from "nestjs-seeder";

export class TrainerSeedModel extends Document implements User {
  @Factory((faker) => faker.person.fullName())
  public name: string;

  @Factory((faker) => faker.image.avatar())
  public avatar: string;

  @Factory((faker) => faker.date.birthdate())
  public dateBirth: Date;

  @Factory((faker) => faker.internet.email())
  public email: string;

  @Factory('$2b$10$XwPIpWdHflUcwQtMZ3duV.YLvqMDdQGVEgahI8myP6eLp9hGKF49m')
  public passwordHash: string;

  @Factory((faker) => faker.helpers.enumValue(UserSex))
  public sex: UserSex;

  @Factory(UserRole.Admin)
  public role: UserRole;

  @Factory('описание 1')
  public description: string;

  @Factory((faker) => faker.helpers.enumValue(UserLocation))
  public location: UserLocation;

  @Factory((faker) => faker.image.avatar())
  public backgroundImage: string;

  @Factory((faker) => faker.helpers.enumValue(UserLevel))
  public level?: UserLevel;

  @Factory((faker) => faker.helpers.arrayElement(trainingsType))
  public trainingType?: string[];

  @Factory('example.pdf')
  public certificates?: string;

  @Factory('Заслуга 11111')
  public merits?: string;

  @Factory((faker) => faker.helpers.arrayElement([true, false]))
  public personalTrainings?: boolean;
}

