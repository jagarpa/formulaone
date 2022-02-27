import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { passwordFormatValidator } from 'src/app/shared/password-validator';
import { passwordValidator } from 'src/app/shared/password-validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  user: User = { name: "", nickname: "", email: "", password: "", token: "", image: "" };

  isDisabled: boolean = true;

  form = new FormGroup({})
  constructor(private router: Router, private usersService: UsersService, private formBuilder: FormBuilder, private users: UsersService) {
  }

  ngOnInit(): void {
    this.crearFormulario()
  }

  crearFormulario() {
    this.form = this.formBuilder.group({
      /* Validacio inputs */
      name: ["", [Validators.required, Validators.minLength(3)]],
      username: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, passwordFormatValidator(), passwordValidator('confirmPassword', true)]],
      confirmPassword: ["", [Validators.required, passwordFormatValidator(), passwordValidator('password')]]
    }
    )
  }

  userSubmit() {
    this.user.nickname = this.form.get('username')!.value
    this.user.email = this.form.get('email')!.value
    this.user.password = this.form.get('password')!.value

    this.usersService.newUser(this.user!).subscribe((response: any) => {
      this.user.token = response.user.accessToken
      const jsonUser = JSON.stringify(this.user)
      localStorage.setItem('user', jsonUser)
      /* Cridar a una ruta per codi */
      this.router.navigate(['home']);
    })
  }



}
