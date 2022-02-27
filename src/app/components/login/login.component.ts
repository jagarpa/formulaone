import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';


import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User = { name: "", nickname: "", password: "", token: "", email: "", image: "" }
  container!: any;
  loginError: boolean = false;
  errorMessage: string | undefined;
  constructor(private users: UsersService, private router: Router,) {

  }

  ngOnInit(): void {
  }

  login() {
    this.users.getToken(this.user!).subscribe((response) => {
      if (response.user != undefined) {
        response.user.getIdToken()
          .then((data) => {
            this.user.token = data;
            const jsonUser = JSON.stringify(this.user)
            localStorage.setItem('user', jsonUser)
            this.users.checkNickname(this.user).subscribe((e: any) => {
              e.map((element: any) => {
                if (element.includes(this.user.email)) {
                  this.user.nickname = element[0]
                  const jsonUser = JSON.stringify(this.user)
                  localStorage.setItem('user', jsonUser)
                  /* Cridar a una ruta per codi */
                  this.router.navigate(['home'])
                }
              })
            })
          })
      } else {
        this.errorMessage = "Usuario o contraseña no válidos"
        this.loginError = true;
      }
    })
  }

  /*   */

  register() {
    /* Cridar a una ruta per codi */
    this.router.navigate(['/register']);
  }

}

