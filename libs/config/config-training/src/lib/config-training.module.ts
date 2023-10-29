import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import rabbitConfig from './config/rabbit.config';

const ENV_TRAINING_FILE_PATH = 'apps/training/.training.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [rabbitConfig],
      envFilePath: ENV_TRAINING_FILE_PATH
    }),
  ]
})
export class ConfigTrainingModule {}
