import {UserLevel, UserLocation, UserRole, UserSex} from './users.enum';

export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar: string;
  passwordHash: string;
  sex: UserSex;
  dateBirth?: Date;
  role: UserRole;
  description: string;
  location: UserLocation;
  backgroundImage?: string;

  level?: UserLevel;
  trainingType?: string[];
  trainingTime?: string;
  caloriesToLose?: number;
  caloriesToBurn?: number;
  readyToTraining?: boolean;

  certificates?: string[];
  merits?: string;
  personalTrainings?: boolean;

  friends?: string[];

  subscriptions?: string[]
}
