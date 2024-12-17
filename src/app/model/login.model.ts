import {TokenData} from './token.model';
import {Response} from './response.model';

export interface Login {
    username: string;
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface LoginResponse {
    data: TokenData;
    response: Response;
    results: TokenData;
}
