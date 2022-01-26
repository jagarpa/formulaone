import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

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
  database = getDatabase(this.app);

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
    const user = localStorage.getItem('user');
    let token = JSON.parse(user!).token;
    if(token.length > 0) {
      return true;
    }
    return false;
  }

  newUser(newUser: User) {
    const auth = getAuth(this.app)
    return from(createUserWithEmailAndPassword(auth, newUser.email, newUser.password).then(()=> {
      this.setEmail(newUser.email)
    })
    .catch((error) => {return error}))
  }

  setDisplayName(name: string) {
    const auth = getAuth(this.app)
    return from(updateProfile(auth.currentUser!, {
      displayName: name, photoURL: "./assets/helmets/undefined.png"
    }))
  }

  private setEmail(email: string) {
    let arr = email.split("@")
    let emailDivided = arr[0]
    from(set(ref(this.database, '/users/'+emailDivided), {
      email: email
    }))
    from(set(ref(this.database, '/users/'+emailDivided+'/circuits/'), {
      id: "valor 0"
    }))
    from(set(ref(this.database, '/users/'+emailDivided+'/drivers/'), {
      id: "valor 0"
    }))
    from(set(ref(this.database, '/users/'+emailDivided+'/constructors/'), {
      id: "valor 0"
    }))
  }


}
