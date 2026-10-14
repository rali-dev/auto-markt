import { ErrorHandler, PendingTasks, inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import type { GetProductsQuery } from '../graphql/generated/graphql';
import { ProductsApi } from '../graphql/products.api';

/** Ein Produkt, wie es die Query GetProducts liefert (von Codegen abgeleitet). */
export type ProductListItem = GetProductsQuery['products'][number];

export interface ProductState {
  products: ProductListItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      api = inject(ProductsApi),
      pendingTasks = inject(PendingTasks),
      errorHandler = inject(ErrorHandler),
    ) => ({
      async loadProducts(): Promise<void> {
        // Beim SSR rendert Angular, sobald keine Pending Task mehr offen ist.
        // Der HttpClient meldet nur die Anfrage selbst an, nicht Apollos
        // Promise-Kette davor und das patchState danach. Ohne diese Klammer
        // koennte der Server die Seite ohne Produkte ausliefern.
        const removeTask = pendingTasks.add();
        patchState(store, { isLoading: true, error: null });
        try {
          const products = await firstValueFrom(api.getProducts());
          patchState(store, { products });
        } catch (error) {
          errorHandler.handleError(error);
          patchState(store, { error: 'Products could not be loaded.' });
        } finally {
          patchState(store, { isLoading: false });
          removeTask();
        }
      },
    }),
  ),
);
