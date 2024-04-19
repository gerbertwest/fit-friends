import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_TIMEOUT, HTTP_CLIENT_MAX_REDIRECTS } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { TrainingController } from './training.controller';
import { OrderController } from './order.controller';
import { ReviewController } from './review.controller';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [
    UsersController,
    TrainingController,
    OrderController,
    ReviewController,
    UploadController,
  ],
  providers: [
    CheckAuthGuard
  ],
})
export class AppModule {}
