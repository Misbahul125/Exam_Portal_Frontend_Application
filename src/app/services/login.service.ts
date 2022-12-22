import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) { }

  //login-3
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //initiate login-1
  public generateToken(loginData: any) {

    return this.http.post(`${baseUrl}/generate-token` , loginData);
  }

  //save token in local storage, login-2
  public saveToken(token: any) {
    localStorage.setItem("token" , token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  //function to check user is logged in or not
  public isLoggedIn() {
    let tokenStr = this.getToken();
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    else {
      return true;
    }
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  //save user details in local storage, login-4
  public setUser(user: any) {
    localStorage.setItem('user' , JSON.stringify(user))
  }

  //get user details from local storage
  public getUser() {
    let userStr = localStorage.getItem('user');
    if(userStr != null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();
      return null;
    }
  }

  //get user role,login-5
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  
  //logout
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
  
}
