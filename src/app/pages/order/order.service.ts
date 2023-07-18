import { EventEmitter, Injectable } from "@angular/core";
import { Order } from "../cart/order.model";


@Injectable()
export class OrderService {

    orders: Order[] = []
    ordersChanged = new EventEmitter<Order[]>()

    setOrders (orders: Order[]) {
        this.orders = orders
        this.ordersChanged.emit(this.orders.slice())
    }
    
    getOrders() {
        return this.orders.slice()
    }

    addOrder(order: Order) {
        this.orders.push(order)
        this.ordersChanged.emit(this.orders.slice())
    }

    updateProduct(id: number, order: Order) {
        this.orders[id] = order;
        this.ordersChanged.emit(this.orders.slice())
    }
    
    deleteOrder(id: number) {
        this.orders.splice(id, 1)
        this.ordersChanged.emit(this.orders.slice())
    }
}