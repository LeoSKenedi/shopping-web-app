import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./pages/authentication/authentication.component";
import { CartComponent } from "./pages/cart/cart.component";
import { FavouriteComponent } from "./pages/favourite/favourite.component";
import { ProductsComponent } from "./pages/products/products.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { ProductDetailGuard } from "./pages/product-detail/product-detail.guard";
import { OrderComponent } from "./pages/order/order.component";

const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'home', component: HomeComponent},
    {path:'authentication',component:AuthenticationComponent},
    {path:'cart',component:CartComponent},
    {path:'favourite',component:FavouriteComponent},
    {path: 'order', component:OrderComponent},
    {path:'products',component:ProductsComponent},
    {path:'products/:id',component:ProductDetailComponent, canActivate: [ProductDetailGuard]},
    {path:'**', redirectTo:'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}