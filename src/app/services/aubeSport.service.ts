import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AubeSportService {
  private jwt: string|null; // Déplacez la récupération du JWT dans le constructeur

  constructor(private http: HttpClient) {
    // Récupérez le JWT depuis le localStorage dans le constructeur
    this.jwt = localStorage.getItem('jwt');
  }

  getAllUsers(): Observable<User[]> {
    // Créez un en-tête HTTP avec le JWT ici avant de faire la requête
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwt}`,
    });

    // Utilisez cet en-tête lors de l'envoi de la requête
    return this.http.get<User[]>('http://localhost:8000/users', { headers });
  }
}
