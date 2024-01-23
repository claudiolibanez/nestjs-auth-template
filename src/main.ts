import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app.module';

export function configureApp(_: INestApplication) {}

export async function bootstrap(port: number = 3000) {
  const app = await NestFactory.create(AppModule);

  configureApp(app);

  await app.listen(port);

  return app;
}

bootstrap();
