import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Idriver } from 'src/app/interfaces/idriver';
import { IDriverStandings } from 'src/app/interfaces/idriver-standings';
import { DriversService } from 'src/app/services/drivers.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<IDriverStandings> | undefined;

  //ActivatedRoute
  constructor(private activatedRoute: ActivatedRoute,
    private driverService: DriversService,
    private firebaseService: FirebaseService) { }

  driver: Idriver | undefined;
  id: string | undefined;
  like: boolean | undefined;
  buttonMessage: string | undefined;
  dataSource: IDriverStandings[] = []
  displayedColumns: string[] = ['season', 'wins', 'points', 'constructor', 'position'];

  years: String[] = []
  wins: String[] =[];

  ngOnInit(): void {
    this.loadDriver()
    this.loadTableData()
  }


  loadTableData() {
    this.driverService.getStandingsById(this.id!).subscribe((response) => {
      response.map((e: any) => {
        const newStadistic: IDriverStandings = {
          season: e.season,
          position: e.DriverStandings[0].position,
          points: e.DriverStandings[0].points,
          wins: e.DriverStandings[0].wins,
          constructor: e.DriverStandings[0].Constructors[0].name
        }

        this.dataSource.push(newStadistic)
        this.loadGraphicsData(newStadistic);
      })
      this.table?.renderRows();
      this.loadGraphics()
    })
  }

  loadGraphicsData(e: IDriverStandings) {
    this.years.push(e.season);
    this.wins.push(e.wins)
  }

  loadGraphics() {
    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d')!;
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: this.years,
          datasets: [{
              data: this.wins,
              borderColor: "#212529",
              backgroundColor: "#dc3545",
              borderWidth: 1
          }]
      },
      options: {
        layout: {
          padding: 20
      },
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            position: "top",
            color: "red",
            text: "Victorias por año",
            display: true,
          },
          legend: {
            display: false,
          }},
          scales: {
            x: {
              ticks: {
                  font: {
                      size: 14,
                  },
                  color: '#dc3545 '
              }
          },
          y: {
            ticks: {
                font: {
                    size: 14,
                },
                color: '#dc3545 '
            }
        }
          }
      }
  })

  }

  loadDriver() {
    //ActivatedRoute
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.firebaseService
      .getDriverLikes()
      .subscribe((response) => {
        response.indexOf(this.driver?.driverId) > -1
          ? this.buttonLikeToTrue()
          : this.buttonLikeToFalse();
      });

    this.driverService
      .getDriverById(this.id)
      .subscribe((response) => {
        this.driver = response[0];
      });
  }

  likeDriver(id: string) {
    this.firebaseService.checkLikeDriver(id);
    this.like ? this.buttonLikeToFalse() : this.buttonLikeToTrue();
  }

  buttonLikeToFalse() {
    this.like = false;
    this.buttonMessage = 'Añadir este piloto a mi lista de favoritos';
  }

  buttonLikeToTrue() {
    this.like = true;
    this.buttonMessage = 'Eliminar este piloto de mi lista de favoritos';
  }
}
