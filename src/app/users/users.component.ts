import { Component, Input } from '@angular/core';
import { User } from '../models/User.model';
import { AubeSportService } from '../services/aubeSport.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserList } from '../models/UserList.model';
import { AuthGuardService } from '../services/authGuard.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[];
  user$!: Observable<User[]>;
  constructor(private user: AubeSportService, private authGuard: AuthGuardService) {}

  ngOnInit(): void {
    if (this.authGuard.canActivate()) {
      console.log('before api call');
      this.user.getAllUsers().subscribe((data: UserList) => {
        this.users = data.elements;
      });
      console.log('after api call');
    }
  }
}
