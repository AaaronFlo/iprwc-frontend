import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { NewProductComponent } from './components/products/new-product/new-product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminportalComponent } from './components/portals/adminportal/adminportal.component';
import { UserportalComponent } from './components/portals/userportal/userportal.component';
import { AuthGuard } from './components/login/auth.guard';
import { LoginpageComponent } from './components/login/loginpage/loginpage.component';
import { RegisterpageComponent } from './components/login/registerpage/registerpage.component';

export const routes: Routes = [
{
    path: 'login',
    component: LoginpageComponent,
},
{
    path: 'register',
    component: RegisterpageComponent,
},
{
    path: 'products',
    component: ProductsComponent,
    
},
{
    path: 'addProduct',
    component: NewProductComponent,
    canActivate: [AuthGuard]
},
{
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    
},
{
    path: 'admin-portal',
    component: AdminportalComponent,
    canActivate: [AuthGuard]
},
{
    path: 'user-portal',
    component: UserportalComponent,
    canActivate: [AuthGuard]
},
{path: '', redirectTo: 'products', pathMatch: 'full'},
];
