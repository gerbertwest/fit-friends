import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_TRAININGS_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../training.constant';

export class TrainingQuery {
  @Transform(({ value } ) => +value || DEFAULT_TRAININGS_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TRAININGS_COUNT_LIMIT;

  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public minPrice: number;

  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public maxPrice: number;

  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public minCaloriesCount: number;

  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public maxCaloriesCount: number;

  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public minRaiting: number;

  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public maxRaiting: number;

  @Transform(({ value }) => value.split(','))
  @IsArray({})
  @IsOptional()
  public trainingTypes: string[];

  @Transform(({ value }) => value.split(','))
  @IsArray({})
  @IsOptional()
  public trainingTime: string[];

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsOptional()
  public sortField: string;

  @IsOptional()
  public active: string

}
