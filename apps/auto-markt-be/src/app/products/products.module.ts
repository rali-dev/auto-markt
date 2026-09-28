import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';

// Kein PrismaModule-Import noetig: das PrismaModule aus
// @org/backend-shared-database ist @Global() und wird einmal im AppModule
// importiert. Der PrismaService ist damit hier per DI verfuegbar.
@Module({
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
