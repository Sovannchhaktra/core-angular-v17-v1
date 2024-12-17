import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (this.authService.getLoginUser()) {
      return true;
    }
    const token = this.getParamValueQueryString('token');
    if (token) {
      this.router
        .navigate(['/auth/confirm'], { queryParams: { 'user-data': token } })
        .then(() => {});
      return false;
    } else {
      this.router.navigate(['/login']).then(() => {});
      return false;
    }
  }

  getParamValueQueryString(paramName: string) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }
}
