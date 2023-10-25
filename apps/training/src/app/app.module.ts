import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TrainingModule } from './training/training.module';

@Module({
  imports: [PrismaModule, TrainingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
