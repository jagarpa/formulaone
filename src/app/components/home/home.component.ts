import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ICircuit } from 'src/app/interfaces/icircuit';
import { Idriver } from 'src/app/interfaces/idriver';
import { IDriverStandings } from 'src/app/interfaces/idriver-standings';
import { User } from 'src/app/interfaces/user';
import { CircuitsService } from 'src/app/services/circuits.service';
import { DriversService } from 'src/app/services/drivers.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Iconstructor } from 'src/app/interfaces/iconstructor';
import { ConstructorsService } from 'src/app/services/constructors.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Calendar } from 'src/app/interfaces/calendar';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})



export class HomeComponent implements OnInit, AfterViewInit {

  user: User = JSON.parse(localStorage.getItem('user')!)
  circuitsList: ICircuit[] = [];
  circuitsListVisible: Boolean = false;
  circuitsLikes: String[] = [];
  driversList: Idriver[] = [];
  driversListVisible: Boolean = false;
  driversLikes: String[] = [];
  constructorsList: Iconstructor[] = [];
  constructorsListVisible: Boolean = false;
  constructorsLikes: String[] = [];
  showData: boolean = true;
  showCalendar: boolean = false;


  //Drivers Table
  @ViewChild('circuitsTable') circuitsTable: MatTable<ICircuit> | undefined;
  @ViewChild('driversTable') driversTable: MatTable<IDriverStandings> | undefined;
  @ViewChild('constructorsTable') constructorsTable: MatTable<Iconstructor> | undefined;
  @ViewChild('calendar') calendarTable: MatTable<any> | undefined;
  displayedColumnsDrivers: string[] = ['Nacionalidad', 'Nombre'];
  displayedColumnsCircuits: string[] = ['Nombre'];
  displayedColumnsConstructors: string[] = ['Nacionalidad', 'Nombre'];
  displayedColumnsCalendar: string[] = ['Date', 'Name', 'Circuit'];
  calendarData: Calendar[] = [
    { date: "20-03-2022", name: "Bahrain", circuit: "Sakhir" },
    { date: "27-03-2022", name: "Arabia Saudi", circuit: "Jeddah" },
    { date: "10-04-2022", name: "Australia", circuit: "Melbourne" },
    { date: "24-04-2022", name: "Emilia Romagna", circuit: "Imola" },
    { date: "08-05-2022", name: "Miami", circuit: "Miami" },
    { date: "22-05-2022", name: "Spain", circuit: "Barcelona" },
    { date: "29-05-2022", name: "Monaco", circuit: "Monaco" },
    { date: "12-06-2022", name: "Azerbaijan", circuit: "Baku" },
    { date: "19-06-2022", name: "Canada", circuit: "Montreal" },
    { date: "03-07-2022", name: "United Kingdom", circuit: "Silverstone" },
    { date: "10-07-2022", name: "Austria", circuit: "Spielberg" },
    { date: "24-07-2022", name: "France", circuit: "Le Castellet" },
    { date: "31-07-2022", name: "Hungary", circuit: "Budapest" },
    { date: "28-08-2022", name: "Belgium", circuit: "Spa" },
    { date: "04-09-2022", name: "Netherlands", circuit: "Zandvoort" },
    { date: "11-09-2022", name: "Italy", circuit: "Monza" },
    { date: "25-09-2022", name: "Turkey", circuit: "Istambul" },
    { date: "02-10-2022", name: "Singapore", circuit: "Singapore" },
    { date: "09-10-2022", name: "Japan", circuit: "Suzuka" },
    { date: "23-10-2022", name: "USA", circuit: "Austin" },
    { date: "30-10-2022", name: "Mexico", circuit: "Mexico City" },
    { date: "13-11-2022", name: "Brazil", circuit: "Sao Paulo" },
    { date: "20-11-2022", name: "Abu Dhabi", circuit: "Abu Dhabi" }
  ]
  dataSource = new MatTableDataSource<Calendar>(this.calendarData);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  id: string | undefined;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(private router: Router, private translate: TranslateService, private circuits: CircuitsService, private firebase: FirebaseService, private driversService: DriversService, private constructorsService: ConstructorsService) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.countdownTimer()
    setTimeout(() => {
      this.getCircuitsLikes()
      this.getDriversLikes()
      this.getConstructorsLikes()
    }, 1000);
  }

  countdownTimer() {
    let countDownDate = new Date("Mar 20, 2022 15:00:00").getTime();
    let x = setInterval(function () {
      let now = new Date().getTime();
      let distance = countDownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.querySelector("#countdown")!.innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

      if (distance < 0) {
        clearInterval(x);
        document.querySelector("#countdown")!.innerHTML = "EXPIRED";
      }
    }, 1000);
  }

  getCircuits() {
    const data = this.circuits.getCircuits().subscribe((response) => {
      response.map((element: ICircuit) => {
        if (this.circuitsLikes.includes(element.circuitId)) {
          this.circuitsList.push(element)
        }
      });


      this.circuitsListVisible = true;
      this.circuitsTable?.renderRows();
    })
  }

  getCircuitsLikes() {
    this.firebase.getCircuitLikes().subscribe((e) => {
      e.map((c) => this.circuitsLikes.push(c))
      this.getCircuits()
    })
  }

  getDrivers() {
    const data = this.driversService.getDrivers().subscribe((response) => {
      response.map((element: Idriver) => {
        if (this.driversLikes.includes(element.driverId)) {
          this.driversList.push(element)
        }
      });
      this.driversListVisible = true;
      this.driversTable?.renderRows();
    });
  }

  getDriversLikes() {
    this.firebase.getDriverLikes().subscribe((e) => {
      e.map((c) => this.driversLikes.push(c))
      this.getDrivers()
    })
  }



  getConstructors() {
    const data = this.constructorsService.getConstructors().subscribe((response) => {
      response.map((element: Iconstructor) => {
        if (this.constructorsLikes.includes(element.constructorId)) {
          this.constructorsList.push(element)
        }
      });
      this.constructorsListVisible = true;
      this.constructorsTable?.renderRows();
    });
  }

  getConstructorsLikes() {
    this.firebase.getConstructorLikes().subscribe((e) => {
      e.map((c) => this.constructorsLikes.push(c))
      console.log(this.constructorsLikes);

      this.getConstructors()
    })
  }

  driverDetails(id: string) {
    this.router.navigate(['/driversCatalogue', id]);
  }

  circuitDetails(id: string) {
    this.router.navigate(['/circuitsCatalogue', id]);
  }

  constructorDetails(id: string) {
    this.router.navigate(['/constructorsCatalogue', id])
  }

  changeContent(action: any) {
    if (this.showCalendar) {
      this.showCalendar = false
      this.showData = true;
    } else {
      this.showCalendar = true;
      this.showData = false;
    }
  }

}
