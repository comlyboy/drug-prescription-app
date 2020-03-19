import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  viewMode = 'login';
  private isAuthenticated = false;
  branches: any[] = [];


  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }


  
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.loginUser
      (
        form.value.inputUserName,
        form.value.inputPassword
      );
  }


  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.createUser(
      form.value.inputFirstName,
      form.value.inputLastName,
      form.value.inputUserName,
      form.value.inputEmail,
      form.value.inputPassword,
    );
    // this.viewMode = "login"
  }


  onForgetPassword(form: NgForm) {
    // this.authService.createUser(

    //   form.value.inputPhoneNumber

    // );
  }




  initContents() {
    this.isAuthenticated = this.authService.getIsAuthenticated()
    if (this.isAuthenticated) {
      this.router.navigate(["dashboard"]);
    }

  }

  ngOnInit() {
    this.initContents()
  }

}
