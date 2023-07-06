import { Component } from '@angular/core';
import { FavouriteService } from './favourite.service';
import { Product } from '../products/products.model';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {
  favProducts: Product[] = []
  constructor(private favServ: FavouriteService, private router: Router, private prodServ: ProductsService) {}

  ngOnInit() {
    this.favProducts = this.favServ.getFavProducts()
    this.favServ.favChanged.subscribe((favProducts: Product[]) => {
      this.favProducts = favProducts
    })
  }

  onDelete(id: number) {
    this.favServ.deleteFavProduct(id)
  }

  addToCart(product: Product) {
    this.prodServ.addProductToCart(product)
  }

  onNavigateToProductDetail(index: number) {
    this.router.navigate(['products', index])
  }
  onClick() {
    this.router.navigate(['products']);
  }
}
