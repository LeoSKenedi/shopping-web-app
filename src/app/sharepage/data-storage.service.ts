import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductsService } from "../pages/products/products.service";
import { Product } from "../pages/products/products.model";
import { map, tap } from "rxjs";

import { Order } from "../pages/cart/order.model";
import { OrderService } from "../pages/order/order.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private prodServ: ProductsService, private orderServ: OrderService) {}

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

    storeOrders() {
        const orders = this.orderServ.getOrders();
        return this.http.put('https://shopping-web-app-1c7de-default-rtdb.europe-west1.firebasedatabase.app/orders.json', orders)
        .subscribe(response => {
            console.log(response)
        })
    }

    fetchOrders() {
        return this.http.get<Order[]>('https://shopping-web-app-1c7de-default-rtdb.europe-west1.firebasedatabase.app/orders.json')
        .pipe(map(orders => {
            return orders
        }), tap(orders => {
            this.orderServ.setOrders(orders)
        })) 
    }
}