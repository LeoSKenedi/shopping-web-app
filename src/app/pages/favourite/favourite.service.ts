import { EventEmitter } from "@angular/core";
import { Product } from "../products/products.model";

export class FavouriteService {
    favChanged = new EventEmitter<Product[]>()
    favProducts: Product[] = []

    getFavProducts() {
        return this.favProducts.slice()
    }

    addFavProduct(favProduct: Product) {
        const existingProduct = this.favProducts.find((product) => product.title === favProduct.title)
        if(existingProduct) {
            console.log('already exists')
        } else {
            this.favProducts.push(favProduct)
        }
        this.favChanged.emit(this.favProducts.slice())
    }

    deleteFavProduct(id: number) {
        this.favProducts.splice(id, 1)
        this.favChanged.emit(this.favProducts.slice())
    }
} 