import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-calendar',
  templateUrl: './show-calendar.component.html',
  styleUrls: ['./show-calendar.component.css']
})
export class ShowCalendarComponent implements OnInit {
/* @Output */
  @Output() calendarEvent = new EventEmitter<boolean>()

  visible: boolean = false;
  buttonText: string = "visualizarcalendario"
  constructor() { }

  ngOnInit(): void {
  }

  addEvent() {
    this.visible? this.visible = false: this.visible = true
    this.visible? this.buttonText = "visualizarmisfavoritos": this.buttonText = "visualizarcalendario"
    this.calendarEvent.emit(this.visible)
  }
}
