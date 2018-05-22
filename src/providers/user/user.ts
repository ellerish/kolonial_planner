import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  user: string

  constructor(private af: AngularFirestore) {
    console.log('Hello UserProvider Provider');
  }


  //Register
  registerUser(username, password) {
    this.af.app.auth()
      .createUserWithEmailAndPassword(username, password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  }

  //LogIN
  logInUser(user, password){
    this.af.app.auth()
      .signInWithEmailAndPassword(user, password )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  }

  //Log out
  logOut() {
    this.af.app.auth().signOut();
  }



  //Setting current user mail to username
  getUser(){
    let user = this.af.app.auth().currentUser;
    let username;

    if(user != null){
      username = user.email;

    }
    return username;


  }

}
