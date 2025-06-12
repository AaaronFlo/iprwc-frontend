import { Product } from "../products/product/product.model";

export interface CartItem {
    product: Product;
    quantity: number;
}