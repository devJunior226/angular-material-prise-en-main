import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public username!: any;
  public roles: any;
  public authenticated: boolean = false;

  public users: any = {
    admin: ['STUDENT', 'ADMIN'],
    user: ['STUDENT'],
  };

  constructor(private router: Router) {}

  login(username: string, password: string) {
    // if (username == 'admin' && password == 'admin') {
    if (this.users[username] && password == 'admin') {
      this.username = username;
      // this.roles = ['ADMIN'];
      this.roles = this.users[username]
      this.authenticated = true;
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authenticated = false;
    this.username = undefined;
    this.roles = undefined;
    this.router.navigateByUrl('/login');
  }
}
