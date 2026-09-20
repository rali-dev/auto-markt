// Prisma 7 liest seine Konfiguration aus dieser Datei (nicht mehr aus dem
// `prisma`-Key der package.json). Der Dateiname `prisma7.config.ts` hat bei der
// Discovery Vorrang vor dem Legacy-Namen `prisma.config.ts`.
//
// WICHTIG: Prisma lädt .env NICHT automatisch -- daher der explizite Import.
// dotenv liest aus process.cwd(), die Pfade unten dagegen relativ zu DIESER Datei.
// Deshalb liegt die .env im Repo-Root und alle Befehle laufen vom Root aus
// mit `--config libs/backend/shared/database/prisma7.config.ts`.
import 'dotenv/config';
import process from 'node:process';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'ts-node libs/backend/shared/database/prisma/seed.ts',
  },
  datasource: {
    // Nur das CLI (migrate/studio/db) nutzt diese URL. Die Anwendung selbst
    // verbindet sich ueber den Driver Adapter im PrismaService.
    url: process.env['DATABASE_URL'],
  },
});
