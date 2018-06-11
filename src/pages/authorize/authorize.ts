import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {AngularFirestore} from "angularfire2/firestore";

/**
 * AuthorizePage page.
 * For å registrere og/eller logge inn via Firebase authenictation,
 * bruker User-Service Provider klassen
 *
 */

@IonicPage()
@Component({
  selector: 'page-authorize',
  templateUrl: 'authorize.html',
})
export class AuthorizePage {
  public buttonClicked: boolean = false;


  public user = {
    username: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider, private af: AngularFirestore) {
  }


  //Kaller på userSerice sin log in metode
  //Når knappen er trykket på vises section
  loginUser() {
    this.buttonClicked = !this.buttonClicked;
    this.userService.logInUser(this.user.username, this.user.password);

  }

  //Kaller på user service sin registerUser
  //Når knappen er trykket på vises section
  registerUser() {
    this.buttonClicked = !this.buttonClicked;
    this.userService.registerUser(this.user.username, this.user.password);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthorizePage');
  }

}
