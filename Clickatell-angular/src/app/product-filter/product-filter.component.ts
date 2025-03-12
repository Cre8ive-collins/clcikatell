import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl : './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  @Output() filterChange = new EventEmitter<{ category?: string; price?: number }>();

  searchControl = new FormControl('');
  priceControl = new FormControl<number | null>(null);

  applyFilter() {
    this.filterChange.emit({
      category: this.searchControl.value || undefined,
      price: this.priceControl.value || undefined
    });
  }
}
