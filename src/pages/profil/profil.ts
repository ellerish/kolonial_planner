import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {AngularFirestore} from "angularfire2/firestore";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import {CartItem} from "../../models/cart-item";
import {UserProvider} from "../../providers/user/user";


/**
 *ProfilPage page.
 *
 * En ganske statisk klasse for å vise oppsett av hvordan vi ønsket
 * at betaling ville sett ut og hvordan det skulle bli delt på de ulike medlemmene av
 * handelistem
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


  constructor(public navCtrl: NavController, public navParams: NavParams, private  af: AngularFirestore, private cartService: CartServiceProvider,
              private userProvider: UserProvider) {
    this.navCtrl = navCtrl;
    this.nameBasket = navParams.get('data');
  }

  emptyBasket(){
    this.cartCount = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
    //Henter epost-adresse til innlogget bruker via user-service provider
    this.owner = this.userProvider.getUser();

  }

  //Funksjon for å logge ut av konto
  logout() {
    this.af.app.auth().signOut();
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
