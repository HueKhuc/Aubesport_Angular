import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../models/User.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent implements OnInit {

  user: User;
  profileForm: FormGroup;
  submitted = false;
  message: string | null = null;
  isError: boolean;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(response => {
      this.user = response;
    });

    this.profileForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }],
      pseudo: [],
      bio: [],
      firstName: [],
      lastName: [],
      gender: [],
      birthday: []
    });

    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.profileForm.patchValue({
        email: user.email,
        pseudo: user.pseudo,
        bio: user.bio,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        birthday: user.birthday
      });
    });
  }

  onSubmit() {
    if (this.submitted) {
      return;
    }
    
    const updatedUser: User = {
      ...this.user,
      pseudo: this.profileForm.get('pseudo')?.value,
      bio: this.profileForm.get('bio')?.value,
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      gender: this.profileForm.get('gender')?.value,
      birthday: this.profileForm.get('birthday')?.value,
    };

    this.submitted = true;
    this.message = null;

    this.userService.updateUser(updatedUser).subscribe(
      () => {
        this.submitted = false;
        this.message = 'Profile updated successfully.';
        this.isError = false;
      },
      (error) => {
        this.submitted = false;
        this.message = error.error.detail;
        this.isError = true;
      }
    );
  }
}
