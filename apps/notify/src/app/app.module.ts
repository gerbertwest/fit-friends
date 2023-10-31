import { Module } from '@nestjs/common';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { getMongooseOptions } from '@fit-friends/util/util-core';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';
import { ConfigNotifyModule } from '@fit-friends/config/config-notify';
import { AlertModule } from './alerts/alert.module';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    EmailSubscriberModule,
    MailModule,
    AlertModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
