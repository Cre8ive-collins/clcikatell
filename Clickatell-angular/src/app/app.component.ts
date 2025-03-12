import { Component } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-root',
  imports: [ ProductListComponent],
  template : '<app-product-list></app-product-list>',
})
export class AppComponent {
  title = 'clickatel-angular';
}
