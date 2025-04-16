import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { NewProductComponent } from './components/products/new-product/new-product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginpageComponent } from './components/login/loginpage/loginpage.component';
import { RegisterpageComponent } from './components/login/registerpage/registerpage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'iprwc-frontend';
}
