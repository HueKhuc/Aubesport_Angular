import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { UserList } from '../models/UserList.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from '../models/Address.model';
import { AuthService } from './authService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private headers: HttpHeaders | null = null;
  private api = `${environment.apiUrl}/api/users`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getUserByUuid(userUuid: string): Observable<User> {
    return this.http.get<User>(`${this.api}/${userUuid}`, { headers: this.getAutorizationHeaders() });
  }

  getAddressByUserUuid(userUuid: string): Observable<Address> {
    return this.http.get<Address>(`${this.api}/${userUuid}/address`, { headers: this.getAutorizationHeaders() });
  }

  getAllUsers(currentPage: number, elementsPerPage: number): Observable<UserList> {
    return this.http.get<UserList>(`${this.api}?currentPage=${currentPage}&elementsPerPage=${elementsPerPage}`, { headers: this.getAutorizationHeaders() });
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.api, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.api}/${user.uuid}`, user, { headers: this.getAutorizationHeaders() });
  }

  updateAddress(userUuid: string, address: Address): Observable<Address> {
    return this.http.patch<Address>(`${this.api}/${userUuid}/address`, address, { headers: this.getAutorizationHeaders() });
  }

  postAddress(userUuid: string, address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.api}/${userUuid}/address`, address, { headers: this.getAutorizationHeaders() });
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this.api}/${user.uuid}`, { headers: this.getAutorizationHeaders() });
  }

  private getAutorizationHeaders(): HttpHeaders {
    if (this.headers === null) {
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`,
      });
    }

    return this.headers;
  }
}
