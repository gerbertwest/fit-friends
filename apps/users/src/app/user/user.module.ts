import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { UserModel, UserSchema } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NotifyModule } from '../notify/notify.module';
import { UsersSeeder } from '../seeder/users.seeder';

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: UserModel.name, schema: UserSchema }
  ]),
  NotifyModule
],
  controllers: [UserController],
  providers: [UserRepository, UserService, UsersSeeder],
  exports: [UserRepository, UserService]
})
export class UserModule {}
