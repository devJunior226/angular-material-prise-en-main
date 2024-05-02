import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class AuthorizationGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let authorized: boolean = false;
    let authorizedRoles: string[] = route.data['roles'];
    let roles: string[] = this.authService.roles as string[];
    
    for (let i: number = 0; i < roles.length; i++) {
      if (authorizedRoles.includes(roles[i])) {
        authorized = true;
      }
    }
    return authorized;
  }
}
