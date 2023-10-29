import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tournament } from '../models/Tournament.model';
import { AuthService } from './authService';
import { TournamentRegistration } from '../models/TournamentRegistration.model';
import { TournamentRegistrationList } from '../models/TournamentRegistrationList.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class TournamentService {
  private headers: HttpHeaders;
  private api: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.api = `${environment.apiUrl}/api`;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
    });
  }

  getAllTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.api}/tournaments`, { headers: this.headers });
  }

  getTournament(uuid: string): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.api}/tournaments/${uuid}`, { headers: this.headers });
  }

  createTournamentRegistration(tournamentRegistration: TournamentRegistration): Observable<TournamentRegistration> {
    return this.http.post<TournamentRegistration>(`${this.api}/tournament-registrations`, tournamentRegistration, { headers: this.headers });
  }

  getTounamentRegistrationsOfUser(uuid: string): Observable<TournamentRegistration[]> {
    return this.http.get<TournamentRegistration[]>(`${this.api}/users/${uuid}/tournament-registrations`, { headers: this.headers });
  }

  getAllTournamentRegistrations(): Observable<TournamentRegistrationList> {
    return this.http.get<TournamentRegistrationList>(`${this.api}/tournament-registrations`, { headers: this.headers });
  }

  acceptTournamentRegistration(uuid: string): Observable<TournamentRegistration> {
    return this.http.post<TournamentRegistration>(`${this.api}/tournament-registrations/${uuid}/accept`,null, { headers: this.headers });
  }

  refuseTournamentRegistration(uuid: string): Observable<TournamentRegistration> {
    // console.log(this.headers);
    return this.http.post<TournamentRegistration>(`${this.api}/tournament-registrations/${uuid}/refuse`,null, { headers: this.headers });
  }
}
