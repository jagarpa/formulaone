import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  show: boolean = true;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  logOut() {
    this.usersService.signOut()
    localStorage.removeItem('token')
  }
}
