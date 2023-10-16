import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/LoginResponse.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  private apiUri = 'http://localhost:8000/api/login_check';
  submitted = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/'])
    }
  }
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  login() {
    if (this.submitted) {
      return;
    }

    this.submitted = true;

    this.http.post<LoginResponse>(
      this.apiUri,
      {
        "username": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }
    ).subscribe(response => {
      this.submitted = false;
      localStorage.setItem('token', response.token);
      this.router.navigate(['/'])
    });
  }
}