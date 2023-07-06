import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {
  constructor(private prodServ: ProductsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const productId = route.params?.['id'];
    const productIndex = parseInt(productId, 10);

    if (isNaN(productIndex) || productIndex < 0 || productIndex >= this.prodServ.getProducts().length) {
      this.router.navigate(['products']);
      return false; // Prevent access to the route
    }

    return true; // Allow access to the route
  }
}