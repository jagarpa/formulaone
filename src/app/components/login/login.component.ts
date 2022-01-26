import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: User = { name: "", password: "", token: "" }
  email: string | undefined;
  password: string | undefined;
  windowSizes: number[] = this.windowSize();
  container!: any;
  loginError: boolean = false;
  errorMessage: string | undefined;

  constructor(private users: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.container = document.querySelector(".row")
    console.log(this.container)
    console.log(this.windowSizes[1])
    this.container.style.width = (this.windowSizes[0] - 10) + "px"
    this.container.style.height = (this.windowSizes[1]) + "px"
  }

  login() {
    this.users.getToken(this.email!, this.password!).subscribe((response) => {
      if (response.user != undefined) {
        response.user.getIdToken()
          .then((data) => {
            this.setUser(this.email!, this.password!, data)
          })
      } else {
        this.errorMessage = response.toString()
        this.loginError = true;
      }
    })
  }

  setUser(email: string, password: string, token: string) {
    this.user.name = email;
    this.user.password = password;
    this.user.token = token;
    const jsonUser = JSON.stringify(this.user)
    localStorage.setItem('token', token)
  }

  windowSize() {
    var tam = [0, 0];
    if (typeof window.innerWidth != 'undefined') {
      tam = [window.innerWidth, window.innerHeight];
    }
    else if (typeof document.documentElement != 'undefined'
      && typeof document.documentElement.clientWidth !=
      'undefined' && document.documentElement.clientWidth != 0) {
      tam = [
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      ];
    }
    else {
      tam = [
        document.getElementsByTagName('body')[0].clientWidth,
        document.getElementsByTagName('body')[0].clientHeight
      ];
    }
    return tam;
  }
}

