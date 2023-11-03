import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { Length, ReviewError } from "../review.constant";

export class CreateReviewDto {

  @ApiProperty({
    description: 'Training id',
    example: 1,
  })
  @IsNumber()
  public trainingId: number;

  @ApiProperty({
    description: 'Review message',
    example: 'Review',
  })
  @IsString()
  @MinLength(Length.MinMessage, {message: ReviewError.MinMessage})
  @MaxLength(Length.MaxMessage, {message: ReviewError.MaxMessage})
  public message: string;

  public userId: string;

  @ApiProperty({
    description: 'training rating',
    example: 2,
  })
  @IsInt()
  @Min(Length.MinRating, {message: ReviewError.MinRating})
  @Max(Length.MaxRating, {message: ReviewError.MaxRating})
  public raiting: number;

  public createdAt: Date;
}
