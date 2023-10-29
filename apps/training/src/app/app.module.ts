import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TrainingModule } from './training/training.module';
import { ConfigTrainingModule } from '@fit-friends/config/config-training'
import { OrderModule } from './order/order.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    PrismaModule,
    TrainingModule,
    OrderModule,
    ConfigTrainingModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
