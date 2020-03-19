import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Prescription App';
  user: string;

  userIsAuthenticated: boolean = false;

  private authStatusListenerSub: Subscription;

  constructor(
    private authService: AuthService,
  ) {
  }


  onLogout() {
    this.authService.logout();
  }

  initContents() {
    this.authService.automaticAuthenticateUser();
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusListenerSub = this.authService.getAuthenticationStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

  }

  ngOnInit() {
    this.initContents();
  }

  ngOnDestroy() {
    this.authStatusListenerSub.unsubscribe();
  }

}
