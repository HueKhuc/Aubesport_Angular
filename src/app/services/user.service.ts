import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { UserList } from '../models/UserList.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../models/Token.model';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private jwt: string | null; // Déplacez la récupération du JWT dans le constructeur
  private headers: HttpHeaders;
  private api: string;
  private decoded: Token;
  private apiUser: string;

  constructor(private http: HttpClient) {
    this.api = 'http://localhost:8000/api/users/';

    // Récupérez le JWT depuis le localStorage dans le constructeur
    this.jwt = localStorage.getItem('token');

    if (this.jwt) {
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.jwt}`,
      });

      this.decoded = jwt_decode<Token>(this.jwt);
      this.apiUser = this.api + this.decoded.id;
    }
  }

  getAllUsers(): Observable<UserList> {
    return this.http.get<UserList>(this.api, { headers: this.headers });
  }

  deleteUser(deletedUser: User): Observable<User> {
    return this.http.delete<User>(this.api + deletedUser.uuid, { headers: this.headers });
  }

  getUser(): Observable<User> {

    return this.http.get<User>(this.apiUser, { headers: this.headers });
  }

  updateUser(updatedUser: User): Observable<User> {

    return this.http.patch<User>(this.apiUser, updatedUser, { headers: this.headers });
  }
}
