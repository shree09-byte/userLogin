import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { LoginComponent } from '../login/login.component';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
    LoginComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  validationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mockDataService: MockDataService, // Use the mock data service for testing
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.validationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
    });

    // Subscribe to the user state changes
    this.userStore.email$.subscribe((email) =>
      this.validationForm.patchValue({ email })
    );

    this.userStore.mobile$.subscribe((mobile) =>
      this.validationForm.patchValue({ mobile })
    );
  }

  onSubmit() {
    const email = this.validationForm.value.email;
    const mobile = this.validationForm.value.mobile;

    if (email || mobile) {
      this.userStore.setEmail(email);
      this.userStore.setMobile(mobile);

      const contact = email || mobile;
      this.userStore.checkUserExists(contact); // Trigger the check effect
    } else {
      alert('Please enter either an email address or phone number.');
    }
  }
}
