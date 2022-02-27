import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMRData } from '../interfaces/imrdata';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private http:HttpClient) { }

  getDrivers() {
    const URL = 'http://ergast.com/api/f1/drivers.json?limit=854';
    return this.http.get<IMRData>(URL).pipe(map(drivers => {
      return drivers.MRData.DriverTable.Drivers
    }));
  }

  getDriversByYear(year: string) {
    const URL = 'http://ergast.com/api/f1/'+year+'/drivers.json?limit=30';
    return this.http.get<IMRData>(URL).pipe(map(drivers => {
      return drivers.MRData.DriverTable.Drivers
    }));
  }

  getDriverById(id: string) {
    const URL = 'http://ergast.com/api/f1/drivers/'+id+'.json';
    return this.http.get<IMRData>(URL).pipe(map(drivers => {
      return drivers.MRData.DriverTable.Drivers
    }));
  }

  getStandingsById(id: string) {
    const URL ='http://ergast.com/api/f1/drivers/'+id+'/driverstandings.json'
    return this.http.get<IMRData>(URL).pipe(map(standings => {
      return standings.MRData.StandingsTable.StandingsLists
    }))
  }
}
