import { Component, EventEmitter, OnDestroy, OnInit, Output, HostListener } from '@angular/core';
import { navbarData } from './nav-data';
import { AuthService } from 'src/app/pages/authentication/authentication.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  private userSub: Subscription

  constructor(public authService: AuthService, private dataStore: DataStorageService) {}

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  myscreenWidth: number
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.myscreenWidth = window.innerWidth 
  }
  screenWidth = 0;
  navData = navbarData;
  isAuthenticated = false;
  Subscription: Subscription;
  Admin: boolean

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user 
      this.Admin = this.authService.getAdmin()
    })
    this.setIntitialScreenWidth()
  }

  setIntitialScreenWidth() {
    this.myscreenWidth = window.innerWidth
  }

  onLogout() {
    this.authService.logout()
  }

  onToggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  onCloseCollapse(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  onSave() {
    this.dataStore.storeProducts()
  }

  onFetch() {
    this.dataStore.fetchProducts().subscribe()
  }
}
