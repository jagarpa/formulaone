import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  getDatabase,
  push,
  ref,
  set,
} from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { fromFetch } from 'rxjs/fetch';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface CircuitLikeId {
  id: any;
  hash: any;
}
{
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  data: any;
  user: string = '';
  constructor(private http: HttpClient) {}

  firebaseConfig = {
    apiKey: environment.firebaseConfig.apiKey,
    authDomain: environment.firebaseConfig.authDomain,
    databaseURL: environment.firebaseConfig.databaseURL,
  };

  app = initializeApp(this.firebaseConfig);
  database = getDatabase(this.app);

  async getLikeCircuit(user: string) {
    const consulta = await fetch(
      this.firebaseConfig.databaseURL + '/users/' + user + '/circuits.json'
    );
    const data = await consulta.json();
    const array = Object.entries(data);
    const likedCircuits = array.map((element: any) => {
      return [element[1].id, element[0]];
    });
    return likedCircuits;
  }

  getCircuitLikes(user: string, id: string | undefined) {
    const URL =
      this.firebaseConfig.databaseURL + '/users/' + user + '/circuits.json';
    return this.http.get<CircuitLikeId>(URL).pipe(
      map((response) => {
        return Object.entries(response).map((e) => {
          return e[1].id;
        });
      })
    );
  }

  checkLikeCircuit(user: string, circuit: string) {
    this.getCircuitLikesWithHash(user).subscribe((response) => {
      const idList = response.map((e: string) => {
        return e[0];
      })
      if (idList.indexOf(circuit) === -1) {
        console.log("SET")
        this.setLikeCircuitInDb(user, circuit)
        setTimeout(() => {
          this.getCircuitLikesWithOutHash(user).subscribe((response) => {
            console.log(response)
          })
        }, 500);
      } else {
        console.log("DELETE")
        const position = idList.indexOf(circuit) //Position to delete
        const hash = response[position][1] //Hash of firebase element
        this.deleteLikeCircuitInDb(user, hash) //Delete function
        setTimeout(() => {
          this.getCircuitLikesWithOutHash(user).subscribe((response) => {
            console.log(response)
          })
        }, 500);
      }
    })
  }

  private getCircuitLikesWithOutHash(user: string): Observable<any> {
    const URL = this.firebaseConfig.databaseURL + '/users/' + user + '/circuits.json'
    return this.http.get<any>(URL).pipe(map((response) => {
      return Object.entries(response).map((element: any) => {
        return element[1].id
      })
    }))
  }

  private getCircuitLikesWithHash(user: string): Observable<any> {
    const URL = this.firebaseConfig.databaseURL + '/users/' + user + '/circuits.json'
    return this.http.get<any>(URL).pipe(map((response) => {
      return Object.entries(response).map((element: any) => {
        return [element[1].id, element[0]];
      })
    }))
  }

  private setLikeCircuitInDb(user: string, circuit: string) {
    const list = ref(this.database, '/users/' + user + '/circuits/');
      const newRow = push(list);
      set(newRow, {
        id: circuit,
      });
  }

  private deleteLikeCircuitInDb(user: string, hash: string) {
    fetch(
      this.firebaseConfig.databaseURL +
        '/users/' +
        user +
        '/circuits/' +
        hash +
        '.json',
      {
        method: 'delete',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }
    );
  }

}
