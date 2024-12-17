import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Login} from '../model/login.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    url = environment.baseUrl;
    TOKEN_KEY = 'a1';

    constructor(private http: HttpClient) {
    }

    login(data: Login) {
        localStorage.removeItem(this.TOKEN_KEY);
        sessionStorage.removeItem(this.TOKEN_KEY);
        return this.http.post<any>(`${this.url}/authenticate`, data);
    }
}

