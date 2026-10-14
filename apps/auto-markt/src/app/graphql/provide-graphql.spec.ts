import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PLATFORM_ID, TransferState } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ProductsApi } from './products.api';
import { APOLLO_STATE, provideGraphQL } from './provide-graphql';

const product = {
  __typename: 'Product',
  id: '1',
  name: 'CS-380 Big Brake Kit',
  description: 'Six-piston monobloc calipers with 380 mm slotted discs.',
  brand: 'ApexSport',
  category: 'BRAKES',
  price: 1299,
};

function setup(platform: 'browser' | 'server') {
  TestBed.configureTestingModule({
    providers: [
      { provide: PLATFORM_ID, useValue: platform },
      provideHttpClient(),
      provideHttpClientTesting(),
      provideGraphQL(),
    ],
  });
  return {
    http: TestBed.inject(HttpTestingController),
    transferState: TestBed.inject(TransferState),
    // Erst bei Bedarf injizieren: Apollo liest den TransferState beim Erzeugen.
    api: () => TestBed.inject(ProductsApi),
  };
}

describe('provideGraphQL', () => {
  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('should put the Apollo cache into the transfer state on the server', async () => {
    const { http, transferState, api } = setup('server');

    const result = firstValueFrom(api().getProducts());
    http
      .expectOne('http://localhost:3000/graphql')
      .flush({ data: { products: [product] } });
    await result;

    const state = JSON.parse(transferState.toJson())['apollo.state'];
    expect(state['Product:1']).toMatchObject({ name: 'CS-380 Big Brake Kit' });
  });

  it('should answer queries from the server state in the browser without a request', async () => {
    const { transferState, api } = setup('browser');
    transferState.set(APOLLO_STATE, {
      ROOT_QUERY: { __typename: 'Query', products: [{ __ref: 'Product:1' }] },
      'Product:1': product,
    });

    await expect(firstValueFrom(api().getProducts())).resolves.toEqual([
      product,
    ]);
    // verify() in afterEach stellt sicher, dass keine Anfrage rausging.
  });
});
