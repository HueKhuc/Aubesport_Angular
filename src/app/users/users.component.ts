import { Component, Input } from '@angular/core';
import { User } from '../models/User.model';
import { AubeSportService } from '../services/aubeSport.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[];
  user$!: Observable<User[]>;
  constructor(private user: AubeSportService) {}

  ngOnInit(): void {
    console.log('before api call');
    this.user.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
    console.log('after api call');
  }
}
