import { IsNotEmpty } from 'class-validator';
import { AlertError } from '../alert.constant';

export class CreateAlertDto {
  @IsNotEmpty({ message: AlertError.Title })
  public title: string;

  public userId: string;
}
