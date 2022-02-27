import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Iconstructor } from 'src/app/interfaces/iconstructor';
import { ConstructorsService } from 'src/app/services/constructors.service';

@Component({
  selector: 'app-constructors-catalogue',
  templateUrl: './constructors-catalogue.component.html',
  styleUrls: ['./constructors-catalogue.component.css']
})
export class ConstructorsCatalogueComponent implements OnInit {

  constructorsList: Iconstructor[] = []
  filterSearch: string = '';
  filterYear: string = '';
  likes: string[] = [];

  constructor(public constructors: ConstructorsService) { }

  ngOnInit(): void {
    this.constructorsAll();

    const year = <HTMLInputElement>document.querySelector('#year');
    const keyupEvent = fromEvent(year, 'keyup'); //! detrás del input para evitar el "is null"

    keyupEvent.subscribe(() => {
      this.constructorsByYear(year.value);
    });
  }

  constructorsAll() {
    this.constructors.getConstructors().subscribe((response) => {
      response.map((element: Iconstructor) => {
        console.log(element)
        this.constructorsList.push(element);
      });
    });
  }

  //Pipe
  search(value: string): void {
    this.constructorsList.filter((element) =>
      element.name.toLowerCase().includes(value)
    );
  }

  constructorsByYear(year: string) {
    let yearNumber = parseInt(year);
    const constructorName = <HTMLInputElement>(
      document.querySelector('.circuit-name')
    );
    if (yearNumber >= 1975 && yearNumber <= 2021) {
      this.constructorsList = [];
      this.constructors.getConstructorsByYear(year).subscribe((response) => {
        response.map((element: Iconstructor) => {
          this.constructorsList.push(element);
        });
      });
      constructorName.innerHTML = 'Temporada ' + year;
    } else {
      constructorName.innerHTML = '';
      this.constructorsList = [];
    }

    if (year.length === 0) {
      this.constructorsAll();
    }
  }

  constructorsSortBy(order: string) {
    switch (order) {
      case 'id':
        this.constructorsList = this.constructorsList.sort((a, b) => {
          if (a.constructorId.toLowerCase() > b.constructorId.toLowerCase()) return 1;
          if (a.constructorId.toLowerCase() < b.constructorId.toLowerCase()) return -1;
          return 0;
        });
        break;
      case 'name':
        this.constructorsList = this.constructorsList.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase())
            return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase())
            return -1;
          return 0;
        });
        break;
    }
  }

}
