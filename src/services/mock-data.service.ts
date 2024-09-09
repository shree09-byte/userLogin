import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private mockDataUrl = 'assets/login-data.json'; // Path to your login-data.json file

  constructor(private http: HttpClient) {}

  // Fetch users from mock.json
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.mockDataUrl);
  }

  // Check if the user exists based on email or mobile contact
  checkUserExists(contact: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((users) => users.some((user) => user.email === contact || user.mobile === contact))
    );
  }

  // Get the list of allowed organizations (mock data)
  getAllowedOrganizations(): Observable<{ id: string; name: string }[]> {
    return of([
      { id: '123', name: 'Org A' },
      { id: '456', name: 'Org B' },
      { id: '789', name: 'Org C' },
    ]);
  }

  // Validate user by checking the email/phone and password
  validateUser(emailOrPhone: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((users) =>
        users.some(
          (user) =>
            (user.email === emailOrPhone || user.mobile === emailOrPhone) && user.password === password
        )
      )
    );
  }
}
