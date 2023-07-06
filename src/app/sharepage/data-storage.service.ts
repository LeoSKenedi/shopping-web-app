import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductsService } from "../pages/products/products.service";
import { Product } from "../pages/products/products.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../pages/authentication/authentication.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private prodServ: ProductsService, private authServ: AuthService) {}

    storeProducts() {
        const products = this.prodServ.getProducts();
        return this.http.put('https://shopping-web-app-1c7de-default-rtdb.europe-west1.firebasedatabase.app/products.json', products)
        .subscribe(response => {
            console.log(response)
        })
    }

    fetchProducts() {
        return this.http.get<Product[]>('https://shopping-web-app-1c7de-default-rtdb.europe-west1.firebasedatabase.app/products.json')
        .pipe(map(products => {
            return products
        }), tap(products => {
            this.prodServ.setProducts(products)
        })) 
    }
}