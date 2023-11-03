import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ReviewRdo {
  @ApiProperty({
    description: 'The uniq review ID',
    example: '1'
  })
  @Expose()
  public reviewId?: number;

  @ApiProperty({
    description: 'Training id',
    example: 1,
  })
  @Expose()
  public trainingId?: number;

  @ApiProperty({
    description: 'Review message',
    example: 'Review',
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Trainer id',
    example: '1',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'training rating',
    example: 2,
  })
  @Expose()
  public raiting: number;

  @ApiProperty({
    description: 'Training create date',
    example: "2023-09-03T19:43:02.250Z",
  })
  @Expose({ name: 'createdAt' })
  public createDate: Date;
}
