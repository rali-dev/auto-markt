import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { GetProductsDocument } from './generated/graphql';

/**
 * Einziger Ort, an dem das Frontend Produkt-Queries an die API schickt.
 *
 * Bewusst ohne handgeschriebene Typen: GetProductsDocument traegt Ergebnis-
 * und Variablentyp aus GraphQL Codegen, Apollo leitet daraus den Typ von
 * `result.data` ab.
 */
@Injectable({ providedIn: 'root' })
export class ProductsApi {
  private readonly apollo = inject(Apollo);

  getProducts() {
    return this.apollo
      .query({ query: GetProductsDocument })
      .pipe(map((result) => result.data?.products ?? []));
  }
}
