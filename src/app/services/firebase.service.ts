import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { set } from 'firebase/database';
import { ref } from 'firebase/database';
import { push } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { map, Observable } from 'rxjs';
import { CircuitLikeId } from '../interfaces/circuit-like-id';
import { User } from '../interfaces/user';
import { DriverLikeId } from '../interfaces/driver-like-id';
import { ConstructorLikeId } from '../interfaces/constructor-like-id';

@Injectable({
  providedIn: 'root',
})

export class FirebaseService {
  private data: any;
  private user: User = JSON.parse(localStorage.getItem('user')!)

  constructor(private http: HttpClient) { }

  firebaseConfig = {
    apiKey: environment.firebaseConfig.apiKey,
    authDomain: environment.firebaseConfig.authDomain,
    databaseURL: environment.firebaseConfig.databaseURL,
  };

  private app = initializeApp(this.firebaseConfig);
  private database = getDatabase(this.app);

  /* GET LIKES */

  getCircuitLikes() {
    const URL = this.firebaseConfig.databaseURL + '/users/' + this.user.nickname + '/circuits.json'
    return this.http.get<CircuitLikeId>(URL).pipe(
      map((response) => {
        if (response != null) {
          return Object.entries(response).map((e) => {
            return e[1].id;
          });
        } else {
          return [];
        }
      })
    );
  }

  getDriverLikes() {
    const URL =
      this.firebaseConfig.databaseURL + '/users/' + this.user.nickname + '/drivers.json'
    return this.http.get<DriverLikeId>(URL).pipe(
      map((response) => {
        if (response!=null) {
          return Object.entries(response).map((e) => {
            return e[1].id;
          });
        } else {
          return [];
        }
      })
    );
  }

  getConstructorLikes() {
    const URL =
      this.firebaseConfig.databaseURL + '/users/' + this.user.nickname + '/constructors.json'
    return this.http.get<ConstructorLikeId>(URL).pipe(
      map((response) => {
        if (response!=null) {
          return Object.entries(response).map((e) => {
            return e[1].id;
          });
        } else {
          return [];
        }
      })
    );
  }

  /* CHECK LIKES */

  checkLikeCircuit(circuit: string) {
    this.getCircuitLikesWithHash().subscribe((response) => {
      const idList = response.map((e: string) => {
        return e[0];
      })
      if (idList.indexOf(circuit) === -1) {
        console.log("SET")
        this.setLikeCircuitInDb(circuit).subscribe((res) => {
          console.log(res);

        })
      } else {
        const position = idList.indexOf(circuit) //Position to delete
        const hash = response[position][1] //Hash of firebase element
        this.deleteLikeCircuitInDb(hash).subscribe((res) => {
          console.log(res);
        })
      }
    })
  }

  checkLikeDriver(driver: string) {
    this.getDriverLikesWithHash().subscribe((response) => {
      const idList = response.map((e: string) => {
        return e[0];
      })
      if (idList.indexOf(driver) === -1) {
        this.setLikeDriverInDb(driver).subscribe((res) => {
          console.log(res);

        })
      } else {
        const position = idList.indexOf(driver) //Position to delete
        const hash = response[position][1] //Hash of firebase element
        this.deleteLikeDriverInDb(hash).subscribe((res) => {
          console.log(res);
        }) //Delete function

      }
    })
  }

  checkLikeConstructor(constructor: string) {
    this.getConstructorsLikesWithHash().subscribe((response) => {
      const idList = response.map((e: string) => {
        return e[0];
      })
      if (idList.indexOf(constructor) === -1) {
        this.setLikeConstructorInDb(constructor).subscribe((res) => {
          console.log(res);

        })
      } else {
        const position = idList.indexOf(constructor) //Position to delete
        const hash = response[position][1] //Hash of firebase element
        this.deleteLikeConstructorInDb(hash).subscribe((res) => {
          console.log(res);
        }) //Delete function

      }
    })
  }

  private getCircuitLikesWithOutHash(): Observable<any> {
    const URL = this.firebaseConfig.databaseURL + '/users/' + this.user.nickname + '/circuits.json'
    return this.http.get<any>(URL).pipe(map((response) => {
      return Object.entries(response).map((element: any) => {
        return element[1].id
      })
    }))
  }

  /* GET */

  private getCircuitLikesWithHash(): Observable<any> {
    const URL = this.firebaseConfig.databaseURL + '/users/' + this.user.nickname + '/circuits.json'
    return this.http.get<any>(URL).pipe(map((response) => {
      if (response != null) {
        return Object.entries(response).map((element: any) => {
          return [element[1].id, element[0]];
        })
      } else {
        return []
      }
    }))
  }

  private getDriverLikesWithHash(): Observable<any> {
    const URL = this.firebaseConfig.databaseURL + '/users/' + this.user.nickname + '/drivers.json'
    return this.http.get<any>(URL).pipe(map((response) => {
      if (response != null) {
        return Object.entries(response).map((element: any) => {
          return [element[1].id, element[0]];
        })
      } else {
        return []
      }
    }))
  }

  private getConstructorsLikesWithHash(): Observable<any> {
    const URL = this.firebaseConfig.databaseURL + '/users/' + this.user.nickname + '/constructors.json'
    return this.http.get<any>(URL).pipe(map((response) => {
      if (response != null) {
        return Object.entries(response).map((element: any) => {
          return [element[1].id, element[0]];
        })
      } else {
        return []
      }
    }))
  }


  /* SET */
  private setLikeDriverInDb(driver: string) {
    return this.http.post(`${this.firebaseConfig.databaseURL}/users/${this.user.nickname}/drivers.json`, {'id': driver})
  }

  private setLikeCircuitInDb(circuit: string) {
    return this.http.post(`${this.firebaseConfig.databaseURL}/users/${this.user.nickname}/circuits.json`, {'id': circuit})
  }

  private setLikeConstructorInDb(constructor: string) {
    return this.http.post(`${this.firebaseConfig.databaseURL}/users/${this.user.nickname}/constructors.json`, {'id': constructor})
  }


  /* DELETE */

  private deleteLikeCircuitInDb(hash: string) {
    return this.http.delete(`${this.firebaseConfig.databaseURL}/users/${this.user.nickname}/circuits/${hash}.json`)
  }

  private deleteLikeDriverInDb(hash: string) {
    return this.http.delete(`${this.firebaseConfig.databaseURL}/users/${this.user.nickname}/drivers/${hash}.json`)
  }

  private deleteLikeConstructorInDb(hash: string) {
    console.log("DELETE");

    return this.http.delete(`${this.firebaseConfig.databaseURL}/users/${this.user.nickname}/constructors/${hash}.json`)
  }

}
