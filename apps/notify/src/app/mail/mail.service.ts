import { Subscriber } from '@fit-friends/shared/app-types';
import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from './mail.constant';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import { notifyConfig } from '@fit-friends/config/config-notify';
import { MailRepository } from './mail.repository';
import { MailEntity } from './mail.entity';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(notifyConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof notifyConfig>,
    private readonly mailRepository: MailRepository,
    ) {}

  public sendNotifyNewSubscriber(subscribers: Subscriber[], email: string, trainerName: string) {

    console.log(subscribers)

    const title = subscribers.map((subscriber) => subscriber.title)

      this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        title: title,
        trainerName: trainerName
      }
    })
  }

  public async createMailing(email: string, trainerName: string) {
    const mail = new MailEntity({email, trainerName})
    return this.mailRepository.create(mail);
  }

  public async getMails(email: string) {
    return this.mailRepository.findByEmail(email)
  }
}
