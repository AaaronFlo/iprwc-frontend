import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../products/products.service';
import { Product } from '../products/product/product.model';
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AuthService } from '../login/auth.service';
import { map, Subscription } from 'rxjs';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'app-shopping-cart',
  imports: [DecimalPipe, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  closed = false;
  isLoggedIn$;
  cartItems: CartItem[] = [];
  private authSubscription: Subscription | undefined;
  private cartSubscription: Subscription | undefined;

  constructor(
    private productsService: ProductService,
    private router: Router,
    private authService: AuthService
  ){
    this.isLoggedIn$ = this.authService.userRole$.pipe(
      map(role => !!role && role.trim() !== '')
    );
  }

  ngOnInit() {
    // Initialize cart and listen for changes
    this.cartItems = this.productsService.getCart();
    
    this.cartSubscription = this.productsService.cartUpdated$.subscribe(
      cart => {
        this.cartItems = cart;
      }
    );
    
    // Update cart items only when logged in
    this.authSubscription = this.isLoggedIn$.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.cartItems = [];
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  incrementQuantity(item: CartItem) {
    this.productsService.incrementCartItemQuantity(item.product);
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.productsService.decrementCartItemQuantity(item.product);
    } else {
      this.removeFromCart(item.product);
    }
  }

  removeFromCart(product: Product) {
    this.productsService.removeFromCart(product);
  }

  toggleCart() {
    this.closed = !this.closed;
    this.router.navigate(['/products']);
  }

  calculateItemTotal(item: CartItem): number {
    return Math.round((item.product.price * item.quantity) * 100) / 100;
  }

  getTotalAmount() {
    return parseFloat(
      this.cartItems
        .reduce((total, item) => total + item.product.price * item.quantity, 0)
        .toFixed(2)
    );
  }

  checkout() {
    const totalAmount = this.getTotalAmount();
    alert(`Thanks for your purchase! Total: €${totalAmount.toFixed(2)}`);
    this.productsService.clearCart();
    this.toggleCart();
  }
}