import { IsString, MaxLength, MinLength } from 'class-validator';
import { AlertError, Length } from '../alert.constant';

export class CreateAlertDto {
  @IsString()
  @MinLength(Length.MinTitle, {message: AlertError.MinTitleLength})
  @MaxLength(Length.MaxTitle, {message: AlertError.MaxTitleLength})
  public title: string;

  public userId: string;
}
