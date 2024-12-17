import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class UnAuthGuard implements CanActivate {
    constructor(private router: Router,
                private authService: AuthService) {
    }

    canActivate() {
        // return true;
        /**
         * If user already login we will not show login page
         * Automatic redirect to default page
         */
        if (this.authService.getLoginUser()) {
            this.router.navigate(['/']).then();
            return false;
        } else {
            return true;
        }
    }
}
