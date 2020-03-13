// // This file prevents non logged user from accessing some pages

// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// import { NotificationService } from '../shared/notification.service';

// @Injectable()

// export class AuthGuard implements CanActivate {
//     constructor(
//         private authService: AuthService,
//         private router: Router,
//         public notificationsService: NotificationService
//     ) { }


//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
//         const isAuth = this.authService.getIsAuthenticated();
//         if (!isAuth) {
//             this.router.navigate(["/auth"]);
//             this.notificationsService.smallWarning('Log in to proceed');
//         }
//         return isAuth;
//         // this method is implemented in app routing module ts
//     }

// }
