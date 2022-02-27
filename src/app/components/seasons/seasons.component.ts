import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {

  value = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onSliderChange(event: MatSliderChange) {
    console.log(event.value);
  }


  formatLabel(value: number) {
    return value;
  }

}



/* http://ergast.com/api/f1/2019/driverstandings */
