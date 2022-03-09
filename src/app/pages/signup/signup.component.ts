import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private userService: UserService,
    private matSnackBar: MatSnackBar,
    ) { }

  public user= {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    emailId: '',
    contactNumber: '',
  };

  ngOnInit(): void {
  }

  userSignup() {

    if(this.user.username.trim() == '' || this.user.username == null) {
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

    if(this.user.password.trim() == '' || this.user.password == null) {
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

    if(this.user.firstName.trim() == '' || this.user.firstName == null) {
      //alert('First Name cannot be empty!');
      this.matSnackBar.open('First Name is required !!' , 'OK' , {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    if(this.user.lastName.trim() == '' || this.user.lastName == null) {
      //alert('Lat Name cannot be empty!');
      this.matSnackBar.open('Last Name is required !!' , 'OK' , {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    if(this.user.emailId.trim() == '' || this.user.emailId == null) {
      //alert('Email cannot be empty!');
      this.matSnackBar.open('Email is required !!' , 'OK' , {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    else {
      //check if email is valid or not

    }

    if(this.user.contactNumber.trim() == '' || this.user.contactNumber == null) {
      //alert('Contact Number cannot be empty!');
      this.matSnackBar.open('Contact Number is required !!' , 'OK' , {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    else {
      //check if contact number doesn't contain 'e'
    }

    console.log(this.user);
    

    //signUp() from user_service
    this.userService.createUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        //alert('SignUp successful');
        // this.matSnackBar.open('SignUp successful !!' , 'OK' , {
        //   duration: 3000,
        //   verticalPosition: 'bottom',
        //   horizontalPosition: 'center',
        // });

        Swal.fire('SignUp Successfull !!' , 'You have registered successfully. Your User ID is : '+data.userId , 'success');
      },
      (error) => {
        console.log(error);
        //alert('Oops! Something went wrong');
        // this.matSnackBar.open('Oops! Something went wrong' , 'OK' , {
        //   duration: 3000,
        //   verticalPosition: 'bottom',
        //   horizontalPosition: 'center',
        // });

        Swal.fire('Error' , 'Oops! Something went wrong. Please try again later.' , 'error');
      }
    );
  }

}
