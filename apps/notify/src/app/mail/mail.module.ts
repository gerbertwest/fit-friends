import { Module } from '@nestjs/common';
import { getMailerAsyncOptions } from '@fit-friends/util/util-core';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MailRepository } from './mail.repository';
import { MailModel, MailSchema } from './mail.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('application.mail')),
    MongooseModule.forFeature([
      { name: MailModel.name, schema: MailSchema }
    ]),
  ],
  providers: [
    MailService, MailRepository
  ],
  exports: [
    MailService, MailRepository
  ]
})
export class MailModule {}
