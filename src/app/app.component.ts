import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalConstants } from './common/global-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  isLoggedIn = false;

  constructor(private translate: TranslateService){}

  ngOnInit(): void {
    this.isLoggedIn = false;
  }

  title = 'formulaone';

}
