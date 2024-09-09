import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MockDataService } from '../../services/mock-data.service';
import { CommonModule } from '@angular/common';
import { UserStore } from '../user.store';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  showDiv: number = 1; // To control visibility of divs
  maxBirthDate: string | undefined;
  allowedOrganizations: { id: string; name: string }[] = []; // Allowed organization list from mock service
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userStore: UserStore, private mockDataService: MockDataService, private router: Router, private route: ActivatedRoute) {
    this.maxBirthDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      orgName: [''],
      orgId: [''],
      designation: [''],
      birthDate: [''],
      city: [''],
      pincode: ['']
    });

        // Retrieve query parameters and update store
        this.route.queryParams.subscribe((params) => {
          const contact = params['contact'];
          const type = params['type'];
    
          if (type === 'email' || type === 'phone') {
            this.userStore.setContact(contact);
            this.userStore.setType(type);
            this.signUpForm.patchValue({ email: contact });
          }
        });
  }

  onSubmit() {
    // Handle step 1 form submission
    if (this.signUpForm.valid) {
      // Update store with form data
      const { email, fullName, password } = this.signUpForm.value;
      this.userStore.setEmail(email);
      // Transition to the next step
      this.showDiv = 2;
    }
  }

  onSubmitStep2() {
    // Handle step 2 form submission
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      // Update store with step 2 data
      const orgId = this.signUpForm.controls['orgId'].value;
      const organization = this.allowedOrganizations.find(
        (org) => org.id === orgId
      );

      if (!organization) {
        this.errorMessage = 'Unknown organization-id';
        return;
      }
      // No errors, process submission
      this.errorMessage = '';
      this.userStore.setOrgName(formData.orgName);
      this.userStore.setOrgId(formData.orgId);
      this.userStore.setDesignation(formData.designation);
      this.userStore.setBirthDate(formData.birthDate);
      this.userStore.setCity(formData.city);
      this.userStore.setPincode(formData.pincode);

      // Handle form submission logic
      // Transition to success view or further processing
      this.showDiv = 3;
    }
  }

  onBack() {
    this.showDiv = 1;
  }
}
