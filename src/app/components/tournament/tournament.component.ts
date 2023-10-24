import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/Tournament.model';
import { TournamentRegistration } from 'src/app/models/TournamentRegistration.model';
import { AuthService } from 'src/app/services/authService';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  tournaments: Tournament[];
  tournament: Tournament;
  tournamentUuid: string;
  userUuid: string;
  // tournamentRegistration: TournamentRegistration;
  submitted = false;
  message: string | null = null;
  isError: boolean;

  constructor(
    private tournamentService: TournamentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userUuid = this.authService.getConnectedUserId();

    this.tournamentService.getAllTournaments().subscribe(response => {
      this.tournaments = response;
    })
  }

  registerForTournament(tournament: Tournament) {
    if (this.submitted) {
      return;
    }

    const tournamentRegistration: TournamentRegistration = {
      tournamentUuid: tournament.uuid,
      userUuid: this.userUuid 
    }

    this.submitted = true;
    this.message = null;

    this.tournamentService.createTournamentRegistration(tournamentRegistration).subscribe(
      () => {
        this.submitted = false;
        this.message = 'Inscription a été effectué avec succès';
        this.isError = false;
        window.location.href = 'https://www.helloasso.com/associations/aubercorp/evenements/aubesport-1?_ga=2.128525644.1789605056.1694463122-262860388.1676530808&_gl=1%2atsxrfk%2a_ga%2aMjYyODYwMzg4LjE2NzY1MzA4MDg.%2a_ga_TKC826G3G2%2aMTY5NDQ5ODY5My40Ny4xLjE2OTQ0OTg4NTUuMzAuMC4w';
      },
      (error: { error: { detail: string | null, message: string | null; }; }) => {
        this.submitted = false;
        this.message = (error.error.detail)? error.error.detail : error.error.message;
        this.isError = true;
      }
    )
  }

}
