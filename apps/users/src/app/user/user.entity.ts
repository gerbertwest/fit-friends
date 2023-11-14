import { User, UserLevel, UserLocation, UserRole, UserSex } from '@fit-friends/shared/app-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements User {
  public _id: string;
  public name: string;
  public avatar: string;
  public dateBirth: Date;
  public email: string;
  public passwordHash: string;
  public sex: UserSex;
  public role: UserRole;
  public description: string;
  public location: UserLocation;
  public backgroundImage?: string;
  public level?: UserLevel;
  public trainingType?: string[];
  public trainingTime?: string;
  public caloriesToLose?: number;
  public caloriesToBurn?: number;
  public readyToTraining?: boolean;
  public certificates?: string[];
  public merits?: string;
  public personalTrainings?: boolean;


  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      dateBirth: this.dateBirth,
      avatar: this.avatar,
      passwordHash: this.passwordHash,
      role: this.role,
      sex: this.sex,
      description: this.description,
      location: this.location,
      backgroundImage: this.backgroundImage,
      level: this.level,
      trainingType: this.trainingType,
      trainingTime: this.trainingTime,
      caloriesToLose: this.caloriesToLose,
      caloriesToBurn: this.caloriesToBurn,
      readyToTraining: this.readyToTraining,
      certificates: this.certificates,
      merits: this.merits,
      personalTrainings: this.personalTrainings
    };
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.avatar = user.avatar;
    this.dateBirth = user.dateBirth;
    this.email = user.email;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.sex = user.sex;
    this.description = user.description;
    this.location = user.location;
    this.backgroundImage = user.backgroundImage;
    this.level = user.level;
    this.trainingType = user.trainingType;
    this.trainingTime = user.trainingTime;
    this.caloriesToLose = user.caloriesToLose;
    this.caloriesToBurn = user.caloriesToBurn;
    this.readyToTraining = user.readyToTraining;
    this.certificates = user.certificates;
    this.merits = user.merits;
    this.personalTrainings = user.personalTrainings;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

}
