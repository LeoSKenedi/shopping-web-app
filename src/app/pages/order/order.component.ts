import { Component, HostListener } from '@angular/core';
import { Order } from '../cart/order.model';
import { OrderService } from './order.service';
import { DataStorageService } from 'src/app/sharepage/data-storage.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
}) 
export class OrderComponent {
  orders: Order[]
  filteredOrders: Order[] = []
  searchQuery: string = ''
  myscreenWidth: number
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.myscreenWidth = window.innerWidth 
  }
  screenWidth = 0;

  constructor(private orderServ: OrderService, private dataStore: DataStorageService) {}

  ngOnInit() {
    this.dataStore.fetchOrders().subscribe((orders) => {
      this.orderServ.setOrders(orders);
    });

    this.orderServ.ordersChanged.subscribe((orders: Order[]) => {
      this.orders = orders;
    });

    this.setIntitialScreenWidth();
  }

  setIntitialScreenWidth() {
    this.myscreenWidth = window.innerWidth
  }

  performSearch() {
    // Perform search on the orders based on searchQuery
    if (this.searchQuery.trim() !== '') {
      this.filteredOrders = this.orders.filter((order) =>
        order.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredOrders = this.orders;
    }
  }

  sortProductsByAscendingPrice() {
    this.orders.sort((a, b) => a.totalPrice - b.totalPrice);
  }

  sortProductsByDescendingPrice() {
    this.orders.sort((a, b) => b.totalPrice - a.totalPrice);
  }

  onDelete(index: number) {
    this.orderServ.deleteOrder(index);
    this.dataStore.storeOrders()
  }

}
