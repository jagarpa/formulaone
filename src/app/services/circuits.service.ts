import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMRData } from '../interfaces/imrdata';
import { debounceTime, map, Subject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})

/* Servicis HTTP */
export class CircuitsService {

  user: User = JSON.parse(localStorage.getItem("user")!)

  constructor(private http: HttpClient) {}

  circuitsSubject = new Subject<IMRData>()

  getCircuits() {
    const URL = `http://ergast.com/api/f1/circuits.json?limit=79`;
    return this.http.get<IMRData>(URL).pipe(map(circuits => {
      return circuits.MRData.CircuitTable.Circuits;
    }))
  }

  getCircuitsByYear(year: string) {
    const URL = `http://ergast.com/api/f1/${year}/circuits.json?limit=30`;
    return this.http.get<IMRData>(URL).pipe(map(circuits => {
      return circuits.MRData.CircuitTable.Circuits
    }));
  }

  getCircuitById(id: string | undefined) {
    const URL = `http://ergast.com/api/f1/circuits/${id}.json`;
    return this.http.get<IMRData>(URL).pipe(map(circuits => {
      return circuits.MRData.CircuitTable.Circuits
    }));
  }
}
