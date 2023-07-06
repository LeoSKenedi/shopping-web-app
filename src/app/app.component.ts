import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './sharepage/data-storage.service';
import { AuthService } from './pages/authentication/authentication.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private dataStore: DataStorageService, private authService: AuthService) {}
  title = 'shopping-web-app';

  isSideNavCollapsed = false;
  screenWidth = 0;

  ngOnInit() {
    this.authService.autoLogin()
    this.dataStore.fetchProducts().subscribe()
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
