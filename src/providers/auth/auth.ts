import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './user';
import * as firebase from 'firebase/app';
import { debug } from 'util';

@Injectable()
export class AuthProvider {
 
  user: Observable<firebase.User>;
  constructor(private angularFireAuth: AngularFireAuth,private db: AngularFireDatabase) {
    this.user = angularFireAuth.authState;  
  }

  createUser(user: any) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  
  signIn(user: User) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  signOut() {
    return this.angularFireAuth.auth.signOut();
  }
  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
 }

}
