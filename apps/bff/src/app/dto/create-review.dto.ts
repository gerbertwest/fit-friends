import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {

  @ApiProperty({
    description: 'Training id',
    example: 1,
  })
  public trainingId: number;

  @ApiProperty({
    description: 'Review message',
    example: 'Review',
  })
  public message: string;
  public userId: string;

  @ApiProperty({
    description: 'training rating',
    example: 2,
  })
  public raiting: number;
  public createdAt: Date;
}
