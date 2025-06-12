import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { Product } from './product/product.model';
import { CartItem } from '../shopping-cart/cart-item.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private apiUrl = '';
  private cart: CartItem[] = [];
  private cartUpdated = new BehaviorSubject<{ product: Product, quantity: number }[]>([]);
  cartUpdated$ = this.cartUpdated.asObservable();
  
  products$: Observable<Product[]>;

  constructor() {
    this.products$ = this.getProducts();
  }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}product/all`);
  }

  public addProduct(product: Product): Observable<Product> {
  return this.httpClient.post<Product>(`${this.apiUrl}product/add`, product)
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}product/update/${product.id}`, product);
  }

  public deleteProduct(productId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}product/delete/${productId}`);
  }

  public getCart(): CartItem[] {
    return this.cart;
  }

  public addToCart(product: Product): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }

    this.cartUpdated.next([...this.cart]);
  }

  public removeFromCart(product: Product): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity--;
      if (existingItem.quantity === 0) {
        this.cart = this.cart.filter(item => item.product.id !== product.id);
      }
    }
    this.cartUpdated.next([...this.cart]);
  }

  public clearCart(): void {
    this.cart = [];
    this.cartUpdated.next([]);
  }

  public incrementCartItemQuantity(product: Product): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
      this.cartUpdated.next([...this.cart]);
    }
  }
  
  public decrementCartItemQuantity(product: Product): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
      this.cartUpdated.next([...this.cart]);
    }
  }

}
