import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isMenuOpen = false;
  isHomePage: boolean;
  isMobile: boolean;

  constructor(private router: Router) {
    this.isHomePage = true;
    this.detectScreenWidth();
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.url === '/';
      }
    });
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
}
