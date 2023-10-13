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
export class UsersComponent {
  users: User[];
  user$!: Observable<User[]>;
  selectedUser: User | null = null;

  @ViewChild('content', { static: false }) content: ElementRef;

  constructor(
    private user: AubeSportService,
    private authGuard: AuthGuardService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    if (this.authGuard.canActivate()) {
      console.log('before api call');
      this.user.getAllUsers().subscribe((data: UserList) => {
        this.users = data.elements;
      });
      console.log('after api call');
    }
  }

  viewUser(user: User) {
    this.selectedUser = user;
    this.modalService.open(this.content, { centered: true, size: 'lg' });
  }

  editUser(user: User) {

  }

  deleteUser(user: User) {

  }
}
