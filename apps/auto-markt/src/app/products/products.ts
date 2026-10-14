import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, inject} from '@angular/core';
import { ProductStore } from '../stores/product.store';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, TitleCasePipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  protected readonly store = inject(ProductStore);

  constructor() {
    // afterNextRender(() => {
    //   void this.store.loadProducts();
    // });
    void this.store.loadProducts();
  }
}
