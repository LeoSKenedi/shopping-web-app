import { Component, HostListener, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { FavouriteService } from '../favourite/favourite.service';
import { DataStorageService } from 'src/app/sharepage/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/authentication.service';

@Component({
  selector: 'app-products', 
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: Product[] = []
  filteredProducts: Product[] = []
  searchQuery: string = ''
  private userSub: Subscription
  isAuthenticated: boolean = false
  myscreenWidth: number
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.myscreenWidth = window.innerWidth 
  }
  screenWidth = 0;

  constructor(private prodServ: ProductsService, private router: Router, public dialog: MatDialog, private dataStore: DataStorageService, public authService: AuthService){}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user 
    })
    this.products = this.prodServ.getProducts()
    this.prodServ.productsChanged.subscribe((products: Product[]) => {
      this.products = products
    })
    this.setIntitialScreenWidth()
  }

  setIntitialScreenWidth() {
    this.myscreenWidth = window.innerWidth
  }

  performSearch() {
    // Perform search on the products based on searchQuery
    if (this.searchQuery.trim() !== '') {
      this.products = this.prodServ.getProducts().filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.products = this.prodServ.getProducts()
    }
  }

  onNavigateToProductDetail(index: number) {
    this.router.navigate(['products', index])
  }

  onDelete(id: number) {
    this.prodServ.deleteProduct(id) 
    this.dataStore.storeProducts()
  }

  openDialog(check?: boolean, id?: number, products?: Product) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true
    dialogConfig.data = products

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((data) => {
      if(data) {
        if(data && check == true) {
          this.updateProduct(id, data) 
        }
        else {
          this.addData(data)
        }
      }
    })
  }

  updateProduct(id:number, product: Product) {
    this.prodServ.updateProduct(id, product)
    this.dataStore.storeProducts() 
  }

  addData(data: Product) {
    this.prodServ.addProduct(data)
    this.dataStore.storeProducts()
  }

  addToCart(product: Product) {
    this.prodServ.addProductToCart(product)
  }

  addToFavourite(product: Product) {
    this.prodServ.addProductToFavourite(product)
  }
  sortProductsByAscendingPrice() {
    this.products.sort((a, b) => a.price - b.price);
  }

  sortProductsByDescendingPrice() {
    this.products.sort((a, b) => b.price - a.price);
  }
}
 