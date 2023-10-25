import { IsOptional } from "class-validator";

export class UpdateTrainingDto {
  @IsOptional()
  public title: string;

  @IsOptional()
  public backgroundImage: string;

  @IsOptional()
  public level: string;

  @IsOptional()
  public trainingType: string;

  @IsOptional()
  public trainingTime: string;

  @IsOptional()
  public price: number;

  @IsOptional()
  public caloriesCount: number;

  @IsOptional()
  public description: string;

  @IsOptional()
  public sex: string;

  @IsOptional()
  public video: string;

  @IsOptional()
  public raiting: number;

  @IsOptional()
  public trainerId: string;

  @IsOptional()
  public special: boolean;
}
