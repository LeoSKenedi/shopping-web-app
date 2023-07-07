import { EventEmitter } from '@angular/core';
import { Product } from '../products/products.model';

export class CartService {
  cartChanged = new EventEmitter<Product[]>();
  cartProducts: Product[] = [];

  getCartProducts() {
    return this.cartProducts.slice();
  }

  saveCartProductsToLocalStorage(userId: string) {
    localStorage.setItem(`cartProducts_${userId}`, JSON.stringify(this.cartProducts));
  }

  loadCartProductsFromLocalStorage(userId: string) {
    const cartProducts = localStorage.getItem(`cartProducts_${userId}`);
    if (cartProducts) {
      this.cartProducts = JSON.parse(cartProducts);
    } else {
      this.cartProducts = [];
    }
  }

  addCartProduct(cartProduct: Product, userId: string) {
    const existingProduct = this.cartProducts.find((product) => product.title === cartProduct.title);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cartProduct.quantity = 1;
      this.cartProducts.push(cartProduct);
    }
    this.cartChanged.emit(this.cartProducts.slice());
    this.saveCartProductsToLocalStorage(userId);
  }

  deleteCartProduct(id: number, userId: string) {
    this.cartProducts.splice(id, 1);
    this.cartChanged.emit(this.cartProducts.slice());
    this.saveCartProductsToLocalStorage(userId);
  }
}