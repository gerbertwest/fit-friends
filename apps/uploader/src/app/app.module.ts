import { Module } from '@nestjs/common';
import { ConfigUploaderModule, getMongooseOptions } from '@fit-friends/config/config-uploader';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(
    getMongooseOptions()
  )
],
  controllers: [],
  providers: [],
})
export class AppModule {}
