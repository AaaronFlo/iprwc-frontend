import { Component, inject, input } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { Product } from './product.model';
import { ProductService } from '../products.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../login/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [CardComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  isLoggedIn$;
  product = input.required<Product>();


  constructor(){
    this.isLoggedIn$ = this.authService.userRole$.pipe(
      map(role => !!role && role.trim() !== '')
    );
  }

  private authService = inject(AuthService);
  private productsService = inject(ProductService);

  addToCart(product: Product) {
    this.productsService.addToCart(product);
  }
}
