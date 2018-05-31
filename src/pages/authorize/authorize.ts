import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {AngularFirestore} from "angularfire2/firestore";

/**
 * Generated class for the AuthorizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-authorize',
  templateUrl: 'authorize.html',
})
export class AuthorizePage {



  public user = {
    username: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider, private af: AngularFirestore) {
  }


  //Kaller på userSerice sin log in metode
  loginUser() {
    this.userService.logInUser(this.user.username, this.user.password);

  }

  //Kaller på user service sin registerUser
  registerUser() {
    this.userService.registerUser(this.user.username, this.user.password);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthorizePage');
  }

}
