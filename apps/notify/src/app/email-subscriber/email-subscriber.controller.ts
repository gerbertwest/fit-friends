import { CreateTrainingSubscriberDto } from './dto/create-training-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@fit-friends/shared/app-types';
import { MailService } from '../mail/mail.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Subscription')
@Controller('email')
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'fitFriends.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'fitFriends.notify',
  })
  public async create(subscriber: CreateTrainingSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The email has been sent'
  })
  @Post()
  public async show(@Body() dto: CreateEmailDto) {
    const subscribers = await this.subscriberService.getSubscribers(dto)
    this.mailService.sendNotifyNewSubscriber(subscribers, dto.email, dto.trainerName);
    this.mailService.createMailing(dto.email, dto.trainerName)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All mailers by email found'
  })
  @Get('/:email')
  public async index(@Param('email') email: string) {
    const mails = this.mailService.getMails(email);
    return mails
  }
}
