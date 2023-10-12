import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Token } from '../models/Token.model';
import jwt_decode from "jwt-decode";
import { UserAccount } from '../models/UserAccount.model';

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

    if (this.jwt === null) {
      throw new Error("Token not found");
    }

    this.decoded = jwt_decode<Token>(this.jwt);
    this.api = `http://localhost:8000/api/users/${this.decoded.id}`;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwt}`,
    });
  }

  getUser(): Observable<UserAccount> {

    return this.http.get<UserAccount>(this.api, { headers: this.headers });
  }

  updateUser(updatedUser: UserAccount): Observable<UserAccount> {

    return this.http.patch<UserAccount>(this.api, updatedUser, { headers: this.headers });
  }
}
