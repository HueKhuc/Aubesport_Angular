import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {

  constructor(private router: Router) {}
  
  canActivate() {
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      this.router.navigate(['/login']);

      return false;
    }
  }
}
