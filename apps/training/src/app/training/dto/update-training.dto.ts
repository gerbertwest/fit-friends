import { UserLevel, trainingsType, trainingTime, TrainingUserSex } from "@fit-friends/shared/app-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { AuthUserError, Length } from "../training.constant";

export class UpdateTrainingDto {
  @ApiProperty({
    description: 'Training title',
    example: 'Training',
  })
  @IsOptional()
  @IsString()
  @MinLength(Length.MinTitle, {message: AuthUserError.MinTitleLength})
  @MaxLength(Length.MaxTitle, {message: AuthUserError.MaxTitleLength})
  public title: string;

  @ApiProperty({
    description: 'Training background Image',
    example: 'example.jpg'
  })
  @IsOptional()
  public backgroundImage: string;

  @ApiProperty({
    description: 'User level',
    example: 'новичок',
  })
  @IsOptional()
  @IsEnum(UserLevel)
  public level: string;

  @ApiProperty({
    description: 'training type',
    example: ['йога', 'бег'],
  })
  @IsOptional()
  @IsIn(trainingsType, {
    each: true,
  })
  public trainingType: string;

  @ApiProperty({
    description: 'training time',
    example: '10-30 мин',
  })
  @IsOptional()
  @IsIn(trainingTime)
  public trainingTime: string;

  @ApiProperty({
    description: 'training price',
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(Length.MinPrice, {message: AuthUserError.MinPrice})
  public price: number;

  @ApiProperty({
    description: 'calories to lose',
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(Length.MinCalories, {message: AuthUserError.MinCalories})
  @Max(Length.MaxCalories, {message: AuthUserError.MaxCalories})
  public caloriesCount: number;

  @ApiProperty({
    description: 'Training description',
    example: 'description',
  })
  @IsOptional()
  @IsString()
  @MinLength(Length.MinDescriprion, {message: AuthUserError.MinDescriprionLength})
  @MaxLength(Length.MaxDescription, {message: AuthUserError.MaxDescriprionLength})
  public description: string;

  @ApiProperty({
    description: 'Sex',
    example: 'для женщин'
  })
  @IsOptional()
  @IsEnum(TrainingUserSex, { message: AuthUserError.SexNotValid })
  public sex: string;

  @ApiProperty({
    description: 'Training video',
    example: 'example.mpg'
  })
  @IsOptional()
  public video: string;


  // @IsOptional()
  // public raiting: number;

  @ApiProperty({
    description: 'Trainer id',
    example: '1',
  })
  @IsOptional()
  public trainerId: string;

  @ApiProperty({
    description: 'Special offer sign',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  public special: boolean;
}
