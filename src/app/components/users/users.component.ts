import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserList } from '../../models/UserList.model';
import { AuthGuardService } from '../../services/authGuard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {
  users: User[];
  user$!: Observable<User[]>;
  selectedUser: User | null = null;
  totalOfPages: number;
  currentPage = 1;
  elementsPerPage = 10;
  nextPage: number | null;
  previousPage: number | null;

  @ViewChild('deleteConfirmation', { static: false }) deleteConfirmation: ElementRef;
  @ViewChild('deleteInfo', { static: false }) deleteInfo: ElementRef;

  constructor(
    private userService: UserService,
    private authGuard: AuthGuardService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authGuard.canActivate()) {
      this.fetchData();
    }
  }

  fetchData() {
    this.userService.getAllUsers(this.currentPage, this.elementsPerPage).subscribe((data: UserList) => {
      this.users = data.elements;
      this.totalOfPages = data.totalOfPages;
      this.nextPage = data.nextPage;
      this.previousPage = data.previousPage;
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

      this.userService.deleteUser(this.selectedUser).subscribe(
        () => {
          this.modalService.dismissAll('Delete');
          this.modalService.open(this.deleteInfo, { centered: true, size: 'md' });
        })
    }
  }
}
