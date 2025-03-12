import { Component, inject, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductFilterComponent } from '../product-filter/product-filter.component';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string
  description: string
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  private http = inject(HttpClient);
  products = signal<Product[]>([]);
  filteredProducts: Product[] = []; // ✅ Store the filtered products separately
  filterCategory = signal<string | null>(null);
  filterPrice = signal<number | null>(null);
  loading = false

  constructor() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true
    this.http.get<Product[]>('https://fakestoreapi.com/products').subscribe(data => {
      this.products.set(data);
      this.filteredProducts = data;
      this.loading = false
    });
  }

  applyFilter(filter: { category?: string; price?: number }) {
    this.filterCategory.set(filter.category ?? null);
    this.filterPrice.set(filter.price ?? null);
    this.updateFilteredProducts(); // ✅ Call the function to update filtered list
  }

  private updateFilteredProducts() {
    this.filteredProducts = this.products().filter(product =>
      (!this.filterCategory() || product.category === this.filterCategory()) &&
      (!this.filterPrice() || product.price <= this.filterPrice()!)
    );
  }
}
