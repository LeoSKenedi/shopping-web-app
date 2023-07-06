import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './authentication.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnDestroy{
  isLoginMode = true;
  error: string = null

  private closeSub: Subscription

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return
    }
    const email = form.value.email
    const password = form.value.password
    let authObs: Observable<AuthResponseData>

    if(this.isLoginMode){
      authObs = this.authService.login(email,password)
    } else {
      authObs = this.authService.signup(email,password)
    }
    authObs.subscribe(resData => {
      console.log(resData);
      this.router.navigate(['/products'])
    }, errorMessage => {
      console.log(errorMessage)
      this.error = errorMessage;
    })
    form.reset()
  }
  
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}