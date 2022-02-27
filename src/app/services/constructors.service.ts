import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IMRData } from '../interfaces/imrdata';

@Injectable({
  providedIn: 'root'
})
export class ConstructorsService {

  constructor(private http:HttpClient) { }

  getConstructors() {
    const URL = 'http://ergast.com/api/f1/constructors.json?limit=211';
    return this.http.get<IMRData>(URL).pipe(map(constructors => {
      return constructors.MRData.ConstructorTable.Constructors
    }));
  }

  getConstructorsByYear(year: string) {
    const URL = 'http://ergast.com/api/f1/'+year+'/constructors.json?limit=12';
    return this.http.get<IMRData>(URL).pipe(map(constructors => {
      return constructors.MRData.ConstructorTable.Constructors
    }));
  }

  getConstructorById(id: string) {
    const URL = 'http://ergast.com/api/f1/constructors/'+id+'.json';
    return this.http.get<IMRData>(URL).pipe(map(constructors => {
      return constructors.MRData.ConstructorTable.Constructors
    }));
  }
}
