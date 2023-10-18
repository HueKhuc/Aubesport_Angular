import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserList } from '../models/UserList.model';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private jwt: string | null; // Déplacez la récupération du JWT dans le constructeur
  private headers: HttpHeaders;
  private api: string;

  constructor(private http: HttpClient) {
    this.api = 'http://localhost:8000/api/users/';

    // Récupérez le JWT depuis le localStorage dans le constructeur
    this.jwt = localStorage.getItem('token');

    if (this.jwt) {
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.jwt}`,
      });
    }
  }

  getAllUsers(): Observable<UserList> {
    return this.http.get<UserList>(this.api, { headers: this.headers });
  }

  updateUser(updatedUser: User): Observable<User> {
    return this.http.patch<User>(this.api + updatedUser.uuid, { headers: this.headers });
  }

  deleteUser(deletedUser: User): Observable<User> {
    return this.http.delete<User>(this.api + deletedUser.uuid, { headers: this.headers });
  }
}
