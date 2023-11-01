import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from '@fit-friends/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from './notify/notify.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    ConfigUsersModule,
    NotifyModule,
    RequestModule,
    MongooseModule.forRootAsync(
      getMongooseOptions(),
)],
  controllers: [],
  providers: [],
})
export class AppModule {}
