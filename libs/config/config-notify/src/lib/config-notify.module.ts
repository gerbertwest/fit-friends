import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import notifyConfig from './notify.config';
import notifyAlertConfig from './notify.alert.config';

const ENV_FILE_PATH = 'apps/notify/.notify.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig, notifyAlertConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigNotifyModule {}
