import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../shared/service/storage.service';
import { IUser } from '../interfaces/user';
import { NotificationService } from '../shared/service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.API_URL;
  user: IUser
  userProfile: any;

  private userId: string;
  private isAuthenticated = false;
  private token: string;
  tokenTimer: any;

  private authenticationStatusListener = new Subject<boolean>();


  constructor(
    private http: HttpClient,
    private router: Router,
    public notificationService: NotificationService,
    private storageService: StorageService,
  ) { }

  // listening for authentication status
  getAuthenticationStatusListener() {
    return this.authenticationStatusListener.asObservable();
  }



  // user authentication token
  getToken() {
    return this.token;
  }

  // getting if user is authenticated
  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  // Adding new user
  createUser(firstName: string, lastName: string, userName: string, email: string, password: string) {
    const signupData: IUser = {
      _id: null,
      firstName,
      lastName,
      userName,
      email,
      password,
    };

    this.http.post(`${this.API_URL}signup`, signupData)
      .subscribe(response => {
        this.notificationService.success('Registered successfully');
      });
  }


  // logging in existing user
  loginUser(userName: string, password: string) {
    const loginData: IUser = {
      userName: userName,
      password: password
    };

    this.http.post<{ message: string, token: string, userId: string }>(`${this.API_URL}login`, loginData)
      .subscribe(response => {
        const _token = response.token;
        this.token = _token;
        if (!_token) {
          return;
        }
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authenticationStatusListener.next(true);
        this.saveAuthenticationData(_token, this.userId);
        this.notificationService.success(response.message);
        this.router.navigate(['dashboard']);
      }, error => {
        console.log(error.message)
        this.authenticationStatusListener.next(false);
      });
  }

  // Logging user out
  logout() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authenticationStatusListener.next(false);
    this.userId = null;
    this.clearAuthenticationData();
    // this.notificationService.success('Logged out');
    this.router.navigate(['/auth']);
  }

  // this saves the authentication datas to the browser
  private saveAuthenticationData(token: string, userId: string) {
    this.storageService.saveAuthData(token, userId);
  }

  // this gets the user authentication data
  private getAuthenticationData() {
    // let authData;
    // await this.storageService.getAuthData()
    //   .then(document => {
    //     authData = document
    //   });

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');


    return { token, userId };
  }

  // persists user authentication automatically
  automaticAuthenticateUser() {
    const authenticationInformation = this.getAuthenticationData();
    let token_ = authenticationInformation.token;
    let userId_ = authenticationInformation.userId;
    if (!token_ || !userId_) {
      return;
    }

    this.token = authenticationInformation.token;
    this.userId = authenticationInformation.userId;
    this.isAuthenticated = true;
    this.authenticationStatusListener.next(true);
  }


  // this removes authentication data from the browser
  // this is called during logout
  private clearAuthenticationData() {
    this.storageService.removeAuthData();
  }
}
