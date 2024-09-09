import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { MockDataService } from './mock-data.service';
import { Router } from '@angular/router';

interface UserState {
  email: string;
  mobile: string;
  userExists: boolean | null; // Whether the user exists or not
  type: 'email' | 'phone' | null; // Type of contact
}

@Injectable({
  providedIn: 'root',
})
export class UserStoreService extends ComponentStore<UserState> {

  constructor(private mockDataService: MockDataService,private router: Router,) {
    super({
      email: '',
      mobile: '',
      userExists: null,
      type: null,
    });
  }

  // Selectors
  readonly email$ = this.select((state) => state.email);
  readonly mobile$ = this.select((state) => state.mobile);
  readonly userExists$ = this.select((state) => state.userExists);
  readonly type$ = this.select((state) => state.type);

  // Updaters
  readonly setEmail = this.updater((state, email: string) => ({
    ...state,
    email,
  }));

  readonly setMobile = this.updater((state, mobile: string) => ({
    ...state,
    mobile,
  }));

  readonly setUserExists = this.updater((state, userExists: boolean) => ({
    ...state,
    userExists,
  }));

  readonly setType = this.updater((state, type: 'email' | 'phone') => ({
    ...state,
    type,
  }));

  // Effects
  readonly checkUserExists = this.effect<string>((contact$) => {
    return contact$.pipe(
      switchMap((contact) => {
        const type = this.get().email ? 'email' : 'phone';

        // Replace this with your actual service call
        return this.mockDataService.checkUserExists(contact).pipe(
          tap((userExists) => {
            this.setUserExists(userExists);
            if (userExists) {
              this.router.navigate(['/login'], {
                queryParams: { contact, type },
              });
            } else {
              this.router.navigate(['/sign-up'], {
                queryParams: { contact, type },
              });
            }
          })
        );
      })
    );
  });
}
