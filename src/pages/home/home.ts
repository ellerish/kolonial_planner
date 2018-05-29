import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FriendListPage} from "../friend-list/friend-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl;

  }

  goToMakeListFriends(){
    this.navCtrl.push('FriendListPage');
  }



  goToMakeList(){
    this.navCtrl.push('FriendListPage')
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  goToBasket(){
    this.navCtrl.push('BasketPage')
  }

  goToProfil(){
    this.navCtrl.push('ProfilPage');
  }
}
