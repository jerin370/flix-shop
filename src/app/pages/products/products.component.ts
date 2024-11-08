import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ProductModalComponent } from '../../components/product-modal.component';
import { CartModalComponent } from '../../components/cart-modal.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductModalComponent, CartModalComponent],
  template: `
    <div class="min-h-screen bg-netflix-black">
      <nav class="bg-netflix-black shadow border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <span class="text-netflix-red text-2xl font-bold">MYAPP</span>
              <h1 class="ml-8 text-xl font-medium text-gray-200">Products</h1>
            </div>
            <div class="flex items-center space-x-4">
              <button
                (click)="showCart.set(true)"
                class="relative text-white hover:text-netflix-red"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span *ngIf="cartService.totalItems() > 0" 
                      class="absolute -top-2 -right-2 bg-netflix-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {{cartService.totalItems()}}
                </span>
              </button>
              <button
                (click)="logout()"
                class="px-4 py-2 text-sm text-white bg-netflix-red rounded hover:bg-[#f40612]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div *ngFor="let product of products()"
               class="bg-netflix-dark-gray rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
               (click)="openProductModal(product)">
            <img 
              [src]="product.thumbnail" 
              [alt]="product.title"
              class="w-full h-48 object-cover"
            >
            <div class="p-4">
              <h3 class="text-lg font-medium text-white mb-2">{{product.title}}</h3>
              <p class="text-gray-400 text-sm mb-2 line-clamp-2">{{product.description}}</p>
              <p class="text-netflix-red font-bold">\${{product.price}}</p>
            </div>
          </div>
        </div>
      </main>

      <app-product-modal
        *ngIf="selectedProduct()"
        [product]="selectedProduct()!"
        (close)="selectedProduct.set(null)"
        (addToCart)="addToCart($event)"
      ></app-product-modal>

      <app-cart-modal
        *ngIf="showCart()"
        (close)="showCart.set(false)"
      ></app-cart-modal>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  selectedProduct = signal<Product | null>(null);
  showCart = signal(false);

  constructor(
    public productService: ProductService,
    public cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => this.products.set(products)
    );
  }

  openProductModal(product: Product) {
    this.selectedProduct.set(product);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.selectedProduct.set(null);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}