import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ProductService } from "../products/products.service";

interface AuthResponseData {
    id: string;
    email: string;
    password?: string;
    role: string;
}

@Injectable({ providedIn: 'root'})
export class AuthService {
    private userRole = new BehaviorSubject<string>('');
    userRole$ = this.userRole.asObservable();

    constructor(private http: HttpClient, private productService: ProductService) {}

    signup(email: string, password: string, role: string)  {
        return this.http
        .post<AuthResponseData>('',
            {
                email: email,
                password: password,
                role: role
            }
        )
        .pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error occurred!';
            if (errorRes.status === 409) {
                errorMessage = 'This email is already registered!';
                return throwError(() => errorMessage);
            }
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(() => errorMessage);
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already!';
                    break;
                case 'INVALID_EMAIL':
                    errorMessage = 'This is not a valid email!';
                    break;
                case 'WEAK_PASSWORD':
                    errorMessage = 'This password is too weak!';
                    break;
            }
            return throwError(() => errorMessage);
        }))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            '',
            {
                email: email,
                password: password
            }
        ).pipe(
            tap(response => {
                this.userRole.next(response.role);
            }),
            catchError(errorRes => {
                let errorMessage = 'An unknown error occurred!';
                if (errorRes.status === 401) {
                    errorMessage = 'Invalid email or password!';
                }
                return throwError(() => errorMessage);
            })
        );
    }

    logout() {
        this.userRole.next('');
        this.productService.clearCart();
    }
}