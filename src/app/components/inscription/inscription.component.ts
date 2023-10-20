import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent implements OnInit {
  submitted = false;
  inscriptionForm: FormGroup;
  message: string | null = null;
  isError = true;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.inscriptionForm = this.formBuilder.group({
      email: [[], [Validators.required, Validators.email]],
      password: [[], Validators.required],
      pseudo: [],
      bio: [],
      firstName: [],
      lastName: [],
      gender: [],
      birthday: [],
    });
  }
  onSubmit() {
    if (this.submitted) {
      return;
    }

    const newUser: User =
    {
      email: this.inscriptionForm.get('email')?.value,
      password: this.inscriptionForm.get('password')?.value,
      pseudo: this.inscriptionForm.get('pseudo')?.value,
      bio: this.inscriptionForm.get('bio')?.value,
      firstName: this.inscriptionForm.get('firstName')?.value,
      lastName: this.inscriptionForm.get('lastName')?.value,
      gender: this.inscriptionForm.get('gender')?.value,
      birthday: this.inscriptionForm.get('birthday')?.value,
    };

    this.submitted = true;
    this.message = null;

    this.userService.postUser(newUser).subscribe(
      () => {
        this.submitted = false;
        this.message = 'Profile created successfully.';
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
