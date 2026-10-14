import { ApplicationRef, ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, Subject, of, throwError } from 'rxjs';
import { ProductsApi } from '../graphql/products.api';
import { ProductListItem, ProductStore } from './product.store';

const products: ProductListItem[] = [
  {
    id: '1',
    name: 'CS-380 Big Brake Kit',
    description: 'Six-piston monobloc calipers with 380 mm slotted discs.',
    brand: 'ApexSport',
    category: 'BRAKES',
    price: 1299,
  },
];

function setup(getProducts: () => Observable<ProductListItem[]>) {
  const errorHandler = { handleError: jest.fn() };
  TestBed.configureTestingModule({
    providers: [
      { provide: ProductsApi, useValue: { getProducts } },
      { provide: ErrorHandler, useValue: errorHandler },
    ],
  });
  return { store: TestBed.inject(ProductStore), errorHandler };
}

describe('ProductStore', () => {
  it('should start empty and idle', () => {
    const { store } = setup(() => of(products));

    expect(store.products()).toEqual([]);
    expect(store.isLoading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('should load the products into the state', async () => {
    const { store } = setup(() => of(products));

    await store.loadProducts();

    expect(store.products()).toEqual(products);
    expect(store.isLoading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('should be loading until the response arrives', async () => {
    const response = new Subject<ProductListItem[]>();
    const { store } = setup(() => response);

    const loading = store.loadProducts();
    expect(store.isLoading()).toBe(true);

    response.next(products);
    await loading;
    expect(store.isLoading()).toBe(false);
  });

  // Schuetzt das SSR-Verhalten: Solange geladen wird, darf die App nicht
  // "stable" sein, sonst rendert der Server die Seite ohne Produkte.
  it('should keep the app unstable while loading', async () => {
    const response = new Subject<ProductListItem[]>();
    const { store } = setup(() => response);
    const appRef = TestBed.inject(ApplicationRef);

    const loading = store.loadProducts();
    let stable = false;
    void appRef.whenStable().then(() => (stable = true));
    await new Promise((resolve) => setTimeout(resolve));
    expect(stable).toBe(false);

    response.next(products);
    await loading;
    await appRef.whenStable();
    expect(store.products()).toEqual(products);
  });

  it('should set an error and report it when loading fails', async () => {
    const failure = new Error('offline');
    const { store, errorHandler } = setup(() => throwError(() => failure));

    await store.loadProducts();

    expect(store.products()).toEqual([]);
    expect(store.error()).toBe('Products could not be loaded.');
    expect(store.isLoading()).toBe(false);
    expect(errorHandler.handleError).toHaveBeenCalledWith(failure);
  });
});
