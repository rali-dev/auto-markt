import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

/**
 * Zentraler Datenbankzugriff. Erbt von PrismaClient, damit Repositories
 * `prisma.<model>.<operation>()` typsicher aufrufen koennen.
 *
 * WARUM ein Driver Adapter: Prisma 7 hat den Rust-Query-Engine entfernt und
 * kompiliert Queries per WASM. Die eigentliche Verbindung liefert seitdem ein
 * Adapter -- `new PrismaClient()` ohne `adapter` wirft zur Laufzeit.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(config: ConfigService) {
    super({
      adapter: new PrismaPg({
        // getOrThrow statt get: fehlt die URL, soll der Prozess beim Boot
        // abbrechen und nicht erst beim ersten Query.
        connectionString: config.getOrThrow<string>('DATABASE_URL'),
        // Supabase Free Tier erlaubt 60 Verbindungen insgesamt. Klein halten,
        // damit Migrationen und Prisma Studio parallel noch durchkommen.
        max: 5,
      }),
    });
  }

  async onModuleInit(): Promise<void> {
    // Achtung: mit einem Driver Adapter baut $connect() die Verbindung noch
    // nicht wirklich auf -- der pg-Pool verbindet erst beim ersten Query.
    // Ein Tippfehler in der DATABASE_URL faellt deshalb NICHT hier auf,
    // sondern erst am Health-Endpoint bzw. beim ersten echten Zugriff.
    await this.$connect();
    this.logger.log('Prisma initialisiert (Verbindung wird lazy aufgebaut)');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
