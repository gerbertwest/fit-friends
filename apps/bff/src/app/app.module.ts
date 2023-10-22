import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_TIMEOUT, HTTP_CLIENT_MAX_REDIRECTS } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [
    UsersController
  ],
  providers: [
    CheckAuthGuard
  ],
})
export class AppModule {}
