import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * @Global, damit spaetere `libs/backend/<domain>/infrastructure`-Module den
 * PrismaService per DI bekommen, ohne dieses Modul jedes Mal zu importieren.
 * Einmal in AppModule importieren genuegt.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
