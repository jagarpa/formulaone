import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  show: boolean = true;
  user: User = {name: "Pirlo Minga", email: "prueba@gmail.com", password: "123456", token: "", dni: "22222222"}

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  logOut() {
    this.usersService.signOut()
    localStorage.removeItem('token')
  }

  newUser() {
    this.usersService.newUser(this.user).subscribe()
    this.usersService.setDisplayName(this.user.name).subscribe()
  }
}
