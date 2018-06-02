import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {AngularFirestore} from "angularfire2/firestore";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import {CartItem} from "../../models/cart-item";


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


//  selectedProduct: Product;
  cartCount:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private  af: AngularFirestore, private cartService: CartServiceProvider) {
    this.navCtrl = navCtrl;
    this.nameBasket = navParams.get('data');


  //  this.selectedProduct = navParams.get('item');
  }


  cartItems:CartItem[]=[];


  emptyBasket(){
    this.cartCount = 0;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
    this.cartItems=this.cartService.list();
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
