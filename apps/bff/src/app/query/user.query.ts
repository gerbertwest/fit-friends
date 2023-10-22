import { IsArray, IsIn, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { levels, locations, trainingsType } from "@fit-friends/shared/app-types";

export const DEFAULT_COUNT_LIMIT = 50;
export const DEFAULT_SORT_DIRECTION = 'desc';

export class UserQuery {
  @Transform(({ value } ) => +value || DEFAULT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COUNT_LIMIT;

  @Transform(({ value }) => value.split(',') || locations)
  @IsArray({})
  @IsOptional()
  public location = locations;


  @Transform(({ value }) => value.split(',') || trainingsType)
  @IsArray({})
  @IsOptional()
  public trainingType = trainingsType;

  @Transform(({ value }) => value || levels)
  @IsOptional()
  public level = levels;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
