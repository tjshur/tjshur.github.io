import { Inject, Injectable } from '@angular/core';

import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  public getToken(): string {
    const out = this.storage.getItem('travlr-token');

    if (!out) {
      return '';
    }

    return out;
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }

    return false;
  }

  public getCurrentUser(): User {
    const token: string = this.getToken();

    if (!token) {
      return new User();
    }

    const { email, name, role } = JSON.parse(atob(token.split('.')[1]));

    return {
      email,
      name,
      role
    } as User;
  }

  public getCurrentUserRole(): 'admin' | 'editor' | '' {
    if (!this.isLoggedIn()) {
      return '';
    }

    return this.getCurrentUser().role;
  }

  public isAdmin(): boolean {
    return this.getCurrentUserRole() === 'admin';
  }

  public isEditor(): boolean {
    return this.getCurrentUserRole() === 'editor';
  }

  public canEditTrips(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'admin' || role === 'editor';
  }

  public canDeleteTrips(): boolean {
    return this.isAdmin();
  }

  public login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd)
      .subscribe({
        next: (value: any) => {
          if (value) {
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd)
      .subscribe({
        next: (value: any) => {
          if (value) {
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }
}