import { IsDate, IsEmail } from 'class-validator';
import { EmailSubscriberError } from '../email-subscriber.constant';
import { ApiProperty } from "@nestjs/swagger";

export class CreateEmailDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: EmailSubscriberError.EmailNotValid })
  public email?: string;

  @ApiProperty({
    description: 'Date of request',
    example: '1981-03-12',
  })
  @IsDate({message: EmailSubscriberError.DateNotValid})
  public requestDate: Date;

  @ApiProperty({
    description: 'Trainer name',
    example: 'Keks',
  })
  public trainerNames: string[];

  @ApiProperty({
    description: 'Trainer ids',
    example: ['1'],
  })
  public trainers: string[];
}
