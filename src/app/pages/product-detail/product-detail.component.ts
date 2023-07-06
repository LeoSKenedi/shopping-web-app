import { Component, OnInit } from '@angular/core';
import { Product } from '../products/products.model';
import { ProductsService } from '../products/products.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product: Product
  id: number

  constructor(private prodServ: ProductsService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.product = this.prodServ.getProduct(this.id)
    })
  } 

  onClick() {
    this.router.navigate(['products']);
  }
}
 