import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent  {


  isHomePage: boolean; 

  constructor(private router: Router) {
    this.isHomePage = true; 

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = (event.url === '/home');
      }
    });
    console.log(this.isHomePage);
  }
}


  // changeBackground(){
  //   document.querySelector('.navbar')?.classList.add('navbar-colored');
  //   document.querySelector('.navbar')?.classList.remove('navbar');
  //   console.log("le changement de couluer");
  //   console.log(document.querySelector('.navbar')?.classList);
  //   }
    // this.router.navigate('')
  
  // linear-gradient(157deg, rgba(1,15,105,0.9275910193178833) 23%, rgba(154,0,120,0.9303921397660627) 77%)

