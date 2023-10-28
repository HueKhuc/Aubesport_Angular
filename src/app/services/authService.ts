import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";
import { Token } from "../models/Token.model";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public static readonly TOKEN_KEY = 'token';
    public static readonly DECODED_TOKEN_KEY = 'decodedToken';

    public saveToken(token: string): void {
        localStorage.setItem(AuthService.TOKEN_KEY, token);
        localStorage.setItem(
            AuthService.DECODED_TOKEN_KEY,
            JSON.stringify(jwt_decode<Token>(token))
        );
    }

    public deleteToken(): void {
        localStorage.removeItem(AuthService.TOKEN_KEY);
        localStorage.removeItem(AuthService.DECODED_TOKEN_KEY);
    }

    public isLoggedIn(): boolean {
        const token = localStorage.getItem(AuthService.TOKEN_KEY);
        if (token === null) {
            return false;
        }

        if ((new Date()).getTime() > (this.getDecodedToken().exp - 30) * 1000) {
            return false;
        }

        return true;
    }

    public getConnectedUserId(): string {
        return this.getDecodedToken().id;
    }

    public getConnectedUserRoles(): Array<string> {
        return this.getDecodedToken().roles;
    }

    private getDecodedToken(): Token {
        const token = this.getToken();

        const decodedTokenAsString = localStorage.getItem(AuthService.DECODED_TOKEN_KEY);
        let decodedToken: Token;

        if (decodedTokenAsString !== null) {
            decodedToken = JSON.parse(decodedTokenAsString);
        } else {
            decodedToken = jwt_decode<Token>(token);
        }

        return decodedToken;
    }

    public getToken(): string {
        const token = localStorage.getItem(AuthService.TOKEN_KEY);

        if (token === null) {
            throw new Error('User should log in to have token');
        }

        return token;
    }
}
