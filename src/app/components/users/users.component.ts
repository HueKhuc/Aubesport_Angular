import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserList } from '../../models/UserList.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TournamentService } from 'src/app/services/tournament.service';
import { Tournament } from 'src/app/models/Tournament.model';
import { TournamentRegistration } from 'src/app/models/TournamentRegistration.model';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {
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

  @ViewChild('deleteConfirmation', { static: false }) deleteConfirmation: ElementRef;
  @ViewChild('deleteInfo', { static: false }) deleteInfo: ElementRef;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router,
    private tournamentService: TournamentService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.authService.getConnectedUserRoles().includes("ROLE_ADMIN")) {
      this.fetchData();

      this.tournamentService.getAllTournaments().subscribe(response => {
        this.tournaments = response;
      })

      this.tournamentService.getAllTournamentRegistrations().subscribe(data => {
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

  redirectToHomepage() {
    this.router.navigate(['/'])
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

  showTab(tabName: string): void {
    this.currentTab = tabName;
  }

  fetchData() {
    this.message = null;

    this.userService.getAllUsers(this.currentPage, this.elementsPerPage).subscribe((data: UserList) => {
      this.users = data.elements;
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

  onModify(user: User | null) {
    if (user) {
      this.selectedUser = user;
      this.router.navigate(['user', user.uuid]);
    }
  }

  confirmDeleteUser(user: User | null) {
    if (user) {
      this.selectedUser = user;
      this.modalService.open(this.deleteConfirmation, { centered: true, size: 'md' });
    }
  }

  deleteUser(user: User | null) {
    if (user) {
      this.selectedUser = user;
      this.submitted = true;

      this.userService.deleteUser(this.selectedUser).subscribe(
        () => {
          this.modalService.dismissAll('Delete');
          this.modalService.open(this.deleteInfo, { centered: true, size: 'md' });
          user.deletedAt = new Date();
          this.submitted = false;
        })
    }
  }
}
