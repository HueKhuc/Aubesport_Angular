import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../models/Token.model';
import jwt_decode from "jwt-decode";
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private jwt: string | null;
  private decoded: Token;

  private api: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.jwt = localStorage.getItem('token');

    if (this.jwt) {
      this.decoded = jwt_decode<Token>(this.jwt);
      this.api = `http://localhost:8000/api/users/${this.decoded.id}`;
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.jwt}`,
      });
    }
  }

  getUser(): Observable<User> {

    return this.http.get<User>(this.api, { headers: this.headers });
  }

  updateUser(updatedUser: User): Observable<User> {

    return this.http.patch<User>(this.api, updatedUser, { headers: this.headers });
  }
}