import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MockDataService } from '../services/mock-data.service';

interface UserState {
  email: string;
  contact: string;
  type: string;
  showError: boolean;
  isAuthenticated: boolean;
  orgName: string;
  orgId: string;
  designation: string;
  birthDate: string;
  city: string;
  pincode: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserStore extends ComponentStore<UserState> {
  constructor(private mockDataService: MockDataService) {
    super({
      email: '',
      contact: '',
      type: '',
      showError: false,
      isAuthenticated: false,
      orgName: '',
      orgId: '',
      designation: '',
      birthDate: '',
      city: '',
      pincode: '',
    });
  }

  // Selectors
  readonly email$ = this.select((state) => state.email);
  readonly contact$ = this.select((state) => state.contact);
  readonly type$ = this.select((state) => state.type);
  readonly showError$ = this.select((state) => state.showError);
  readonly isAuthenticated$ = this.select((state) => state.isAuthenticated);
  readonly orgName$ = this.select((state) => state.orgName);
  readonly orgId$ = this.select((state) => state.orgId);
  readonly designation$ = this.select((state) => state.designation);
  readonly birthDate$ = this.select((state) => state.birthDate);
  readonly city$ = this.select((state) => state.city);
  readonly pincode$ = this.select((state) => state.pincode);

  // Updaters
  readonly setEmail = this.updater((state, email: string) => ({
    ...state,
    email,
  }));

  readonly setContact = this.updater((state, contact: string) => ({
    ...state,
    contact,
  }));

  readonly setType = this.updater((state, type: string) => ({
    ...state,
    type,
  }));

  readonly setShowError = this.updater((state, showError: boolean) => ({
    ...state,
    showError,
  }));

  readonly setIsAuthenticated = this.updater((state, isAuthenticated: boolean) => ({
    ...state,
    isAuthenticated,
  }));

  readonly setOrgName = this.updater((state, orgName: string) => ({
    ...state,
    orgName,
  }));

  readonly setOrgId = this.updater((state, orgId: string) => ({
    ...state,
    orgId,
  }));

  readonly setDesignation = this.updater((state, designation: string) => ({
    ...state,
    designation,
  }));

  readonly setBirthDate = this.updater((state, birthDate: string) => ({
    ...state,
    birthDate,
  }));

  readonly setCity = this.updater((state, city: string) => ({
    ...state,
    city,
  }));

  readonly setPincode = this.updater((state, pincode: string) => ({
    ...state,
    pincode,
  }));

  // Effects
  readonly validateUser = this.effect((params$: Observable<{ emailOrPhone: string; password: string }>) => {
    return params$.pipe(
      tap(({ emailOrPhone, password }) => {
        this.mockDataService.validateUser(emailOrPhone, password).subscribe((isValid) => {
          this.setIsAuthenticated(isValid);
          this.setShowError(!isValid);
        });
      })
    );
  });

  readonly checkUserExists = this.effect((params$: Observable<{ contact: string; type: string }>) => {
    return params$.pipe(
      tap(({ contact, type }) => {
        this.mockDataService.checkUserExists(contact).subscribe((userExists) => {
          if (userExists) {
            this.setType(type);
            this.setEmail(contact);
          } else {
            this.setShowError(true);
          }
        });
      })
    );
  });
}
