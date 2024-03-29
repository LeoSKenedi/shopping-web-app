import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from '../products/products.model';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { AuthService } from '../authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox2Component } from '../dialog-box2/dialog-box2.component';
import { OrderService } from '../order/order.service';
import { DataStorageService } from 'src/app/sharepage/data-storage.service';
import { Order } from './order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  myscreenWidth: number;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.myscreenWidth = window.innerWidth;
  }
  screenWidth = 0;

  constructor(
    private cartServ: CartService,
    private router: Router,
    private prodServ: ProductsService,
    private authService: AuthService,
    public dialog: MatDialog,
    private orderServ: OrderService,
    private dataStore: DataStorageService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    this.cartServ.loadCartProductsFromLocalStorage(userId);
    this.cartProducts = this.cartServ.getCartProducts();
    this.cartServ.cartChanged.subscribe((cartProducts: Product[]) => {
      this.cartProducts = cartProducts;
    });
    this.setIntitialScreenWidth();
  }

  setIntitialScreenWidth() {
    this.myscreenWidth = window.innerWidth;
  }

  performSearch() {
    // Perform search on the products based on searchQuery
    if (this.searchQuery.trim() !== '') {
      this.cartProducts = this.prodServ
        .getProducts()
        .filter((product) =>
          product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    } else {
      this.cartProducts = this.cartServ.getCartProducts();
    }
  }

  openDialog(cartProducts: Product[]) {
    const dialogRef = this.dialog.open(DialogBox2Component, {
      width: '500px',
      disableClose: true,
      data: { cartProducts }
    });
  
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.addData(data, cartProducts);
      }
    });
  }

  addData(data: any, cartProducts: Product[]) {
    const totalPrice = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    const order = new Order(data.name, data.surname, data.phone, data.email, cartProducts, totalPrice);
    this.orderServ.addOrder(order);
    this.dataStore.storeOrders()
  }  

  addToFavourite(product: Product) {
    this.prodServ.addProductToFavourite(product);
  }

  onDelete(id: number) {
    const userId = this.authService.getUserId();
    this.cartServ.deleteCartProduct(id, userId);
  }

  onNavigateToProductDetail(index: number) {
    this.router.navigate(['products', index]);
  }

  increaseQuantity(product: Product) {
    product.quantity++;
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  onClick() {
    this.router.navigate(['products']);
  }

  sortProductsByAscendingPrice() {
    this.cartProducts.sort((a, b) => a.price - b.price);
  }

  sortProductsByDescendingPrice() {
    this.cartProducts.sort((a, b) => b.price - a.price);
  }
}