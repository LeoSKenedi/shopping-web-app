import { Component } from '@angular/core';
import { FavouriteService } from './favourite.service';
import { Product } from '../products/products.model';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { AuthService } from '../authentication/authentication.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {
  favProducts: Product[] = [];

  constructor(
    private favServ: FavouriteService,
    private router: Router,
    private prodServ: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    this.favServ.loadFavProductsFromLocalStorage(userId);
    this.favProducts = this.favServ.getFavProducts();
    this.favServ.favChanged.subscribe((favProducts: Product[]) => {
      this.favProducts = favProducts;
    });
  }

  onDelete(id: number) {
    const userId = this.authService.getUserId();
    this.favServ.deleteFavProduct(id, userId);
  }

  addToCart(product: Product) {
    const userId = this.authService.getUserId();
    this.favServ.addFavProduct(product, userId);
  }

  onNavigateToProductDetail(index: number) {
    this.router.navigate(['products', index]);
  }

  onClick() {
    this.router.navigate(['products']);
  }
}
