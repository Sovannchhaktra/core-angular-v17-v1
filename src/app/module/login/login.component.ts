import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/interceptor/auth.service';
import { LoginService } from '../../service/login.service';
import { Login, LoginResponse } from '../../model/login.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  f: FormGroup;
  errMsg: string;
  successMsg: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.f = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false,
    });
  }

  login(data: Login) {
    this.clearMsg();
    this.loading = true;
    data.email = data.username;
    if (!data.username) {
      this.errMsg = 'Please enter username.';
      return;
    }
    if (!data.password) {
      this.errMsg = 'Please enter password.';
      return;
    }
    this.localLogin();
    // this.serviceLogin(data);
  }

  private serviceLogin(data: Login) {
    this.loginService.login(data).subscribe(
      (res: LoginResponse) => {
        if (res.response.code === 200) {
          this.loading = false;
          this.loginSuccess(res.data);
          this.authService.setToken(res.results);
          const user: User = {
            id: 1,
            username: 'admin',
            password: '123123',
            firstName: 'Sys',
            lastName: 'Admin',
            token:
              '1231241214234o3456783456fytryu45678uio7897rtghjkhgtrt5678765t',
          };
          this.loginSuccess(user);
          // this.authService.getUserInfo().subscribe(
          //     (datas: any) => {
          //         this.loading = false;
          //         this.loginSuccess(datas.user);
          //     });
        } else {
          this.loading = false;
          this.errMsg = res.response.message as string;
        }
      },
      (error) => {
        if (error.status === 406) {
          this.errMsg = error.message;
          this.loading = false;
        } else if (error.status === 401) {
          this.errMsg = 'Incorrect username or password';
          this.loading = false;
        } else {
          this.errMsg = 'Server not response';
          this.loading = false;
        }
      }
    );
  }

  private localLogin() {
    setTimeout(() => {
      const user: User = {
        id: 1,
        username: 'admin',
        password: '123123',
        firstName: 'Sys',
        lastName: 'Admin',
        token: '1231241214234o3456783456fytryu45678uio7897rtghjkhgtrt5678765t',
      };
      this.loginSuccess(user);
    }, 500);
  }

  private loginSuccess(data: any) {
    this.loading = false;
    this.successMsg = 'Authentication successfully.';
    this.authService.setLoginUser(data);
    this.navigateToDefaultPage();
  }

  private navigateToDefaultPage() {
    setTimeout(() => {
      this.router.navigate(['']).then(() => {});
    }, 100);
  }

  private clearMsg() {
    this.errMsg = '';
    this.successMsg = '';
  }
}
