import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { firstValueFrom } from 'rxjs';
import { GetProductsDocument } from './generated/graphql';
import { ProductsApi } from './products.api';

describe('ProductsApi', () => {
  let api: ProductsApi;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ApolloTestingModule] });
    api = TestBed.inject(ProductsApi);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => controller.verify());

  it('should send GetProducts and return the product list', async () => {
    const product = {
      __typename: 'Product',
      id: '1',
      name: 'CS-380 Big Brake Kit',
      description: 'Six-piston monobloc calipers with 380 mm slotted discs.',
      brand: 'ApexSport',
      category: 'BRAKES',
      price: 1299,
    };
    const result = firstValueFrom(api.getProducts());

    controller
      .expectOne(GetProductsDocument)
      .flushData({ products: [product] });

    await expect(result).resolves.toEqual([product]);
  });

  it('should pass network errors on to the caller', async () => {
    const result = firstValueFrom(api.getProducts());

    controller
      .expectOne(GetProductsDocument)
      .networkError(new Error('offline'));

    await expect(result).rejects.toThrow('offline');
  });
});
