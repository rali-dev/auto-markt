/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // Das Angular-Frontend ruft /graphql aus dem Browser von einem anderen
  // Origin auf (Dev-Server :4200). Ohne CORS verwirft der Browser die Antwort.
  // Anfragen des SSR-Servers betrifft das nicht, die kommen nicht vom Browser.
  // CORS_ORIGIN darf mehrere Origins kommagetrennt enthalten (siehe .env.example).
  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? 'http://localhost:4200')
      .split(',')
      .map((origin) => origin.trim()),
  });
  // Ohne Shutdown-Hooks laeuft onModuleDestroy nie -- die Prisma-Verbindung
  // wuerde beim Beenden nicht sauber geschlossen.
  app.enableShutdownHooks();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
