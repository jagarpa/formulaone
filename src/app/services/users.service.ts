import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  constructor(private http: HttpClient) { }

  firebaseConfig = {
    apiKey: environment.firebaseConfig.apiKey,
    authDomain: environment.firebaseConfig.authDomain,
    databaseURL: environment.firebaseConfig.databaseURL,
  };

  app = initializeApp(this.firebaseConfig);

  getToken(email: string, password: string): Observable<UserCredential> {
    const auth = getAuth(this.app)
    return from(signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      return error
    }))
  }

  signOut() {
    const auth = getAuth(this.app)
    auth.signOut()
  }

  isAuth() {
    if(localStorage.getItem('token')!.length>0) {
      return true;
    }
    return false;
  }
}
