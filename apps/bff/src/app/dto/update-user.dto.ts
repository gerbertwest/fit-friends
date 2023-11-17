import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { Transform } from "class-transformer";
import { UserLevel, UserLocation, UserRole, UserSex } from "@fit-friends/shared/app-types";

export class UpdateUserDto {

// общие для всех ролей поля

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
  @IsOptional()
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'Sex',
    example: 'Мужской'
  })
  @IsOptional()
  @IsEnum(UserSex)
  public sex: UserSex;

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
  @IsOptional()
  @IsString()
  public description: string;

  @ApiProperty({
    description: 'Subway',
    example: 'Пионерская'
  })
  @IsOptional()
  @IsEnum(UserLocation)
  public location: UserLocation;

  @ApiProperty({
    description: 'User background Image',
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
  public level: UserLevel;

  @ApiProperty({
    description: 'training type',
    example: ['йога', 'бег'],
  })
  @IsOptional()
  public trainingType: string[];

  // поля для роли Пользователь

  @ApiProperty({
    description: 'training time',
    example: '10-30 мин',
  })
  @IsOptional()
  @ValidateIf(o => o.role === UserRole.User)
  public trainingTime?: string;

  @ApiProperty({
    description: 'calories to lose',
    example: 1000,
  })
  @IsOptional()
  @ValidateIf(o => o.role === UserRole.User)
  @IsNumber()
  @IsInt()
  public caloriesToLose?: number;

  @ApiProperty({
    description: 'calories to burn per day',
    example: 1000,
  })
  @IsOptional()
  @ValidateIf(o => o.role === UserRole.User)
  @IsNumber()
  @IsInt()
  public caloriesToBurn?: number;

  @ApiProperty({
    description: 'ready to training',
    example: true,
  })
  @IsOptional()
  @ValidateIf(o => o.role === UserRole.User)
  @IsBoolean()
  public readyToTraining?: boolean;

  @IsOptional()
  @ValidateIf(o => o.role === UserRole.User)
  public friends?: string[];

  // поля для роли Тренер

  @ApiProperty({
    description: 'certificates',
    example: ['example.pdf']
  })
  @IsOptional()
  @ValidateIf(o => o.role === UserRole.Admin)
  public certificates?: string[];

  @ApiProperty({
    description: 'merits of treiner',
    example: 'merit',
  })
  @IsOptional()
  @ValidateIf(o => o.role === UserRole.Admin)
  @IsString()
  public merits?: string;

  @ApiProperty({
    description: 'ready to personal training',
    example: true,
  })
  @IsOptional()
  @ValidateIf(o => o.role === UserRole.Admin)
  @IsBoolean()
  public personalTrainings?: boolean;

  @IsOptional()
  @ValidateIf(o => o.role === UserRole.Admin)
  public certificate: string

}
