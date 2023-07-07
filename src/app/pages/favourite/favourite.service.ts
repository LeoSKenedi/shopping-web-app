import { EventEmitter } from "@angular/core";
import { Product } from "../products/products.model";

export class FavouriteService {
    favChanged = new EventEmitter<Product[]>();
    favProducts: Product[] = [];

    getFavProducts() {
        return this.favProducts.slice();
    }

    saveFavProductsToLocalStorage(userId: string) {
        localStorage.setItem(`favProducts_${userId}`, JSON.stringify(this.favProducts));
    }

    loadFavProductsFromLocalStorage(userId: string) {
        const favProducts = localStorage.getItem(`favProducts_${userId}`);
        if (favProducts) {
            this.favProducts = JSON.parse(favProducts);
        } else {
            this.favProducts = [];
        }
    }

    addFavProduct(favProduct: Product, userId: string) {
        const existingProduct = this.favProducts.find((product) => product.title === favProduct.title);
        if (existingProduct) {
            console.log('already exists');
        } else {
            this.favProducts.push(favProduct);
        }
        this.favChanged.emit(this.favProducts.slice());
        this.saveFavProductsToLocalStorage(userId);
    }

    deleteFavProduct(id: number, userId: string) {
        this.favProducts.splice(id, 1);
        this.favChanged.emit(this.favProducts.slice());
        this.saveFavProductsToLocalStorage(userId);
    }
}