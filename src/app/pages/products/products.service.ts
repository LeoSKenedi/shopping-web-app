import { CartService } from "../cart/cart.service"
import { FavouriteService } from "../favourite/favourite.service"
import { Product } from "./products.model"
import { EventEmitter, Injectable } from '@angular/core'

@Injectable()
export class ProductsService {

  constructor(private cartServ: CartService, private favServ: FavouriteService) {}

  productsChanged = new EventEmitter<Product[]>()
  // products: Product[] = [
  //   new Product('MacBook','https://img.us.news.samsung.com/us/wp-content/uploads/2019/01/14103833/Notebook-9-Pro-KV-1.jpg','Good one',3000, 2021,'M1','256GB','8GB','1280px'),
  //   new Product('TopBook','https://img.us.news.samsung.com/us/wp-content/uploads/2019/01/14103833/Notebook-9-Pro-KV-1.jpg','Best one',5000, 2022,'M2','512GB','16GB','1920px')
  // ]

  products: Product[] = []

  setProducts(products: Product[]) {
    this.products = products
    this.productsChanged.emit(this.products.slice())
  }

  getProducts() {
    return this.products.slice()
  }

  getProduct(index: number) {
   return this.products[index]
  }

  addProduct(data: Product) {
    this.products.push(data)
    this.productsChanged.emit(this.products.slice())
  }

  updateProduct(id: number, product : Product) {
    this.products[id] = product;
    this.productsChanged.emit(this.products.slice())
  }

  deleteProduct(id: number) {
    this.products.splice(id, 1)
    this.productsChanged.emit(this.products.slice())
  }
 
  addProductToCart(product: Product) {
    this.cartServ.addCartProduct(product)
  }

  addProductToFavourite(product: Product) {
    this.favServ.addFavProduct(product)
  }
}