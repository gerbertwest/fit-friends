import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TrainingModule } from './training/training.module';
import { ConfigTrainingModule } from '@fit-friends/config/config-training'

@Module({
  imports: [
    PrismaModule,
    TrainingModule,
    ConfigTrainingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
