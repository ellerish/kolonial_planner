import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Items} from "../../models/Items";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Varer} from "../../models/Varer";
import {HomePage} from "../home/home";

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public vare: Varer;
  public vareCollection: AngularFirestoreCollection<Varer>;
  public details: Observable<any[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore) {
    this.vare = navParams.get('vare');
    this.vareCollection = navParams.get('vareCollection');

    this.details = this.vareCollection.doc(this.vare.id).collection("details").valueChanges();

   // doc(this.vare.id).collection('Detail').valueChanges();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
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
