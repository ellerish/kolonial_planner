import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {AngularFirestore} from "angularfire2/firestore";

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  nameBasket: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private  af: AngularFirestore) {
    this.navCtrl = navCtrl;
    this.nameBasket = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }


  logout() {
    this.af.app.auth().signOut();
  }

  goToMakeList(){
    this.navCtrl.push('FriendListPage')
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  goToBasket(){
    this.navCtrl.push('BasketPage');
  }

  goToProfil(){
    this.navCtrl.push('ProfilPage');
  }
}
