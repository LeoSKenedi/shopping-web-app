import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from '../products/products.model';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [] 
  filteredProducts: Product[] = []
  searchQuery: string = ''
  myscreenWidth: number
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.myscreenWidth = window.innerWidth 
  }
  screenWidth = 0;
  constructor(private cartServ: CartService, private router: Router, private prodServ: ProductsService) {}

  ngOnInit() {
    this.cartProducts = this.cartServ.getCartProducts()
    this.cartServ.cartChanged.subscribe((cartProducts: Product[]) => {
      this.cartProducts = cartProducts
    })
    this.setIntitialScreenWidth()
  }

  setIntitialScreenWidth() {
    this.myscreenWidth = window.innerWidth
  }

  performSearch() {
    // Perform search on the products based on searchQuery
    if (this.searchQuery.trim() !== '') {
      this.cartProducts = this.prodServ.getProducts().filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.cartProducts = this.cartServ.getCartProducts()
    }
  }

  addToFavourite(product: Product) {
    this.prodServ.addProductToFavourite(product) 
  }

  onDelete(id: number) {
    this.cartServ.deleteCartProduct(id)
  }

  onNavigateToProductDetail(index: number) {
    this.router.navigate(['products', index])
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
