import { IsNotEmpty } from 'class-validator';
import { EmailSubscriberError } from '../email-subscriber.constant';

export class CreateTrainingSubscriberDto {
  @IsNotEmpty({ message: EmailSubscriberError.Title })
  public title: string;

  public trainerId: string;

}
