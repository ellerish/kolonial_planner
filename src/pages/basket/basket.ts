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

  nameBasket: string;
  searchQuery: string = '';
  items: Observable<Varer[]>;

  public collection: AngularFirestoreCollection<Varer>;
  public varer: Observable<Varer[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore) {
    this.navCtrl = navCtrl;
    this.initializeItems();

    this.nameBasket = navParams.get('data');

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


  initializeItems() {
    this.items = this.varer;
  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
  }

  goToDetailPage(vare: Varer, nameBasket) {
    this.navCtrl.push('DetailPage', {
      vare,
      vareCollection: this.collection,
      data: nameBasket
    });
  }

  goToMakeList(){
    this.navCtrl.push('FriendListPage')
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  goToBasket(nameBasket){
    this.navCtrl.push('BasketPage', {
      data: nameBasket
    });
  }

  goToProfil(nameBasket){
    this.navCtrl.push('ProfilPage', {
      data: nameBasket
    });
  }

}
