import { getMongoConnectionString } from '@fit-friends/util/util-core';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('upload.db.user'),
          password: config.get<string>('upload.db.password'),
          host: config.get<string>('upload.db.host'),
          port: config.get<string>('upload.db.port'),
          authDatabase: config.get<string>('upload.db.authBase'),
          databaseName: config.get<string>('upload.db.name'),
        })
      }
    },
    inject: [ConfigService]
  }
}
