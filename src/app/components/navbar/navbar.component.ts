import { Component, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  spanish: boolean = true;
  english: boolean = false;

  isLoggedIn!: Observable<boolean> | undefined;
  constructor(private usersService: UsersService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.usersService.isLoggedIn
  }

  logOut() {
    this.usersService.signOut()
  }

  setLanguage(language: string) {
    this.translate.setDefaultLang(language)
    switch (language) {
      case "es":
        this.spanish = true;
        this.english = false;
        this.translate.use('es')
        break;
        case "en":
          this.spanish = false;
          this.english = true;
          this.translate.use('en')
          break;
      default:
        break;
    }
  }

}
