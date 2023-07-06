import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ProductsComponent } from './pages/products/products.component';
import { FavouriteComponent } from './pages/favourite/favourite.component';
import { CartComponent } from './pages/cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { SideNavComponent } from './sharepage/side-nav/side-nav.component';
import { BodyComponent } from './sharepage/body/body.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { ProductsService } from './pages/products/products.service';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { DialogBoxComponent } from './pages/dialog-box/dialog-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { CartService } from './pages/cart/cart.service';
import { FavouriteService } from './pages/favourite/favourite.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AuthenticationComponent,
    ProductsComponent,
    FavouriteComponent,
    CartComponent,
    HomeComponent,
    SideNavComponent,
    BodyComponent,
    SideNavComponent,
    ProductDetailComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [ProductsService, CartService, FavouriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
