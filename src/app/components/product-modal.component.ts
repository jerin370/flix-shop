import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../services/product.service';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-netflix-dark-gray p-6 rounded-lg max-w-2xl w-full mx-4">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-white">{{product.title}}</h2>
          <button 
            (click)="close.emit()"
            class="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img 
              [src]="product.thumbnail" 
              [alt]="product.title"
              class="w-full rounded-lg"
            >
          </div>
          <div>
            <p class="text-gray-300 mb-4">{{product.description}}</p>
            <p class="text-2xl font-bold text-netflix-red mb-4">\${{product.price}}</p>
            <button
              (click)="addToCart.emit(product)"
              class="w-full py-2 px-4 bg-netflix-red text-white rounded hover:bg-[#f40612] transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductModalComponent {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<Product>();
}