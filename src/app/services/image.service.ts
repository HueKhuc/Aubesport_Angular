import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './authService';

@Injectable({
  providedIn: 'root',
})

export class ImageService {
  private headers: HttpHeaders | null = null;
  private api = 'http://localhost:8000/api/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getImage(userUuid: string) {
    return this.http.get(`${this.api}/${userUuid}/image`, { headers: this.getAutorizationHeaders(), responseType: 'blob' });
  }

  postImage(userUuid: string, form: FormData) {
    return this.http.post(`${this.api}/${userUuid}/image`, form, { headers: this.getAutorizationHeaders() });
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
