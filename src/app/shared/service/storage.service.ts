import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }


  getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!userId || !token) {
      return null;
    }

    return {
      token,
      userId
    };

  }

  getUserId() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return null;
    }
    return userId;
  }

  removeAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
