import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { UserList } from '../models/UserList.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from '../models/Address.model';
import { AuthService } from './authService';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private headers: HttpHeaders;
  private api: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.api = 'http://localhost:8000/api/users';

      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`,
      });
  }

  getUserByUuid(userUuid: string): Observable<User> {
    return this.http.get<User>(`${this.api}/${userUuid}`, { headers: this.headers });
  }

  getAddressByUserUuid(userUuid: string): Observable<Address> {
    return this.http.get<Address>(`${this.api}/${userUuid}/address`, { headers: this.headers });
  }

  getAllUsers(currentPage: number, elementsPerPage: number): Observable<UserList> {
    return this.http.get<UserList>(`${this.api}?currentPage=${currentPage}&elementsPerPage=${elementsPerPage}`, { headers: this.headers });
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.api, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.api}/${user.uuid}`, user, { headers: this.headers });
  }

  updateAddress(userUuid: string, address: Address): Observable<Address> {
    return this.http.patch<Address>(`${this.api}/${userUuid}/address`, address, { headers: this.headers });
  }

  postAddress(userUuid: string, address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.api}/${userUuid}/address`, address, { headers: this.headers });
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this.api}/${user.uuid}`, { headers: this.headers });
  }
}
