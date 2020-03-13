import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { NotificationService } from '../../shared/service/notification.service';



@Injectable()


export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notificationService: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                this.notificationService.error(error.error.message);
                return throwError(error)
            })
        );
    };
    //  to be injected in app module ts
}

