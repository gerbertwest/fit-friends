import { Order, Review } from "@fit-friends/shared/app-types";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class TrainingRdo {
  @ApiProperty({
    description: 'The uniq training ID',
    example: '1'
  })
  @Expose()
  public id?: number;

  @ApiProperty({
    description: 'Training title',
    example: 'Training',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Training background Image',
    example: 'example.jpg'
  })
  @Expose()
  public backgroundImage: string;

  @ApiProperty({
    description: 'User level',
    example: 'новичок',
  })
  @Expose()
  public level: string;

  @ApiProperty({
    description: 'training type',
    example: ['йога', 'бег'],
  })
  @Expose()
  public trainingType: string;

  @ApiProperty({
    description: 'training time',
    example: '10-30 мин',
  })
  @Expose()
  public trainingTime: string;

  @ApiProperty({
    description: 'training price',
    example: 1000,
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'calories to lose',
    example: 1000,
  })
  @Expose()
  public caloriesCount: number;

  @ApiProperty({
    description: 'Training description',
    example: 'description',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Sex',
    example: 'для женщин'
  })
  @Expose()
  public sex: string;

  @ApiProperty({
    description: 'Training video',
    example: 'example.mpg'
  })
  @Expose()
  public video: string;

  @ApiProperty({
    description: 'Training raiting',
    example: 2
  })
  @Expose()
  public raiting: number;

  @ApiProperty({
    description: 'Trainer id',
    example: '1',
  })
  @Expose()
  public trainerId: string;

  @ApiProperty({
    description: 'Special offer sign',
    example: true,
  })
  @Expose()
  public special: boolean;

  @ApiProperty({
    description: 'Training create date',
    example: "2023-09-03T19:43:02.250Z",
  })
  @Expose({ name: 'createdAt' })
  public createDate: Date;

  @Expose()
  public orders?: Order[];
  @Expose()
  public reviews?: Review[];
}
