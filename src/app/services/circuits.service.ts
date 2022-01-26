import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMRData } from '../interfaces/imrdata';
import { debounceTime, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CircuitsService {

  constructor(private http: HttpClient) {}

  getCircuits() {
    const URL = 'http://ergast.com/api/f1/circuits.json?limit=79';
    return this.http.get<IMRData>(URL).pipe(map(circuits => {
      console.log(circuits.MRData.CircuitTable.Circuits)
      return circuits.MRData.CircuitTable.Circuits
    }));
  }

  getCircuitsByYear(year: string) {
    const URL = 'http://ergast.com/api/f1/'+year+'/circuits.json?limit=30';
    return this.http.get<IMRData>(URL).pipe(map(circuits => {
      console.log(circuits.MRData.CircuitTable.Circuits)
      return circuits.MRData.CircuitTable.Circuits
    }));
  }

  getCircuitById(id: string | undefined) {
    const URL = 'http://ergast.com/api/f1/circuits/'+id+'.json';
    return this.http.get<IMRData>(URL).pipe(map(circuits => {
      return circuits.MRData.CircuitTable.Circuits
    }));
  }
}
