import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from '@fit-friends/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    ConfigUsersModule,
    NotifyModule,
    MongooseModule.forRootAsync(
      getMongooseOptions(),
)],
  controllers: [],
  providers: [],
})
export class AppModule {}
