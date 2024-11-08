import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-netflix-dark-gray p-6 rounded-lg max-w-2xl w-full mx-4">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-white">Shopping Cart</h2>
          <button 
            (click)="close.emit()"
            class="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div *ngIf="cartService.getItems()().length; else emptyCart" class="space-y-4">
          <div *ngFor="let item of cartService.getItems()()" class="flex items-center justify-between p-4 bg-black bg-opacity-40 rounded">
            <div class="flex items-center space-x-4">
              <img [src]="item.thumbnail" [alt]="item.title" class="w-16 h-16 rounded object-cover">
              <div>
                <h3 class="text-white font-medium">{{item.title}}</h3>
                <p class="text-netflix-red">\${{item.price}}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <button 
                  (click)="cartService.updateQuantity(item.id, item.quantity - 1)"
                  class="text-white bg-gray-700 px-2 rounded"
                >
                  -
                </button>
                <span class="text-white">{{item.quantity}}</span>
                <button 
                  (click)="cartService.updateQuantity(item.id, item.quantity + 1)"
                  class="text-white bg-gray-700 px-2 rounded"
                >
                  +
                </button>
              </div>
              <button 
                (click)="cartService.removeFromCart(item.id)"
                class="text-netflix-red hover:text-red-400"
              >
                Remove
              </button>
            </div>
          </div>
          <div class="mt-4 text-right">
            <p class="text-white text-xl">Total: \${{cartService.totalAmount()}}</p>
          </div>
        </div>
        
        <ng-template #emptyCart>
          <p class="text-gray-400 text-center py-8">Your cart is empty</p>
        </ng-template>
      </div>
    </div>
  `
})
export class CartModalComponent {
  @Output() close = new EventEmitter<void>();

  constructor(public cartService: CartService) {}
}