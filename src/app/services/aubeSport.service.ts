import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserList } from '../models/UserList.model';

@Injectable({
  providedIn: 'root',
})

export class AubeSportService {
  private jwt: string | null; // Déplacez la récupération du JWT dans le constructeur
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // Récupérez le JWT depuis le localStorage dans le constructeur
    this.jwt = localStorage.getItem('token');
    if (this.jwt) {
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.jwt}`,
      });
    }
  }

  getAllUsers(): Observable<UserList> {
    // Utilisez cet en-tête lors de l'envoi de la requête
    return this.http.get<UserList>('http://localhost:8000/api/users', { headers: this.headers });
  }

  updateUser(updatedUser: User): Observable<User> {
    return this.http.patch<User>(`http://localhost:8000/api/users/${updatedUser.uuid}`, { headers: this.headers });
  }

  deleteUser(deleteUser: User): Observable<User> {
    return this.http.delete<User>(`http://localhost:8000/api/users/${deleteUser.uuid}`, { headers: this.headers });
  }
}
