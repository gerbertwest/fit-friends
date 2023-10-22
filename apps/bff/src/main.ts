/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestIdInterceptor } from './app/interceptors/request-id.interceptor';

const globalPrefix = 'api';
const port = process.env.PORT || 4000;
const config = new DocumentBuilder()
.setTitle('The «BFF» service')
.setDescription('BFF service API')
.setVersion('1.0')
.build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.useGlobalInterceptors(new RequestIdInterceptor());

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
