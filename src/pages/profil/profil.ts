import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {AngularFirestore} from "angularfire2/firestore";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import {CartItem} from "../../models/cart-item";
import {UserProvider} from "../../providers/user/user";


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
  cartCount: number = 0;


  public owner: any;

  friendMail: string;


//  selectedProduct: Product;
 // cartCount:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private  af: AngularFirestore, private cartService: CartServiceProvider,
              private userProvider: UserProvider) {
    this.navCtrl = navCtrl;
    this.nameBasket = navParams.get('data');

    this.friendMail = navParams.get('mail');
    //this.cartCount = navParams.get('cartCount')


  //  this.selectedProduct = navParams.get('item');
  }


  cartItems:CartItem[]=[];


  emptyBasket(){
    this.cartCount = 0;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
    this.owner = this.userProvider.getUser();
    this.cartItems=this.cartService.list();
    this.cartCount = this.cartService.getCartCount();
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
