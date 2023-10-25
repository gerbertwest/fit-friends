import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_TASK_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../training.constant';

export class TrainingQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

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

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

}
