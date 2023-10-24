import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, UserSchema } from "../user/user.model";
import { UsersSeeder } from "./users.seeder";

seeder({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   cache: true,
    //   envFilePath: 'apps/users/.users.env',
    //   load: [dbConfig],
    // }),
    // MongooseModule.forRootAsync(getMongooseOptions()),
    MongooseModule.forRoot("mongodb://admin:test@localhost:27017/fitFriends-users?authSource=admin"),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
}).run([UsersSeeder]);
