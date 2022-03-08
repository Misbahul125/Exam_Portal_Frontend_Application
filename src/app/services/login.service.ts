import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  public generateToken(loginData: any) {

    return this.http.post(`${baseUrl}/generate-token` , loginData);
  }

  //save token in local storage
  public saveToken(token: any) {
    localStorage.setItem("token" , token);
    return true;
  }

  //function to check user is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if(tokenStr != undefined && tokenStr != '' && tokenStr != null) {
      return true;
    }
    else {
      return false;
    }
  }

  //logout
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  //save user details in local storage
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

  //get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
  
}
