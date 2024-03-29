import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    this.loginService.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUser();
    });
  }

  public logout() {
    console.log("logout called");
    
    this.isLoggedIn = false;
    this.user = null;
    
    this.loginService.logout();

    this.router.navigate(['/login']);

    console.log("logout ends");
    
    // this.login.loginStatusSubject.next(false);
  }
}