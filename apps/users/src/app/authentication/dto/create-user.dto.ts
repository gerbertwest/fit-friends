import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsIn, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateIf } from "class-validator";
import { AuthUserError, Length } from "../authentication.constant";
//import dayjs from "dayjs";
import { Transform } from "class-transformer";
import { UserLevel, UserLocation, UserRole, UserSex, trainingTime, trainingsType } from "@fit-friends/shared/app-types";

export class CreateUserDto {

// общие для всех ролей поля

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthUserError.EmailNotValid })
    public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  public dateBirth: Date;

  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  @IsString()
  @MinLength(Length.MinName, {message: AuthUserError.MinNameLength})
  @MaxLength(Length.MaxName, {message: AuthUserError.MaxNameLength})
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @MinLength(Length.MinPassword, {message: AuthUserError.MinPasswordLength})
  @MaxLength(Length.MaxPassword, {message: AuthUserError.MaxPasswordLength})
  public password: string;

  @ApiProperty({
    description: 'Role',
    example: 'Исполнитель'
  })
  @IsEnum(UserRole, { message: AuthUserError.RoleNotValid })
  public role: UserRole;

  @ApiProperty({
    description: 'Sex',
    example: 'Мужской'
  })
  @IsEnum(UserSex, { message: AuthUserError.SexNotValid })
  public sex: UserSex;


  // @ApiProperty({
  //   description: 'Specialization',
  //   example: 'электрик'
  // })
  // @IsOptional()
  // @ArrayMaxSize(Length.MaxSpecializationArray, {message: AuthUserError.MaxSpecializationArrayLength})
  // public specialization?: string[];

  @ApiProperty({
    description: 'User avatar',
    example: 'example.jpg'
  })
  @IsOptional()
  public avatar?: string;

  @ApiProperty({
    description: 'User description',
    example: 'description',
  })
  @IsString()
  @MinLength(Length.MinName, {message: AuthUserError.MinNameLength})
  @MaxLength(Length.MaxName, {message: AuthUserError.MaxNameLength})
  public description: string;

  @ApiProperty({
    description: 'Subway',
    example: 'Пионерская'
  })
  @IsEnum(UserLocation)
  public location: UserLocation;

  @ApiProperty({
    description: 'User background Image',
    example: 'example.jpg'
  })
  @IsOptional()
  public backgroundImage: string;

  @IsEnum(UserLevel)
  public level: UserLevel;

  @IsIn(trainingsType, {
    each: true,
  })
  public trainingType: string[];

  // поля для роли Пользователь

  @ValidateIf(o => o.role === UserRole.User)
  @IsIn(trainingTime)
  public trainingTime?: string;

  @ValidateIf(o => o.role === UserRole.User)
  @IsNumber()
  @Min(Length.MinCalories, {message: AuthUserError.MinCalories})
  @Max(Length.MaxCalories, {message: AuthUserError.MaxCalories})
  public caloriesToLose?: number;

  @ValidateIf(o => o.role === UserRole.User)
  @IsNumber()
  @Min(Length.MinCalories, {message: AuthUserError.MinCalories})
  @Max(Length.MaxCalories, {message: AuthUserError.MaxCalories})
  public caloriesToBurn?: number;

  @ValidateIf(o => o.role === UserRole.User)
  @IsBoolean()
  public readyToTraining?: boolean;

  // поля для роли Тренер

  @ValidateIf(o => o.role === UserRole.Admin)
  public certificates?: string;

  @ValidateIf(o => o.role === UserRole.Admin)
  public merits?: string;

  @ValidateIf(o => o.role === UserRole.Admin)
  public personalTrainings?: boolean;

}
