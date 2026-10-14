import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { ProductsApi } from '../graphql/products.api';
import { ProductListItem } from '../stores/product.store';
import { Products } from './products';

const products: ProductListItem[] = [
  {
    id: '1',
    name: 'CS-380 Big Brake Kit',
    description: 'Six-piston monobloc calipers with 380 mm slotted discs.',
    brand: 'ApexSport',
    category: 'BRAKES',
    price: 1299,
  },
  {
    id: '2',
    name: 'Coilover Kit',
    description: 'Height and damping adjustable.',
    brand: 'RaceTech',
    category: 'SUSPENSION',
    price: 1450.5,
  },
];

async function render(getProducts: () => Observable<ProductListItem[]>) {
  await TestBed.configureTestingModule({
    imports: [Products],
    providers: [
      { provide: ProductsApi, useValue: { getProducts } },
      { provide: ErrorHandler, useValue: { handleError: jest.fn() } },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(Products);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('Products', () => {
  it('should render one card per product with name, brand and price', async () => {
    const element = await render(() => of(products));

    const cards = element.querySelectorAll('li');
    expect(cards).toHaveLength(2);
    expect(cards[0].querySelector('h3')?.textContent).toContain(
      'CS-380 Big Brake Kit',
    );
    expect(cards[0].textContent).toContain('ApexSport');
    expect(cards[0].textContent).toContain('Brakes');
    expect(cards[0].textContent).toContain('€1,299.00');
    expect(element.querySelector('[role="alert"]')).toBeNull();
  });

  it('should show an error instead of products when loading fails', async () => {
    const element = await render(() => throwError(() => new Error('offline')));

    expect(element.querySelector('[role="alert"]')?.textContent).toContain(
      'Products could not be loaded.',
    );
    expect(element.querySelectorAll('li')).toHaveLength(0);
  });

  it('should say so when there are no products', async () => {
    const element = await render(() => of([]));

    expect(element.textContent).toContain('No products available.');
  });
});
