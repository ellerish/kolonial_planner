import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Items} from "../../models/Items";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Varer} from "../../models/Varer";
import {HomePage} from "../home/home";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";



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
 // public item: Items;
 // quantity: 0;

  public savedVare: any[];

  qty: any;
  public detailsList;


  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore, private cartService: CartServiceProvider) {
    this.vare = navParams.get('vare');
    this.vareCollection = navParams.get('vareCollection');

    this.qty = 1;

    this.details = this.vareCollection.doc(this.vare.id).collection("details").valueChanges();



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  decrement(qty){
  if(this.qty-1 < 1){
    this.qty = 1;
  } else {
    this.qty -= 1;
  }

  }

  increment(qty){
    this.qty += 1;
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
