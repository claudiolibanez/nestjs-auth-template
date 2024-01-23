import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/ioC/app.module';

export function configureApp(app: INestApplication) {
  app.setGlobalPrefix('v1');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureApp(app);

  await app.listen(3333);
}

bootstrap();
