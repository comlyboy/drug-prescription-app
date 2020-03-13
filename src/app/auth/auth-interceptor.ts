// this fies serves as an interceptor to all http requests so as to verify users credentials
// Checks Authentication, Authorization and roles

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';



@Injectable()


export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.authService.getToken();
        const clonedToken = req.clone({
            // Below is authorization string from authservice
            headers: req.headers.set('Authorization', "Bearer " + token)
        });

        return next.handle(clonedToken);
    };
    //  to be injected in app module ts
}

