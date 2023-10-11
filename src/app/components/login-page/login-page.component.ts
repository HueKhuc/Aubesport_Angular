import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class LoginPageComponent {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  apiUri = 'http://localhost:8000/api/login_check';

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/'])
    }
  }

  login(){
    this.http.post<any>(
      this.apiUri,
      {
        "username": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }
    ).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/'])
    });
  }
}
