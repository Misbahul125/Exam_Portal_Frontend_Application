import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username : '',
    password : '',
  };

  constructor(
    private matSnackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  userLogin() {
    console.log("login")


    if(this.loginData.username.trim() == '' || this.loginData.username == null) {
      //alert('Username cannot be empty!');
      this.matSnackBar.open('Username is required !!' , 'OK' , {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    else {
      //check username is unique or not
    }

    if(this.loginData.password.trim() == '' || this.loginData.password == null) {
      //alert('Password cannot be empty!');
      this.matSnackBar.open('Password cannot be empty !!' , 'OK' , {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    else {
      //check password constraints
      //if((this.user.password.))
    }


    //send request server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("Access token generated");
        console.log(data);

        //save generated token in local storage
        this.loginService.saveToken(data.token);

        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            console.log("Current user");
            console.log(user);

            //save user details in local storage
            this.loginService.setUser(user)

            //check if user is admin/normal
            if(this.loginService.getUserRole() == 'ADMIN') {
              // window.location.href = '/admin-dashboard';
              this.router.navigate(['admin-dashboard']);
              this.loginService.loginStatusSubject.next(true);
            }
            else if(this.loginService.getUserRole() == 'NORMAL') {
              // window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard']);
              this.loginService.loginStatusSubject.next(true);
            }
            else {
              this.loginService.logout();
            }

          },
          (error) => {
            console.log("Error getting current user !!");
            console.log(error);
          }
        );
      },
      (error) => {
        console.log("Error generating token !!");
        console.log(error);

        this.matSnackBar.open('Error generating token !!' , 'OK' , {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    );

  }

}
