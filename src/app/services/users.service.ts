import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { BehaviorSubject, from, map, Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})

export class UsersService {

  constructor(private http: HttpClient) {
   }

  /* Observable amb subject */
  private loggedIn = new BehaviorSubject<boolean>(false)

  private firebaseConfig = {
    apiKey: environment.firebaseConfig.apiKey,
    authDomain: environment.firebaseConfig.authDomain,
    databaseURL: environment.firebaseConfig.databaseURL,
  };
  private app = initializeApp(this.firebaseConfig);
  private database = getDatabase(this.app);

  get isLoggedIn() {
    return this.loggedIn.asObservable() //Mostrar/Ocultar menu en Login
  }

  getToken(user: User): Observable<UserCredential> {
    const auth = getAuth(this.app)
    return from(signInWithEmailAndPassword(auth, user.email, user.password)
    .catch((error) => {
      return error
    }))
  }

checkNickname(user: User) {
    const URL = this.firebaseConfig.databaseURL + `/users.json`;
    return this.http.get(URL).pipe(
      map((response) => {
        return Object.entries(response).map((e: any) => {
          return [e[1].nickname, e[1].email]
        })
      })
    );
  }

  signOut() {
    const auth = getAuth(this.app)
    localStorage.removeItem("user")
    auth.signOut()
    /* Observable amb subject */
    this.loggedIn.next(false)
  }

  isAuth() {
    const user = localStorage.getItem('user');
    let token = JSON.parse(user!).token;
       /* Observable amb subject */
    if(token.length > 0) {
      this.loggedIn.next(true)
      return true;
    }
    this.loggedIn.next(false)
    return false;
  }

  newUser(user: User) {
    const auth = getAuth(this.app)
    return from(createUserWithEmailAndPassword(auth, user.email, user.password).then((res)=> {
      this.setDatabaseStructure(user)
      return res;
    })
    .catch((error) => {console.log(error)}))
  }

  private setDatabaseStructure(user: User) {
    from(set(ref(this.database, '/users/'+user.nickname), {
      nickname: user.nickname,
      email: user.email,
      image: "./assets/img/helmets/0.png"
    }))
    from(set(ref(this.database, '/users/'+user.nickname+'/circuits/'), {
      id: "valor 0"
    }))
    from(set(ref(this.database, '/users/'+user.nickname+'/drivers/'), {
      id: "valor 0"
    }))
    from(set(ref(this.database, '/users/'+user.nickname+'/constructors/'), {
      id: "valor 0"
    }))
  }
}
