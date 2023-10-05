import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AubeSportService {
  constructor(private http: HttpClient) {}

  users: User[];
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8000/users');
  }
}
