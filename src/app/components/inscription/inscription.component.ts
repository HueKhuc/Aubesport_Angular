import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent {
  submitted = false;
  inscriptionForm: FormGroup;
  message: string | null = null;
  isError: boolean;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.inscriptionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      pseudo: [''],
      bio: [''],
      firstName: [''],
      lastName: [''],
      gender: [''],
      birthday: [{ value: Date }],
    });
  }
  onSubmit() {
    if (this.submitted) {
      return;
    }

    const newUser: User =
    {
      email: this.inscriptionForm.get('email')?.value ?? null,
      password: this.inscriptionForm.get('password')?.value ?? null,
      pseudo: this.inscriptionForm.get('pseudo')?.value ?? null,
      bio: this.inscriptionForm.get('bio')?.value ?? null,
      firstName: this.inscriptionForm.get('firstName')?.value ?? null,
      lastName: this.inscriptionForm.get('lastName')?.value ?? null,
      gender: this.inscriptionForm.get('gender')?.value ?? null,
      birthday: this.inscriptionForm.get('birthday')?.value ?? null,
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
