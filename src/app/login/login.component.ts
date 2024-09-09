import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserStore } from '../user.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showFirstDiv: boolean = true;
  showError: boolean = false; // Declare showError property

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userStore: UserStore // Inject the UserStore
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });
  }

  ngOnInit() {
    // Retrieve query parameters and update store
    this.route.queryParams.subscribe((params) => {
      const contact = params['contact'];
      const type = params['type'];

      if (type === 'email' || type === 'phone') {
        this.userStore.setContact(contact);
        this.userStore.setType(type);
        this.loginForm.patchValue({ email: contact });
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const emailOrPhone = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Use the store to validate user
      this.userStore.validateUser({ emailOrPhone, password });
      this.userStore.isAuthenticated$.subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.showFirstDiv = false;
        } else {
          this.showError = true;
        }
      });
    }
  }
}
