import { ApiProperty } from "@nestjs/swagger";
import { TrainingUserSex, UserLevel } from "@fit-friends/shared/app-types";

export class CreateTrainingDto {

  @ApiProperty({
    description: 'Training title',
    example: 'Training',
  })
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
  public level: UserLevel;

  @ApiProperty({
    description: 'training type',
    example: ['йога', 'бег'],
  })
  public trainingType: string;

  @ApiProperty({
    description: 'training time',
    example: '10-30 мин',
  })
  public trainingTime: string;

  @ApiProperty({
    description: 'training price',
    example: 1000,
  })
  public price: number;

  @ApiProperty({
    description: 'calories to lose',
    example: 1000,
  })
  public caloriesCount: number;

  @ApiProperty({
    description: 'Training description',
    example: 'description',
  })
  public description: string;

  @ApiProperty({
    description: 'Sex',
    example: 'для женщин'
  })
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
  public special: boolean;
}
