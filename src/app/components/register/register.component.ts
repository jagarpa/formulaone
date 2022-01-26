import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string | undefined;
  password: string | undefined;
  confirmPass: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  registerNewUser() {
    console.log(this.email)
    console.log(this.password)
  }

}
