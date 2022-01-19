import { Component, OnInit } from '@angular/core';
import { CircuitsService } from 'src/app/services/circuits.service';
import { ICircuit } from 'src/app/interfaces/icircuit';
import { filter, fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-circuits-catalogue',
  templateUrl: './circuits-catalogue.component.html',
  styleUrls: ['./circuits-catalogue.component.css'],
})

export class CircuitsCatalogueComponent implements OnInit {
  constructor(public circuits: CircuitsService /* Inyectamos el servicio */) {}

  circuitsList: ICircuit[] = [];
  filterSearch: string = '';
  filterYear: string = '';

  ngOnInit(): void {
    this.circuitsAll()

    const year = <HTMLInputElement>document.querySelector('#year');
    const keyupEvent = fromEvent(year, 'keyup'); //! detrás del input para evitar el "is null"

    keyupEvent.subscribe(() => {
      this.circuitsByYear(year.value)
    });
  }

  circuitsAll() {
    this.circuits.getCircuits().subscribe((response) => {
      response.map((element: ICircuit) => {
        element.image = "assets/img/circuits/logos/"+element.circuitId+".png";
        this.circuitsList.push(element);
      });
    });
  }

  //Pipe
  search(value: string): void {
    this.circuitsList.filter((element) =>
      element.circuitName.toLowerCase().includes(value)
    );
  }

  circuitsByYear(year: string) {
    let yearNumber = parseInt(year);
    const circuitName = <HTMLInputElement>document.querySelector('.circuit-name');
    if (yearNumber>=1975 && yearNumber<=2021) {
      this.circuitsList = [];
      this.circuits.getCircuitsByYear(year).subscribe((response) => {
        response.map((element: ICircuit) => {
          this.circuitsList.push(element);
        });
      });
      circuitName.innerHTML = "Temporada "+year
    } else {
      circuitName.innerHTML = "";
      this.circuitsList = []
    }

    if (year.length === 0) {
      this.circuitsAll()
    }

  }

  circuitsSortBy(order: string) {
    switch (order) {
      case 'id':
        this.circuitsList = this.circuitsList.sort(
          (a, b) => {
            if (a.circuitId.toLowerCase() > b.circuitId.toLowerCase())
              return 1;
            if (a.circuitId.toLowerCase() < b.circuitId.toLowerCase())
              return -1;
            return 0;
          }
        );
        break;
      case 'name':
        this.circuitsList = this.circuitsList.sort(
          (a, b) => {
            if (a.circuitName.toLowerCase() > b.circuitName.toLowerCase())
              return 1;
            if (a.circuitName.toLowerCase() < b.circuitName.toLowerCase())
              return -1;
            return 0;
          }
        );
        break;
    }
  }

  /*     const input = <HTMLInputElement>document.querySelector('#circuitfilter');
    const keyupEvent = fromEvent(input!, 'keyup'); //! detrás del input para evitar el "is null"
 */
  /*     keyupEvent.subscribe(() => {
      this.circuitsList = [];
      this.circuits.getCircuits().subscribe((response) => {
        response.map((element: ICircuit) => {
          if (element.circuitName.toLowerCase().includes(input.value.toLowerCase())) {
            this.circuitsList.push(element);
          }
        });
      });
    }); */
}
