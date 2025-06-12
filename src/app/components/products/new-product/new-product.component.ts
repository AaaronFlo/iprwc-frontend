import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../products.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product/product.model';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [FormsModule, HeaderComponent, CommonModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {
  enteredName = '';
  enteredDescription = '';
  enteredPrice = 0;
  enteredImageUrl = '';
  enteredInStock = false;
  products: Product[] = [];

  private productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log('Product deleted successfully');
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  OnSubmit() {
    const newProduct: Omit<Product, 'id'> = {
        name: this.enteredName,
        description: this.enteredDescription,
        price: this.enteredPrice,
        imageUrl: this.enteredImageUrl,
        inStock: this.enteredInStock
    };
    
    this.productService.addProduct(newProduct).subscribe({
        next: (product) => {
            console.log('Product added successfully:', product);
            this.resetForm();
            this.loadProducts();
        },
        error: (error) => {
            console.error('Error adding product:', error);
        }
    });
  }

  resetForm(): void {
    this.enteredName = '';
    this.enteredDescription = '';
    this.enteredPrice = 0;
    this.enteredImageUrl = '';
    this.enteredInStock = false;
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
