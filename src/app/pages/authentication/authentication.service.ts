import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Product } from '../products/products.model';
import { CartService } from '../cart/cart.service';
import { FavouriteService } from '../favourite/favourite.service';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
    cartProducts: Product[];
    favProducts: Product[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  check: boolean = false;
  adminMail = 'edwood@mail.com';

  constructor(private http: HttpClient, private router: Router, private cartServ: CartService, private favServ: FavouriteService) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDy6hOOFTrCHyOYBULaDFaVEyNKfknX1QI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
            [],
            []
          );
          this.cartServ.saveCartProductsToLocalStorage(resData.localId);
          this.favServ.saveFavProductsToLocalStorage(resData.localId);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDy6hOOFTrCHyOYBULaDFaVEyNKfknX1QI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          const userData = JSON.parse(localStorage.getItem('userData'));
          const cartProducts = userData ? userData.cartProducts : [];
          const favProducts = userData ? userData.favProducts : [];
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
            cartProducts,
            favProducts
          );
          this.cartServ.loadCartProductsFromLocalStorage(resData.localId);
          this.favServ.loadFavProductsFromLocalStorage(resData.localId);
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      cartProducts: Product[];
      favProducts: Product[];
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.cartProducts,
      userData.favProducts
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.cartServ.loadCartProductsFromLocalStorage(loadedUser.id);
      this.favServ.loadFavProductsFromLocalStorage(loadedUser.id)
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
    if (userData.email == this.adminMail) {
      this.check = true;
    } else {
      this.check = false;
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['authentication']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
    cartProducts: Product[],
    favProducts: Product[]
  ) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate,
      cartProducts,
      favProducts
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    if (user.email == this.adminMail) {
      this.check = true;
    } else {
      this.check = false;
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email was not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is wrong';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This account was disabled';
    }
    return throwError(errorMessage);
  }

  getAdmin() {
    return this.check;
  }

  updateCartProducts(products: Product[]) {
    const user = this.user.value;
    user.cartProducts = products;
    this.user.next(user);
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      userData.cartProducts = products;
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }

  updateFavProducts(products: Product[]) {
    const user = this.user.value;
    user.favProducts = products;
    this.user.next(user);
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      userData.favProducts = products;
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }
  getUserId() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    return userData ? userData.id : null;
  }
}