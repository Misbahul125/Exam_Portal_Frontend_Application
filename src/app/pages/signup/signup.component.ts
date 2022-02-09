import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  public user= {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    emailId: '',
    contactNumber: '',
  };

  ngOnInit(): void {
  }

  userSignup() {

    if(this.user.userName == '' || this.user.userName == null) {
      alert('Username cannot be empty!');
      return;
    }

    if(this.user.password == '' || this.user.password == null) {
      alert('Password cannot be empty!');
      return;
    }

    if(this.user.firstName == '' || this.user.firstName == null) {
      alert('First Name cannot be empty!');
      return;
    }

    if(this.user.lastName == '' || this.user.lastName == null) {
      alert('Lat Name cannot be empty!');
      return;
    }

    if(this.user.emailId == '' || this.user.emailId == null) {
      alert('Email cannot be empty!');
      return;
    }

    if(this.user.contactNumber == '' || this.user.contactNumber == null) {
      alert('Contact Number cannot be empty!');
      return;
    }

    console.log(this.user);

    alert('submit');
  }

}
