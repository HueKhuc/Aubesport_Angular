import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isMenuOpen = false;
  isUserMenuOpen = false;
  isHomePage: boolean;
  isMobile: boolean;
  isAdmin = false;
  isLoggedIn = false;


  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.isHomePage = true;
    this.detectScreenWidth();
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.url === '/';
      }
    });
  }

  ngOnInit() {
    if (this.authService.getConnectedUserRoles().includes("ROLE_ADMIN")) {
      this.isAdmin = true;
    }

    this.isLoggedIn = this.authService.isLoggedIn();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectScreenWidth();
  }

  detectScreenWidth() {
    this.isMobile = window.innerWidth < 992;
  }

  logout() {
    this.authService.deleteToken();
    this.router.navigate(['login']);
  }
}
