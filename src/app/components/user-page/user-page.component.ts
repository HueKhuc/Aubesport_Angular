import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/User.model';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/models/Address.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent implements OnInit {

  user: User;
  profileForm: FormGroup;
  address: Address;
  addressForm: FormGroup;
  submitted = false;
  message: string | null = null;
  isError: boolean;
  currentForm = 1;
  existedAddress = false;
  private userUuid: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userUuid = this.userService.getUuidFromToken();

    this.route.paramMap.subscribe(params => {
      const userId = params.get('uuid');
      if (userId) {
        this.userUuid = userId;
      }
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

    this.addressForm = this.formBuilder.group({
      streetName: [],
      streetNumber: [],
      city: [],
      postalCode: []
    });

    this.userService.getUserByUuid(this.userUuid).subscribe(response => {
      this.user = response;
      this.profileForm.patchValue({
        email: this.user.email,
        pseudo: this.user.pseudo,
        bio: this.user.bio,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        gender: this.user.gender,
        birthday: this.user.birthday
      });
    });

    this.userService.getAddressByUserUuid(this.userUuid).subscribe(response => {
      this.address = response;
      this.existedAddress = true;

      this.addressForm.patchValue({
        streetName: this.address.streetName,
        streetNumber: this.address.streetNumber,
        city: this.address.city,
        postalCode: this.address.postalCode
      });
    });
  }

  showForm(formNumber: number): void {
    this.currentForm = formNumber;
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

  getSubmittedAddress() {
    const submittedAddress: Address = {
      ...this.address,
      streetName: this.addressForm.get('streetName')?.value,
      streetNumber: this.addressForm.get('streetNumber')?.value,
      city: this.addressForm.get('city')?.value,
      postalCode: this.addressForm.get('postalCode')?.value,
    };

    return submittedAddress;
  }

  onUpdateAddressSubmit() {
    if (this.submitted) {
      return;
    }

    const updatedAddress = this.getSubmittedAddress();

    this.submitted = true;
    this.message = null;

    this.userService.updateAddress(this.userUuid, updatedAddress).subscribe(
      () => {
        this.submitted = false;
        this.message = 'Address updated successfully.';
        this.isError = false;
      },
      (error: { error: { detail: string | null; }; }) => {
        this.submitted = false;
        this.message = error.error.detail;
        this.isError = true;
      }
    );
  }

  onCreateAddressSubmit() {
    if (this.submitted) {
      return;
    }

    const createdAddress = this.getSubmittedAddress();

    this.submitted = true;
    this.message = null;

    this.userService.postAddress(this.userUuid, createdAddress).subscribe(
      () => {
        this.submitted = false;
        this.message = 'Address updated successfully.';
        this.isError = false;
      },
      (error: { error: { detail: string | null; }; }) => {
        this.submitted = false;
        this.message = error.error.detail;
        this.isError = true;
      }
    );
  }
}
