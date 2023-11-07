import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/models/Tournament.model';
import { TournamentRegistration } from 'src/app/models/TournamentRegistration.model';
import { TournamentRegistrationList } from 'src/app/models/TournamentRegistrationList.model';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/authService';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tournament-registrations',
  templateUrl: './tournament-registrations.component.html',
  styleUrls: ['./tournament-registrations.component.css']
})
export class TournamentRegistrationsComponent {
  registeredUser: User;
  users: User[];
  user$!: Observable<User[]>;
  selectedUser: User | null = null;
  totalOfPages: number;
  currentPage = 1;
  elementsPerPage = 10;
  nextPage: number | null;
  previousPage: number | null;
  tournaments: Tournament[];
  tournamentRegistrations: TournamentRegistration[];
  currentTab = 'users';
  message: string | null = null;
  isError: boolean;
  submitted = false;
  isAccessDenied: boolean;

  constructor(
    private userService: UserService,
    private tournamentService: TournamentService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.authService.getConnectedUserRoles().includes("ROLE_ADMIN")) {
      this.fetchData();

      this.tournamentService.getAllTournaments().subscribe(response => {
        this.tournaments = response;
      })

      this.tournamentService.getAllTournamentRegistrations(this.currentPage, this.elementsPerPage).subscribe(data => {
        this.tournamentRegistrations = data.elements;

        this.tournamentRegistrations.forEach(tournamentRegistration => {
          this.userService.getUserByUuid(tournamentRegistration.userUuid).subscribe(response => {
            tournamentRegistration.userEmail = response.email;
          })

          this.tournamentService.getTournament(tournamentRegistration.tournamentUuid).subscribe(response => {
            tournamentRegistration.tournamentName = response.name;
          })
        })
      })

      this.isAccessDenied = false;
    } else {
      this.isAccessDenied = true;
    }
  }

  accept(tournamentRegistration: TournamentRegistration) {
    this.message = null;

    if (tournamentRegistration.uuid) {
      this.tournamentService.acceptTournamentRegistration(tournamentRegistration.uuid).subscribe(
        (response) => {
          this.message = 'Updated successfully.';
          this.isError = false;
          tournamentRegistration.status = response.status;
        },
        (error) => {
          this.message = error.error.message;
          this.isError = true;
        }
      );
    }
  }

  refuse(tournamentRegistration: TournamentRegistration) {
    this.message = null;

    if (tournamentRegistration.uuid) {
      this.tournamentService.refuseTournamentRegistration(tournamentRegistration.uuid).subscribe(
        (response) => {
          this.message = 'Updated successfully.';
          this.isError = false;
          tournamentRegistration.status = response.status;
        },
        (error) => {
          this.message = error.error.message;
          this.isError = true;
        }
      )
    }
  }

  fetchData() {
    this.message = null;

    this.tournamentService.getAllTournamentRegistrations(this.currentPage, this.elementsPerPage).subscribe((data: TournamentRegistrationList) => {
      this.tournamentRegistrations = data.elements;
      this.nextPage = data.nextPage;
      this.previousPage = data.previousPage;
      this.totalOfPages = data.totalOfPages;
    });
  }

  onPreviousPage() {
    if (this.previousPage) {
      this.currentPage = this.previousPage;
      this.fetchData();
    }
  }

  onNextPage() {
    if (this.nextPage) {
      this.currentPage = this.nextPage;
      this.fetchData();
    }
  }

  onElementsPerPageChange(event: Event) {
    const selectedValue = parseInt((event.target as HTMLSelectElement).value, 10);
    this.elementsPerPage = selectedValue;
    this.fetchData();
  }
}