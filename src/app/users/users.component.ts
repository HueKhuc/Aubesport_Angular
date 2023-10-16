import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../models/User.model';
import { AubeSportService } from '../services/aubeSport.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserList } from '../models/UserList.model';
import { AuthGuardService } from '../services/authGuard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {
  users: User[];
  user$!: Observable<User[]>;
  selectedUser: User | null = null;

  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('deleteConfirmation', { static: false }) deleteConfirmation: ElementRef;
  @ViewChild('deleteInfo', { static: false }) deleteInfo: ElementRef;

  constructor(
    private user: AubeSportService,
    private authGuard: AuthGuardService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    if (this.authGuard.canActivate()) {
      this.user.getAllUsers().subscribe((data: UserList) => {
        this.users = data.elements;
      });
    }
  }

  viewUser(user: User) {
    this.selectedUser = user;
    this.modalService.open(this.content, { centered: true, size: 'lg' });
  }

  editUser(user: User | null) {
    if (user) {
      this.selectedUser = user;
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

      this.user.deleteUser(this.selectedUser).subscribe(
        () => {
          this.modalService.dismissAll('Delete');
          this.modalService.open(this.deleteInfo, { centered: true, size: 'md' });
        })
    }
  }
}
