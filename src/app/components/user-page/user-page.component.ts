import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/User.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/Address.model';
import { AuthService } from 'src/app/services/authService';
import { TournamentService } from 'src/app/services/tournament.service';
import { TournamentRegistration } from 'src/app/models/TournamentRegistration.model';
import { ImageService } from 'src/app/services/image.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  currentTab = 'information';
  existedAddress = false;
  private userUuid: string;
  tournamentRegistrations: TournamentRegistration[];
  seeMore = false;
  isAdmin: boolean;
  imageData: SafeUrl;
  selectedFile: File | null = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private tournamentService: TournamentService,
    private router: Router,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.userUuid = this.authService.getConnectedUserId();

    this.isAdmin = this.authService.getConnectedUserRoles().includes('ROLE_ADMIN');

    this.route.paramMap.subscribe(params => {
      const userId = params.get('uuid');
      if (userId) {
        this.userUuid = userId;
      }
    });

    this.imageService.getImage(this.userUuid).subscribe((data: Blob) => {
      const imageUrl = URL.createObjectURL(data);
      this.imageData = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    })

    this.tournamentService.getTounamentRegistrationsOfUser(this.userUuid).subscribe(data => {
      this.tournamentRegistrations = data;
      this.tournamentRegistrations.forEach(tournamentRegistration => {
        this.tournamentService.getTournament(tournamentRegistration.tournamentUuid).subscribe(response => {
          tournamentRegistration.tournamentName = response.name;
          tournamentRegistration.tournamentStartingDate = response.startingDate;
          tournamentRegistration.tournamentEndingDate = response.endingDate;
        })
      })
    })


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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile instanceof Blob) {
      this.imageData = this.sanitizeUrl(URL.createObjectURL(this.selectedFile));
    }
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.imageService.postImage(this.userUuid, formData).subscribe(
        () => {
          this.selectedFile = null;
          this.isError = false;
          this.message = 'Image uploaded successfully.';
        },
        (error) => {
          this.message = error.error.detail;
          this.isError = true;
        }
      );
    }
  }

  showTab(tabName: string): void {
    this.currentTab = tabName;
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
