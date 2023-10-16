import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  private apiUri = 'http://localhost:8000/api/login_check';

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
