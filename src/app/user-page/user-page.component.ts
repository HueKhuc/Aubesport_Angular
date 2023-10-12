import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { UserAccount } from '../models/UserAccount.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {

  user: UserAccount;
  editingField: string = '';

  userFields = ['pseudo', 'bio', 'firstName', 'lastName', 'gender', 'birthday'];

  userFieldNames: { [key: string]: string } = {
    pseudo: 'Pseudo',
    bio: 'Bio',
    firstName: 'First Name',
    lastName: 'Last Name',
    gender: 'Gender',
    birthday: 'Birthday'
  };

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(response => {
      this.user = response;
    });
  }

  startEditing(field: string) {
    this.editingField = field;
  }

  cancelEditing() {
    this.editingField = '';
  }

  saveChanges() {
    this.userService.updateUser(this.user).subscribe(updatedUser => {
      console.log('Updated user:', updatedUser);
      this.editingField = '';
    });
  }
}
