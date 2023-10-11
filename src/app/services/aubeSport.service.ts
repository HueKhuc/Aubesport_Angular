import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserList } from '../models/UserList.model';

@Injectable({
  providedIn: 'root',
})
export class AubeSportService {
  private jwt: string|null; // Déplacez la récupération du JWT dans le constructeur

  constructor(private http: HttpClient) {
    // Récupérez le JWT depuis le localStorage dans le constructeur
    // this.jwt = localStorage.getItem('jwt');
    this.jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTY5NDU5NjQsImV4cCI6MTY5Njk0OTU2NCwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImVtYWlsNUBnbWFpbC5jb20ifQ.DSUvkUmVuiRZTw2dMddar3zFEPTi4shNIdNpfc6CP3wqnmiEFvyKDmM1WbARy2nxmnsFKRV5Qhbzvn_LV6cgny03ZHA81_AgaqbHgDrroWYzMjUwlOmoJIxrSyHJYPLki94zVGkYgRoNhDEkBvD_oMFci_HncOpOPc8lD9e0CXIR4PH1ovPeubYXxwfh3YdTENLmg_XqLO-K3QsJ4IV6-vLNlSMGNo8nrSVxPLqMO91N-7tqonQX7TpPSxEWjq0nOTFai9JzCvQyQhCxLkaX7kedFLvycS9bhgXnXicQMFM4EvEh43TiLsKNeV35g-D-kyVcduR8fzQofN5PyzWGzw'
  }

  getAllUsers(): Observable<UserList> {
    // Créez un en-tête HTTP avec le JWT ici avant de faire la requête
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwt}`,
    });

    // Utilisez cet en-tête lors de l'envoi de la requête
    return this.http.get<UserList>('http://localhost:8000/api/users', { headers });
  }
}
