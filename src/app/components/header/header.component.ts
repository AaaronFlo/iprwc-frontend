import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { map, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductService } from '../products/products.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin$;
  isLoggedIn$;
  cartItemCount = 0;
  private cartSubscription: Subscription | undefined;
  private authSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private productService: ProductService
  ) {
    this.isAdmin$ = this.authService.userRole$.pipe(
      map(role => role === 'ADMIN')
    );

    this.isLoggedIn$ = this.authService.userRole$.pipe(
      map(role => !!role && role.trim() !== '')
    );
  }

  ngOnInit() {
    this.cartSubscription = this.productService.cartUpdated$.subscribe(cart => {
      this.cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
    
    const currentCart = this.productService.getCart();
    this.cartItemCount = currentCart.reduce((total, item) => total + item.quantity, 0);

    this.authSubscription = this.authService.userRole$.subscribe(role => {
      if (!role || role.trim() === '') {
        this.cartItemCount = 0;
      }
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getCartItemCount(): number {
    return this.cartItemCount;
  }
}
