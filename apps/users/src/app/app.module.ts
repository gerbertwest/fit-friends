import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from '@fit-friends/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
)],
  controllers: [],
  providers: [],
})
export class AppModule {}
