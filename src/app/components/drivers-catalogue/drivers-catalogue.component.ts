import { Component, OnInit } from '@angular/core';
import { DriversService } from 'src/app/services/drivers.service';
import { Idriver } from 'src/app/interfaces/idriver';
import { fromEvent } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-drivers-catalogue',
  templateUrl: './drivers-catalogue.component.html',
  styleUrls: ['./drivers-catalogue.component.css']
})
export class DriversCatalogueComponent implements OnInit {

  constructor(private drivers: DriversService, private translate: TranslateService) { }

  driversList: Idriver[] = []
  driversListCopy: Idriver[] = []
  filterSearch: string = "";
  filterYear: string = "";
  likes: string[] = [];
  allcountries: string[] = [];
  countries: string[] = [];
  selected: any | undefined

  ngOnInit(): void {
    this.driversAll(true)

    const year = <HTMLInputElement>document.querySelector('#year');
    const keyupEvent = fromEvent(year, 'keyup'); //! detrás del input para evitar el "is null"

    keyupEvent.subscribe(() => {
      this.driversByYear(year.value);
    });
  }

  driversAll(ini: boolean) {
    this.driversList = []
    this.drivers.getDrivers().subscribe((response) => {
      response.map((element: Idriver) => {
        element.completeName = element.givenName + " " + element.familyName
        this.driversList.push(element)
      })

      switch (this.translate.currentLang) {
        case 'es':
          this.selected = "Filtrar por pais"
          break;
        case 'en':
          this.selected = "Filter by country"
          break;
      }

      if (ini) {
        this.loadCountriesSelect()
      }

      this.driversListCopy = this.driversList
    })
  }

  //Pipe
  search(value: string): void {
    this.driversList.filter((element) =>
      element.completeName.toLowerCase().includes(value)
    );
  }


  loadCountriesSelect() {
    this.allcountries.push("Mostrar todos")
    this.driversList.map((e) => {
      this.allcountries.push(e.nationality)
    })

    this.countries = [...new Set(this.allcountries)]
    this.countries.sort()

  }

  filterByCountry() {
    this.driversList = []
    this.drivers.getDrivers().subscribe((response) => {
      response.map((element: Idriver) => {
        if (element.nationality == this.selected) {
          this.driversList.push(element)
        }

      })

    })
  }

  driversByYear(year: string) {
    let yearNumber = parseInt(year);
    const circuitName = <HTMLInputElement>(
      document.querySelector('.circuit-name')
    );
    if (yearNumber >= 1975 && yearNumber <= 2021) {
      this.driversList = [];
      this.drivers.getDriversByYear(year).subscribe((response) => {
        response.map((element: Idriver) => {
          this.driversList.push(element);
        });
      });
      circuitName.innerHTML = 'Temporada ' + year;
    } else {
      circuitName.innerHTML = '';
      this.driversList = [];
    }

    if (year.length === 0) {
      this.driversAll(false);
    }
  }

  driversSortBy(value: string) {
    switch (value) {
      case 'name':
        this.driversList = this.driversList.sort((a, b) => {
          if (a.givenName.toLowerCase() > b.givenName.toLowerCase()) return 1;
          if (a.givenName.toLowerCase() < b.givenName.toLowerCase()) return -1;
          return 0;
        });
        break;
      case 'familyname':
        this.driversList = this.driversList.sort((a, b) => {
          if (a.familyName.toLowerCase() > b.familyName.toLowerCase())
            return 1;
          if (a.familyName.toLowerCase() < b.familyName.toLowerCase())
            return -1;
          return 0;
        });
        break;
    }
  }

}
