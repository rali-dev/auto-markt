import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@org/backend-shared-database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    // Laedt die .env aus dem Repo-Root und stellt ConfigService global bereit,
    // damit PrismaService die DATABASE_URL per getOrThrow lesen kann.
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // Das Schema ist der Vertrag mit dem Frontend (GraphQL Codegen liest es).
      // Es liegt versioniert im Repo statt in dist/: dist/ ist gitignored und
      // wird von webpack bei jedem Build geleert, Codegen braucht die Datei
      // aber auch in CI ohne laufendes Backend. So erscheint zudem jede
      // API-Aenderung im Pull Request als Diff. sortSchema haelt die
      // Reihenfolge stabil, damit dieser Diff nur echte Aenderungen zeigt.
      // Die Datei wird bei jedem Start des Backends neu geschrieben.
      autoSchemaFile: join(process.cwd(), 'apps/auto-markt-be/schema.gql'),
      sortSchema: true,
    }),
    ProductsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
