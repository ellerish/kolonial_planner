import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Varer} from "../../models/Varer";
import {Observable} from "rxjs/Observable";
import {ProfilPage} from "../profil/profil";

/**
 * Generated class for the BasketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {

  public collection: AngularFirestoreCollection<Varer>;
  public varer: Observable<Varer[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore) {
    this.navCtrl = navCtrl;

    this.collection = af.collection<Varer>("varer");
    this.varer = this.collection.snapshotChanges()
      .map(actions =>  {
        return actions.map(action => {
          let data = action.payload.doc.data() as Varer;
          let id = action.payload.doc.id;

          return {
            id,
            ...data
          };
        })
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
  }

  goToDetailPage(vare: Varer) {
    this.navCtrl.push('DetailPage', {
      vare,
      collection: this.collection
    })
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
    this.navCtrl.push(ProfilPage);
  }

}