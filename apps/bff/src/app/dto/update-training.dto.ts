import { UserLevel } from "@fit-friends/shared/app-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateTrainingDto {
  @ApiProperty({
    description: 'Training title',
    example: 'Training',
  })
  @IsOptional()
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
  public level: UserLevel;

  @ApiProperty({
    description: 'training type',
    example: ['йога', 'бег'],
  })
  @IsOptional()
  public trainingType: string;

  @ApiProperty({
    description: 'training time',
    example: '10-30 мин',
  })
  @IsOptional()
  public trainingTime: string;

  @ApiProperty({
    description: 'training price',
    example: 1000,
  })
  @IsOptional()
  public price: number;

  @ApiProperty({
    description: 'calories to lose',
    example: 1000,
  })
  @IsOptional()
  public caloriesCount: number;

  @ApiProperty({
    description: 'Training description',
    example: 'description',
  })
  @IsOptional()
  public description: string;

  @ApiProperty({
    description: 'Sex',
    example: 'для женщин'
  })
  @IsOptional()
  public sex: string;

  @ApiProperty({
    description: 'Training video',
    example: 'example.mpg'
  })
  @IsOptional()
  public video: string;

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
  public special: boolean;
}
