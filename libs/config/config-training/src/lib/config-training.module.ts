import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const ENV_TRAINING_FILE_PATH = 'apps/training/.training.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [],
      envFilePath: ENV_TRAINING_FILE_PATH
    }),
  ]
})
export class ConfigTrainingModule {}
