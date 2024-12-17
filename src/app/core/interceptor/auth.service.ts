import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as forge from 'node-forge';
import { environment } from '../../../environments/environment';
import { User } from '../../model/user.model';
import { TokenData } from '../../model/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.baseUrl;
  private localUserKey = '9452e6b9-2b47-4493-b5c0-647be1f93809';
  private tokenKey = '9234a3c7-1a46-3392-b2c3-126aj4a53619';
  private userSubject: BehaviorSubject<User | null>;
  KEY = 'aesEncryptionKey';
  IV = 'encryptionIntVec';
  public salt: string;
  public iv: string;

  constructor(private router: Router, private http: HttpClient) {
    // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  setLoginUser(data: any) {
    sessionStorage.setItem(this.localUserKey, JSON.stringify(data));
  }

  getLoginUser(): User | null {
    const user = sessionStorage.getItem(this.localUserKey);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  getLoginUserId(): number | null {
    return this.getLoginUser() ? this.getLoginUser()!.id : null;
  }

  setToken(data: TokenData) {
    sessionStorage.setItem(this.tokenKey, JSON.stringify(data));
  }

  getTokenData(): TokenData {
    return JSON.parse(sessionStorage.getItem(this.tokenKey)!);
  }

  getToken() {
    return JSON.parse(sessionStorage.getItem(this.tokenKey)!)?.token;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.removeItem('functionPermission');
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.localUserKey);
    if (this.userSubject) {
      this.userSubject.next(null);
    }
    this.router.navigate(['/login']).then(() => {});
  }

  encrypt(decrypted: string) {
    const salt = forge.random.getBytesSync(128);
    const key = this.KEY;
    const iv = this.IV;

    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(decrypted));
    cipher.finish();
    const cipherText = forge.util.encode64(cipher.output.getBytes());

    const result = forge.util.encode64(decrypted);
    this.salt = forge.util.encode64(salt);
    this.iv = forge.util.encode64(iv);
    return cipherText;
  }
}
