import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Varer} from "../../models/Varer";
import {Observable} from "rxjs/Observable";
import {ProfilPage} from "../profil/profil";

/**
 * Basketpage inneholder alle kategoriene av varer hentet fra firebase database
 */

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {

  //Navnet på handlelisten generert av bruker
  nameBasket: string;

  //AngularfirestoreCollecion database
  items: Observable<Varer[]>;
  public collection: AngularFirestoreCollection<Varer>;
  public varer: Observable<Varer[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore) {
    this.navCtrl = navCtrl;
    this.initializeItems();

    this.nameBasket = navParams.get('data');

    //Henter ut collection 'Varer fra firebase'
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


  //Non functionial search-method
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

  //Pusher navnet på handlelisten videre til 'DetailPage'
  goToDetailPage(vare: Varer, nameBasket) {
    this.navCtrl.push('DetailPage', {
      vare,
      vareCollection: this.collection,
      data: nameBasket
    });
  }

  //NavController for å bytte side
  goToMakeList(){
    this.navCtrl.push('FriendListPage')
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  //Pusher med parameter navn på handleliste
  goToBasket(nameBasket){
    this.navCtrl.push('BasketPage', {
      data: nameBasket
    });
  }

  //Pusher med parameter navn på handleliste
  goToProfil(nameBasket){
    this.navCtrl.push('ProfilPage', {
      data: nameBasket
    });
  }

}
