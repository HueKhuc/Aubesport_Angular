import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/LoginResponse.model';
import { AuthService } from 'src/app/services/authService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {
  private apiUri = `${environment.apiUrl}/api/login_check`;
  submitted = false;
  message: string | null = null;
  isError: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    if (this.submitted) {
      return;
    }

    this.submitted = true;
    this.message = null;

    this.http.post<LoginResponse>(
      this.apiUri,
      {
        "username": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }
    ).subscribe(response => {
      this.submitted = false;
      this.authService.saveToken(response.token);
      this.isError = false;
      this.router.navigate(['/']);
    },
    (error: { error: { message: string | null; }; }) => {
      this.submitted = false;
      this.message = error.error.message;
      this.isError = true;
    });
  }
}
