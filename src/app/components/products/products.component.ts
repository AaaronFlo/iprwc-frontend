import { Component, inject } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ProductService } from './products.service';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, AsyncPipe,HeaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private productService = inject(ProductService);
  products = this.productService.getProducts();
}
