import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsIn, IsInt, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { TrainingError, Length } from "../training.constant";
import { TrainingUserSex, UserLevel, trainingTime, trainingsType } from "@fit-friends/shared/app-types";

export class CreateTrainingDto {

  @ApiProperty({
    description: 'Training title',
    example: 'Training',
  })
  @IsString()
  @MinLength(Length.MinTitle, {message: TrainingError.MinTitleLength})
  @MaxLength(Length.MaxTitle, {message: TrainingError.MaxTitleLength})
  public title: string;

  @ApiProperty({
    description: 'Training background Image',
    example: 'example.jpg'
  })
  public backgroundImage: string;

  @ApiProperty({
    description: 'User level',
    example: 'новичок',
  })
  @IsEnum(UserLevel)
  public level: UserLevel;

  @ApiProperty({
    description: 'training type',
    example: 'йога',
  })
  @IsIn(trainingsType, {
    each: true,
  })
  public trainingType: string;

  @ApiProperty({
    description: 'training time',
    example: '10-30 мин',
  })
  @IsIn(trainingTime)
  public trainingTime: string;

  @ApiProperty({
    description: 'training price',
    example: 1000,
  })
  @IsNumber()
  @IsInt()
  @Min(Length.MinPrice, {message: TrainingError.MinPrice})
  public price: number;

  @ApiProperty({
    description: 'calories to lose',
    example: 1000,
  })
  @IsNumber()
  @IsInt()
  @Min(Length.MinCalories, {message: TrainingError.MinCalories})
  @Max(Length.MaxCalories, {message: TrainingError.MaxCalories})
  public caloriesCount: number;

  @ApiProperty({
    description: 'Training description',
    example: 'description',
  })
  @IsString()
  @MinLength(Length.MinDescriprion, {message: TrainingError.MinDescriprionLength})
  @MaxLength(Length.MaxDescription, {message: TrainingError.MaxDescriprionLength})
  public description: string;

  @ApiProperty({
    description: 'Sex',
    example: 'для женщин'
  })
  @IsEnum(TrainingUserSex, { message: TrainingError.SexNotValid })
  public sex: TrainingUserSex;

  @ApiProperty({
    description: 'Training video',
    example: 'example.mpg'
  })
  public video: string;

  @ApiProperty({
    description: 'Trainer id',
    example: '1',
  })
  public trainerId: string;

  @ApiProperty({
    description: 'Special offer sign',
    example: true,
  })
  @IsBoolean()
  public special: boolean;

  @IsBoolean()
  public subscriber: boolean;
}
