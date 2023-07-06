import { EventEmitter } from "@angular/core";
import { Product } from "../products/products.model";

export class CartService {
    cartChanged = new EventEmitter<Product[]>()
    cartProducts: Product[] = []
  
    getCartProducts() {
        return this.cartProducts.slice()
    }

    addCartProduct(cartProduct: Product) {
        const existingProduct = this.cartProducts.find((product) => product.title === cartProduct.title)
        if(existingProduct) {
            existingProduct.quantity++
        } else {
            cartProduct.quantity = 1
            this.cartProducts.push(cartProduct)
        }
        this.cartChanged.emit(this.cartProducts.slice())
    }

    deleteCartProduct(id: number) {
        this.cartProducts.splice(id, 1)
        this.cartChanged.emit(this.cartProducts.slice())
    }
}